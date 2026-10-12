// Injects the server-rendered markup into the built dist/index.html, turning
// the empty <div id="root"></div> shell into real static HTML.
//
// Runs last in the build chain, after both the client build (which writes
// dist/index.html and hashes the assets) and the SSR build (which writes
// dist/server/entry-server.js). Crawlers and link-preview scrapers execute no
// JavaScript, so before this step they saw an empty page; after it they see the
// full document, and src/main.jsx hydrates onto it in the browser.
//
// Unlike fetch-github.mjs and optimize-images.mjs, this script FAILS THE BUILD
// on any problem. Those two degrade gracefully because a GitHub outage or a
// missing image binary should not block a deploy, and both have a committed
// fallback to fall back to. There is no fallback for prerendering: silently
// emitting the empty shell would ship exactly the SEO defect this exists to
// fix, and it would do so invisibly.

import { readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TEMPLATE = resolve(ROOT, "dist/index.html");
const SERVER_ENTRY = resolve(ROOT, "dist/server/entry-server.js");
const SERVER_DIR = resolve(ROOT, "dist/server");

// The client build emits this verbatim from index.html. Matched as an exact
// string rather than a regex so a change to the shell fails loudly here instead
// of silently prerendering into the wrong place.
const ROOT_DIV = '<div id="root"></div>';

const fail = (message) => {
  console.error(`[prerender] ${message}`);
  process.exit(1);
};

const template = await readFile(TEMPLATE, "utf8").catch(() =>
  fail(`Could not read ${TEMPLATE}. Run \`vite build\` first.`),
);

if (!template.includes(ROOT_DIV)) {
  fail(
    `Could not find ${ROOT_DIV} in dist/index.html. If the root element in ` +
      `index.html changed, update ROOT_DIV in this script to match.`,
  );
}

const { render } = await import(pathToFileURL(SERVER_ENTRY).href).catch(() =>
  fail(
    `Could not import ${SERVER_ENTRY}. Run the SSR build first: ` +
      `vite build --ssr src/entry-server.jsx --outDir dist/server`,
  ),
);

const appHtml = render();

if (!appHtml || appHtml.length < 1000) {
  fail(
    `render() returned ${appHtml ? `${appHtml.length} characters` : "nothing"}, ` +
      `which is too little to be the full page. Refusing to ship an empty shell.`,
  );
}

// A replacer FUNCTION, not a string: the rendered markup contains `$` (in the
// gradient class names among others) and String.replace treats $&, $', $` and
// $1 as substitution patterns in a string replacement, which would corrupt it.
await writeFile(
  TEMPLATE,
  template.replace(ROOT_DIV, () => `<div id="root">${appHtml}</div>`),
  "utf8",
);

// The SSR bundle is a build intermediate. dist/ is what gets deployed, so
// leaving it there would publish a second copy of the whole application bundle
// for no reason.
await rm(SERVER_DIR, { recursive: true, force: true });

console.log(
  `[prerender] Injected ${appHtml.length.toLocaleString()} characters into dist/index.html`,
);
