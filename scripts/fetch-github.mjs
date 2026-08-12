// Fetches the GitHub contribution calendar at build time and writes it to
// public/github-contributions.json, so the browser reads a static file and no
// credential is ever shipped to the client.
//
// Reads GITHUB_TOKEN (no VITE_ prefix — that would make Vite inline it).
// Locally the token comes from .env via `node --env-file-if-exists=.env`;
// on Vercel it comes from the project environment variables.

import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const USERNAME = "dilsher07singh";
const OUT_PATH = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../public/github-contributions.json"
);

const QUERY = `
  {
    user(login: "${USERNAME}") {
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

// Never fail the build over this: the committed JSON is the fallback, so a
// missing token or a GitHub outage should leave the last good data in place.
const skip = (reason) => {
  console.warn(`[fetch-github] ${reason} — keeping existing contributions JSON.`);
  process.exit(0);
};

const token = process.env.GITHUB_TOKEN;

if (!token) {
  skip("GITHUB_TOKEN is not set");
}

try {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY }),
  });

  if (!response.ok) {
    skip(`GitHub API responded ${response.status}`);
  }

  const payload = await response.json();

  // A GraphQL error still returns HTTP 200, so verify the shape.
  const calendar =
    payload?.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar?.weeks?.length) {
    skip("GitHub API returned an unexpected payload");
  }

  await writeFile(
    OUT_PATH,
    `${JSON.stringify(
      {
        totalContributions: calendar.totalContributions,
        weeks: calendar.weeks,
      },
      null,
      2
    )}\n`
  );

  console.log(
    `[fetch-github] Wrote ${calendar.totalContributions.toLocaleString()} contributions across ${calendar.weeks.length} weeks.`
  );
} catch (error) {
  skip(`Request failed: ${error.message}`);
}
