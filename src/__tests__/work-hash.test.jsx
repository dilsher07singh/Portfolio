import { render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Work from "../components/Work.jsx";
import { CASE_STUDIES } from "../constants";

// A link to #work-<id> opens that Selected work card, and opening a card puts
// its hash in the URL so it can be shared.

const detailsFor = (container, id) =>
  container.querySelector(`article[aria-labelledby="work-${id}"] details`);

const setHash = (hash) =>
  history.replaceState(null, "", `${window.location.pathname}${hash}`);

beforeEach(() => {
  // jsdom does not implement scrolling.
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  vi.spyOn(window, "scrollBy").mockImplementation(() => {});
});

afterEach(() => {
  setHash("");
  vi.restoreAllMocks();
});

describe("Selected work URL hash", () => {
  it("opens and scrolls to the card named by the hash on load", () => {
    setHash("#work-payouts");
    const { container } = render(<Work />);

    for (const { id } of CASE_STUDIES) {
      expect(detailsFor(container, id).open).toBe(id === "payouts");
    }
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });

  it("ignores a hash that is not a card", () => {
    setHash("#work-heading");
    const { container } = render(<Work />);

    for (const { id } of CASE_STUDIES) {
      expect(detailsFor(container, id).open).toBe(false);
    }
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("opens the card when the hash changes after load", () => {
    const { container } = render(<Work />);
    setHash("#work-sdlc");
    window.dispatchEvent(new HashChangeEvent("hashchange"));

    expect(detailsFor(container, "sdlc").open).toBe(true);
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });

  it("puts the card's hash in the URL when opened and removes it when closed", async () => {
    const { container } = render(<Work />);
    const details = detailsFor(container, "llm-extraction");

    details.open = true;
    await waitFor(() =>
      expect(window.location.hash).toBe("#work-llm-extraction"),
    );

    details.open = false;
    await waitFor(() => expect(window.location.hash).toBe(""));
  });
});
