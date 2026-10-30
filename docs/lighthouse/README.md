# Lighthouse results

Lighthouse 12.8, run 2026-10-30 against a local `yarn build && yarn preview` of
the LLM-first rewrite, in headless Chromium. Raw reports: `mobile.json` (default
mobile emulation and throttling) and `desktop.json` (`--preset=desktop`).

| Run | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Mobile | 90 | 100 | 100 | 100 |
| Desktop | 100 | 100 | 100 | 100 |

Mobile LCP 3.0 s, CLS 0.016, TBT 0 ms. Desktop LCP 0.6 s, CLS 0, TBT 0 ms. One
earlier desktop run scored 92 (LCP 1.3 s) while screenshots were being taken on
the same machine; two reruns both scored 100.
