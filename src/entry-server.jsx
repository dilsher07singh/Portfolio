import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

/**
 * Server entry for the prerender pass.
 *
 * The site has exactly one route and no router, so this renders the whole app
 * to a string once at build time; scripts/prerender.mjs injects the result into
 * dist/index.html. No request object is needed and none is accepted.
 *
 * The tree here must match src/main.jsx exactly — including StrictMode, which
 * emits no DOM of its own but is kept aligned so the two entries cannot drift.
 * Any divergence surfaces as a hydration mismatch in the console.
 */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
