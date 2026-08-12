import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// A separate file from vite.config.js on purpose: this config REPLACES the
// build config rather than extending it, and none of what lives there —
// manual vendor chunking, the SSR entry — has any meaning under the test
// runner. The react plugin is the only piece both need.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.js"],
    include: ["src/**/*.test.{js,jsx}"],
    // Globals are deliberately off: every test imports describe/it/expect from
    // "vitest" explicitly, so no ESLint globals config is needed to lint them.
    globals: false,
    restoreMocks: true,
  },
});
