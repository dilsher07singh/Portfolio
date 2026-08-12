import { useEffect, useState } from "react";
import { GITHUB_URL } from "../constants";
import Reveal from "./Reveal";

const GithubContributions = () => {
  const [weeks, setWeeks] = useState([]);
  const [totalContributions, setTotalContributions] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let cancelled = false;

    // Written at build time by scripts/fetch-github.mjs. The GitHub token stays
    // on the build machine so no credential ever reaches the browser.
    const fetchContributions = async () => {
      try {
        const response = await fetch("/github-contributions.json");

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const calendar = await response.json();

        if (cancelled) return;

        if (!calendar?.weeks?.length) {
          setStatus("error");
          return;
        }

        setWeeks(calendar.weeks);
        setTotalContributions(calendar.totalContributions);
        setStatus("ready");
      } catch (error) {
        if (cancelled) return;
        console.error("Error fetching GitHub contributions", error);
        setStatus("error");
      }
    };

    fetchContributions();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="github"
      aria-labelledby="github-heading"
      className="scroll-mt-24 border-b border-neutral-900 pb-4"
    >
      <Reveal
        as="h2"
        id="github-heading"
        className="my-20 text-center text-4xl"
      >
        GitHub Contributions
      </Reveal>

      {status === "loading" && (
        <p className="mb-8 text-center text-neutral-400">
          Loading contribution activity…
        </p>
      )}

      {status === "error" && (
        <p className="mb-8 text-center text-neutral-400">
          GitHub activity is unavailable right now —{" "}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 transition-colors hover:text-purple-300"
          >
            view it on GitHub
          </a>
          .
        </p>
      )}

      {status === "ready" && (
        <>
          <p className="mb-8 text-center text-lg">
            {totalContributions.toLocaleString()} contributions in the last year
          </p>

          {/*
            The grid conveys its data purely through ~365 background colours,
            which is meaningless to a screen reader and unreadable in
            forced-colors mode. role="img" collapses the whole subtree into a
            single node named by aria-label, so the summary is announced once
            instead of 365 unlabeled divs. It sits on the scroll container
            rather than the inner grid so the element Chrome makes implicitly
            focusable (for keyboard scrolling) is the one carrying the name.
          */}
          <div
            role="img"
            aria-label={`GitHub contribution heatmap: ${totalContributions.toLocaleString()} contributions over the last year`}
            className="overflow-x-auto pb-2"
          >
            <div className="mx-auto flex w-max gap-1">
              {weeks.map((week) => (
                <div
                  key={week.contributionDays[0]?.date}
                  className="flex flex-col gap-1"
                >
                  {week.contributionDays.map((day) => (
                    // aria-hidden is belt-and-braces: role="img" above already
                    // prunes these, but it keeps the cells inert if that role
                    // is ever moved or dropped.
                    <div
                      key={day.date}
                      aria-hidden="true"
                      className="h-3 w-3 rounded-sm"
                      style={{ backgroundColor: day.color }}
                      title={`${day.contributionCount} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default GithubContributions;
