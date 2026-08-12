import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Testing Library only auto-cleans when the runner exposes a global afterEach,
// and vitest.config.js keeps globals off, so unmount explicitly. Without this
// every render leaks into the next test's document and duplicate-role
// assertions start failing for the wrong reason.
afterEach(cleanup);
