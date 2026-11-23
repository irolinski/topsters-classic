import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// needed because react-tooltip uses when it measures its anchor elements
// it's not in jsdom be default
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver =
  globalThis.ResizeObserver ?? (ResizeObserverMock as typeof ResizeObserver);

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
