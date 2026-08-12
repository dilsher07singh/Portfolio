import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vendor code changes only when a dependency is upgraded, whereas application
// code changes on every commit. Splitting them means a returning visitor
// re-downloads only the small app chunk instead of the whole ~188KB bundle.
//
// Matched on the path segment (`/node_modules/<pkg>/`) rather than a bare
// substring, so a package that merely *mentions* one of these names — e.g. a
// hypothetical `react-icons-extra` — cannot be swept into the wrong chunk.
// `react-dom` is listed before `react` for readability; the trailing separator
// in the pattern is what actually disambiguates them.
const VENDOR_CHUNKS = [
  // react-dom pulls in scheduler, so they must share a chunk or the split
  // would create a circular import between them.
  { name: 'react-vendor', test: /[\\/]node_modules[\\/](react-dom|react|scheduler)[\\/]/ },
  { name: 'icons-vendor', test: /[\\/]node_modules[\\/]react-icons[\\/]/ },
]

function manualChunks(id) {
  if (!id.includes('node_modules')) return undefined
  return VENDOR_CHUNKS.find((chunk) => chunk.test.test(id))?.name
}

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    // The SSR bundle is a build intermediate that scripts/prerender.mjs imports
    // once and then deletes; splitting it would only add module resolution work
    // for no caching benefit, since it is never served to a browser.
    ...(isSsrBuild ? {} : { rollupOptions: { output: { manualChunks } } }),
  },
}))
