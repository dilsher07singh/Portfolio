// Vercel serverless function: GET /api/github-contributions
//
// Serves the GitHub contribution calendar live, at request time, instead of
// baking it into the build. GITHUB_TOKEN stays on the server (set it in the
// Vercel project environment variables); the browser only ever sees the
// calendar JSON this returns.
//
// The response is cached at Vercel's edge for an hour and served stale for up
// to a day while it refreshes, so GitHub is queried at most about once an hour
// no matter how much traffic the site gets.

import { GITHUB_USERNAME } from "../src/constants/site.js";

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
    }
  }
`;

const CACHE_OK = "public, s-maxage=3600, stale-while-revalidate=86400";
// Short, so a transient GitHub failure does not stick for an hour.
const CACHE_ERROR = "public, s-maxage=60";

/**
 * @param {import("node:http").IncomingMessage} _req
 * @param {import("node:http").ServerResponse} res
 */
export default async function handler(_req, res) {
  const fail = (status, message) => {
    res.statusCode = status;
    res.setHeader("Cache-Control", CACHE_ERROR);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: message }));
  };

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error("[github-contributions] GITHUB_TOKEN is not set");
    return fail(503, "Contribution data is not configured");
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "dilshersingh.com",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login: GITHUB_USERNAME },
      }),
    });

    if (!response.ok) {
      console.error(`[github-contributions] GitHub responded ${response.status}`);
      return fail(502, "GitHub request failed");
    }

    const payload = await response.json();
    // A GraphQL error still returns HTTP 200, so verify the shape.
    const calendar =
      payload?.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar?.weeks?.length) {
      console.error("[github-contributions] Unexpected GitHub payload");
      return fail(502, "Unexpected GitHub response");
    }

    res.statusCode = 200;
    res.setHeader("Cache-Control", CACHE_OK);
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        totalContributions: calendar.totalContributions,
        weeks: calendar.weeks,
      }),
    );
  } catch (error) {
    console.error("[github-contributions] Request failed", error);
    return fail(502, "GitHub request failed");
  }
}
