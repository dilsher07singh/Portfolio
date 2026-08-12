import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "../App.jsx";

// A11Y-004 gave every section an accessible name so it is exposed as a landmark
// at all, and A11Y-005 moved the copyright into a real <footer>. Both are
// invisible on screen, so nothing but a test like this notices if they regress.
const REGION_NAMES = [
  "Dilsher Singh",
  "About Me",
  "Technologies",
  "Experience",
  "Projects",
  "GitHub Contributions",
  "Get in Touch",
];

// GithubContributions fetches a build-time JSON file on mount. Left unstubbed,
// jsdom rejects the relative URL and the component logs an error while falling
// into its error state — noisy, and unrelated to what these tests assert.
const stubEmptyContributions = () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ weeks: [], totalContributions: 0 }),
    }),
  );
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("page landmarks", () => {
  it("exposes all seven sections as named regions, in document order", () => {
    stubEmptyContributions();
    render(<App />);

    // aria-labelledby is what names these, so resolve it the way an assistive
    // technology would rather than reading a label attribute that is not there.
    const names = screen.getAllByRole("region").map((region) =>
      (region.getAttribute("aria-labelledby") ?? "")
        .split(/\s+/)
        .map((id) => document.getElementById(id)?.textContent?.trim())
        .join(" "),
    );

    expect(names).toEqual(REGION_NAMES);
  });

  it("has exactly one contentinfo landmark, outside main", () => {
    stubEmptyContributions();
    render(<App />);

    const footers = screen.getAllByRole("contentinfo");
    expect(footers).toHaveLength(1);
    expect(footers[0]).toHaveTextContent(/©\s*\d{4}\s*Dilsher Singh/);
    // A <footer> nested in main/section/article/aside/nav is NOT a contentinfo.
    expect(footers[0].closest("main")).toBeNull();
  });

  it("offers a skip link as the first focusable element, targeting #main", () => {
    stubEmptyContributions();
    const { container } = render(<App />);

    const focusable = container.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    expect(focusable[0]).toHaveAttribute("href", "#main");
    expect(focusable[0]).toHaveTextContent("Skip to main content");

    const main = container.querySelector("main#main");
    expect(main).not.toBeNull();
    // Without tabindex the skip link moves the scroll position but not focus.
    expect(main).toHaveAttribute("tabindex", "-1");
  });

  it("has no duplicate ids and no dangling aria-labelledby references", () => {
    stubEmptyContributions();
    const { container } = render(<App />);

    const ids = [...container.querySelectorAll("[id]")].map((el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);

    const referenced = [...container.querySelectorAll("[aria-labelledby]")]
      .flatMap((el) => el.getAttribute("aria-labelledby").split(/\s+/))
      .filter(Boolean);
    expect(referenced.length).toBeGreaterThan(0);
    expect(referenced.filter((id) => !ids.includes(id))).toEqual([]);
  });
});
