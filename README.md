# dilshersingh.com

Personal portfolio site for Dilsher Singh — a single-page React app built with
Vite and Tailwind, prerendered to static HTML at build time and deployed on
Vercel.

## Requirements

- **Node 22** (`.nvmrc` and the `engines` field both pin it; `nvm use` picks it up)
- **Yarn 1.22** — this repo has a `yarn.lock`. Do not run bare `npm install`:
  npm rewrites the lockfile in place, swapping every `registry.yarnpkg.com`
  entry for `registry.npmjs.org`.

## Getting started

```bash
yarn install
yarn dev          # vite dev server
```

`yarn dev` serves the app from source with no prerender step, so the page is
client-rendered there. To see what actually ships, run `yarn build && yarn
preview`.

## Scripts

| Script | What it does |
| --- | --- |
| `yarn dev` | Vite dev server with HMR |
| `yarn build` | The full production pipeline (below) |
| `yarn preview` | Serves the built `dist/` — the closest thing to production |
| `yarn lint` | ESLint, including `jsx-a11y` accessibility rules |
| `yarn typecheck` | `tsc --noEmit` over the JS/JSX sources (see below) |
| `yarn test` | Vitest run, once |
| `yarn test:watch` | Vitest in watch mode |
| `yarn optimize:images` | Re-encodes `src/assets/originals/` to WebP |
| `yarn generate:icons` | Rasterizes the favicon/app icons from the source SVG |

The full gate, in the order CI and the automation loop should run it:

```bash
yarn lint && yarn typecheck && yarn test && yarn build
```

## Environment

Copy `.env.example` to `.env` and fill in:

| Variable | Purpose |
| --- | --- |
| `GITHUB_TOKEN` | A GitHub personal access token with the `read:user` scope. Read **only at build time** by `scripts/fetch-github.mjs`. |

The name deliberately has no `VITE_` prefix: anything prefixed that way is
inlined into the client bundle by Vite and therefore published to every
visitor. The contributions heatmap reads a static
`public/github-contributions.json` written during the build, so no credential
ever reaches the browser.

If `GITHUB_TOKEN` is unset the fetch step logs a warning and exits 0, leaving
the committed `public/github-contributions.json` in place — the graph then
shows data frozen as of that commit rather than failing the build. On Vercel,
set `GITHUB_TOKEN` in the project's environment variables.

## Build pipeline

`yarn build` runs five steps in order:

1. `scripts/generate-icons.mjs` — rasterizes `public/dilsher2.svg` into the
   apple-touch-icon and the 192/512 PWA icons. Skipped when the source hash in
   `scripts/icons.manifest.json` is unchanged.
2. `scripts/optimize-images.mjs` — encodes `src/assets/originals/*` to WebP at
   roughly 2× display size into `src/assets/optimized/`. Same content-hash skip,
   recorded in `src/assets/optimized/.manifest.json`.
3. `scripts/fetch-github.mjs` — writes `public/github-contributions.json`.
4. `vite build`, then `vite build --ssr src/entry-server.jsx` — the client
   bundle, then a server bundle used only by the next step.
5. `scripts/prerender.mjs` — renders `<App />` to HTML, injects it into
   `dist/index.html`, and deletes the intermediate `dist/server/`.

Steps 1–3 degrade gracefully: their outputs are committed, so a missing token
or an unusable `sharp` binary produces a warning, not a failed deploy. Step 5
does the opposite and fails loudly — there is no fallback for prerendering, and
degrading quietly would silently ship an empty shell to every crawler.

`src/main.jsx` therefore uses `hydrateRoot`, not `createRoot`. It and
`src/entry-server.jsx` must render an identical tree; if you add a provider,
add it to both or hydration will mismatch. Any new component must stay
SSR-safe: no `window`, `document` or `localStorage` at module scope or in a
render body.

## Typechecking without TypeScript

There is no TypeScript source here. `tsconfig.json` sets `allowJs` + `checkJs`
+ `noEmit`, which turns `tsc` into a type-aware linter over the existing
`.js`/`.jsx`/`.mjs` files, driven by JSDoc annotations and inference. It covers
`src/` and `scripts/`.

## Tests

Vitest with jsdom and Testing Library; specs live in `src/__tests__/`. They
guard the invariants that are invisible on screen and so regress silently —
landmark names, accessible link names, the single `contentinfo`, the skip link,
`aria-hidden` on decorative icons, and that the contributions fetch never
carries credentials. Config is in `vitest.config.js`, which replaces
`vite.config.js` during a test run rather than extending it.

## Deployment

Vercel builds `dist/` from `yarn build`. `vercel.json` carries the cache
headers; `public/` is copied verbatim and is not processed by Vite or by the
image pipeline.
