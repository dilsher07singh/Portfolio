import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "../App.jsx";

// Binding rules from docs/portfolio_brief.md, checked against the rendered
// page (including collapsed case-study text) so a copy edit cannot quietly
// reintroduce something the brief forbids.

const renderPageText = () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ weeks: [], totalContributions: 0 }),
    }),
  );
  const { container } = render(<App />);
  return container.textContent;
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("portfolio brief rules", () => {
  it("uses none of the banned words", () => {
    const text = renderPageText();
    const banned = [
      /passionate/i,
      /results-driven/i,
      /synergy/i,
      /leveraged/i,
      /spearheaded/i,
      /rockstar/i,
      /ninja/i,
      /AI engineer/i,
      /GenAI/i,
      /LLM expert/i,
    ];
    for (const pattern of banned) expect(text).not.toMatch(pattern);
  });

  it("makes none of the never-claim claims", () => {
    const text = renderPageText();
    const forbidden = [
      /2-of-3/i,
      /royalt/i,
      /ERC-2981/i,
      /LangChain|LangGraph|\bRAG\b|Vercel AI SDK/,
      /Kubernetes/i,
      /underwriting/i,
    ];
    for (const pattern of forbidden) expect(text).not.toMatch(pattern);
  });

  it("publishes no job-search status and no WhatsApp number", () => {
    const text = renderPageText();
    expect(text).not.toMatch(/open to (work|conversations|opportunities)/i);
    expect(text).not.toMatch(/notice period|salary/i);
    expect(document.querySelector('a[href*="wa.me"]')).toBeNull();
  });

  it("uses no contractions", () => {
    const text = renderPageText();
    expect(text).not.toMatch(/\b\w+(?:'|’)(?:m|re|ve|ll|d|t)\b/i);
  });

  it("uses full https:// URLs for every external link", () => {
    renderPageText();
    const external = [...document.querySelectorAll("a[href]")]
      .map((a) => a.getAttribute("href"))
      .filter((href) => !href.startsWith("#") && !href.startsWith("mailto:"));
    expect(external.length).toBeGreaterThan(0);
    for (const href of external) expect(href).toMatch(/^https:\/\//);
  });
});
