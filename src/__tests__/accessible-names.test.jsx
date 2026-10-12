import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Hero from "../components/Hero.jsx";
import Navbar from "../components/Navbar.jsx";
import Work from "../components/Work.jsx";
import { CASE_STUDIES, EARLIER_PROJECT, METRICS } from "../constants";

describe("Navbar", () => {
  it("names the logo link once, from the anchor rather than the image", () => {
    const { container } = render(<Navbar />);

    const logoLink = screen.getByRole("link", {
      name: "Dilsher Singh — back to top",
    });
    // alt="" keeps the image out of the tree entirely; an alt with text would
    // announce a second name for the same link.
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
    expect(within(logoLink).queryByRole("img")).toBeNull();
  });

  it("hides every decorative icon from assistive technology", () => {
    const { container } = render(<Navbar />);

    expect(
      container.querySelectorAll('svg:not([aria-hidden="true"])'),
    ).toHaveLength(0);
  });
});

describe("Hero metrics", () => {
  it("announces each metric label exactly once", () => {
    const { container } = render(<Hero />);

    for (const metric of METRICS) {
      const matches = [...container.querySelectorAll("dt, dd, span")].filter(
        (el) => el.textContent.trim() === metric.label,
      );
      expect(matches).toHaveLength(1);
      expect(matches[0].tagName).toBe("DT");
    }
  });

  it("pairs every term with its definition", () => {
    const { container } = render(<Hero />);

    expect(container.querySelectorAll("dt")).toHaveLength(METRICS.length);
    expect(container.querySelectorAll("dd")).toHaveLength(METRICS.length);
  });
});

describe("Selected work", () => {
  it("keeps each case study's title, summary and result visible without expanding", () => {
    const { container } = render(<Work />);

    for (const study of CASE_STUDIES) {
      const summary = screen
        .getByRole("heading", { name: study.title })
        .closest("summary");
      expect(summary).not.toBeNull();
      expect(summary).toHaveTextContent(study.summary);
      expect(summary).toHaveTextContent(study.result);
    }
    // Collapsed by default; the detail is one click away, not on screen.
    expect(container.querySelectorAll("details[open]")).toHaveLength(0);
  });

  it("names the earlier-work link from its title plus the new-tab hint", () => {
    render(<Work />);

    const link = screen.getByRole("link", {
      name: `${EARLIER_PROJECT.title} (opens in a new tab)`,
    });
    expect(link).toHaveAttribute("href", EARLIER_PROJECT.link);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not repeat a chip's visible text in a title attribute", () => {
    const { container } = render(<Work />);

    expect(container.querySelectorAll("span[title]")).toHaveLength(0);
  });
});
