import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Hero from "../components/Hero.jsx";
import Navbar from "../components/Navbar.jsx";
import Projects from "../components/Projects.jsx";
import { METRICS, PROJECTS } from "../constants";

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

describe("Projects", () => {
  it("names each card link from its heading plus the new-tab hint", () => {
    render(<Projects />);

    for (const project of PROJECTS) {
      const link = screen.getByRole("link", {
        name: `${project.title} (opens in a new tab)`,
      });
      expect(link).toHaveAttribute("href", project.link);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      // The old label claimed a details page that does not exist.
      expect(link).not.toHaveAttribute("aria-label");
    }
  });

  it("keeps the card body reachable inside the link", () => {
    render(<Projects />);

    for (const project of PROJECTS) {
      const link = screen.getByRole("link", {
        name: `${project.title} (opens in a new tab)`,
      });
      expect(link).toHaveTextContent(project.description);
      for (const tech of project.technologies) {
        expect(within(link).getByText(tech)).toBeInTheDocument();
      }
    }
  });

  it("does not repeat a chip's visible text in a title attribute", () => {
    const { container } = render(<Projects />);

    expect(container.querySelectorAll("span[title]")).toHaveLength(0);
  });
});
