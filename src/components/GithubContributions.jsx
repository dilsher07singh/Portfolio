import { useEffect, useState } from "react";
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
      className="scroll-mt-24 border-b border-neutral-900 pb-4"
    >
      <Reveal as="h2" className="my-20 text-center text-4xl">
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
            href="https://github.com/dilsher07singh"
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

          <div className="overflow-x-auto pb-2">
            <div className="mx-auto flex w-max gap-1">
              {weeks.map((week) => (
                <div
                  key={week.contributionDays[0]?.date}
                  className="flex flex-col gap-1"
                >
                  {week.contributionDays.map((day) => (
                    <div
                      key={day.date}
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
