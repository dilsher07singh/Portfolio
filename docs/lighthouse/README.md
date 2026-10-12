# Lighthouse results

Lighthouse 12, run 2026-10-12 against a local `yarn build && yarn preview` of
the site, in headless Chromium. Raw reports: `mobile.json` (default mobile
emulation and throttling) and `desktop.json` (`--preset=desktop`).

| Run | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Mobile | 91 | 100 | 96 | 100 |
| Desktop | 100 | 100 | 96 | 100 |

Mobile LCP 2.7 s, CLS 0, TBT 0 ms. Desktop LCP 0.6 s, CLS 0.017, TBT 0 ms.

The one Best Practices miss is a console error from the GitHub Contributions
section: `vite preview` has no API routes, so `/api/github-contributions`
returns the HTML shell there. On Vercel the route exists and the error does not
occur. Re-run against the production URL after deploying to confirm.
