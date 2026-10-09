export * from "./create-test-wrapper.jsx";
// Side-effect import registers the vitest matchers (expect.extend); the
// re-export below only surfaces the type-only `ToRenderToOptions`.
import "./extend-expect.js";
export type * from "./extend-expect.js";
export * from "./render.js";
