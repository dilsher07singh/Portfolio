import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import GithubContributions from "../components/GithubContributions.jsx";

const day = (date, count, color) => ({
  date,
  contributionCount: count,
  color,
});

const CALENDAR = {
  totalContributions: 1582,
  weeks: [
    {
      contributionDays: [
        day("2026-01-01", 0, "#ebedf0"),
        day("2026-01-02", 4, "#40c463"),
      ],
    },
    {
      contributionDays: [
        day("2026-01-08", 1, "#9be9a8"),
        day("2026-01-09", 9, "#216e39"),
      ],
    },
  ],
};

const stubFetch = (impl) => vi.stubGlobal("fetch", vi.fn(impl));

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("GithubContributions", () => {
  it("reads the build-time JSON with no credential attached", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => CALENDAR,
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<GithubContributions />);
    await screen.findByRole("img");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    // SEC-001: a static file, and crucially no second argument — an options
    // object here is how the Authorization header crept into the bundle before.
    expect(fetchMock.mock.calls[0]).toEqual(["/github-contributions.json"]);
  });

  it("collapses the heatmap into one image node named by its total", async () => {
    stubFetch(async () => ({ ok: true, json: async () => CALENDAR }));

    const { container } = render(<GithubContributions />);

    const heatmap = await screen.findByRole("img", {
      name: "GitHub contribution heatmap: 1,582 contributions over the last year",
    });

    // The four day cells must not surface as their own nodes: role="img"
    // prunes the subtree, and aria-hidden keeps them inert regardless.
    expect(screen.getAllByRole("img")).toHaveLength(1);
    const cells = container.querySelectorAll("div[title]");
    expect(cells).toHaveLength(4);
    for (const cell of cells) {
      expect(cell).toHaveAttribute("aria-hidden", "true");
      expect(heatmap.contains(cell)).toBe(true);
    }
  });

  it("shows a loading message before the data arrives", () => {
    stubFetch(() => new Promise(() => {}));

    render(<GithubContributions />);

    expect(screen.getByText(/Loading contribution activity/)).toBeVisible();
  });

  it("falls back to a link to GitHub when the fetch fails", async () => {
    stubFetch(async () => ({ ok: false, status: 500 }));
    // The component logs the failure; keep the expected error out of the run.
    vi.spyOn(console, "error").mockImplementation(() => {});

    render(<GithubContributions />);

    await waitFor(() =>
      expect(screen.getByRole("link", { name: "view it on GitHub" })).toHaveAttribute(
        "href",
        "https://github.com/dilsher07singh",
      ),
    );
    expect(screen.queryByRole("img")).toBeNull();
  });
});
