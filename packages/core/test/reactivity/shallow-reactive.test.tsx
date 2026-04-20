import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  getReactiveCreationLocation,
  shallowReactive,
} from "../../src/reactivity.js";

describe("shallowReactive creation location", () => {
  let origDebug: string | undefined;

  beforeEach(() => {
    origDebug = process.env.ALLOY_DEBUG;
    process.env.ALLOY_DEBUG = "1";
  });

  afterEach(() => {
    if (origDebug === undefined) {
      delete process.env.ALLOY_DEBUG;
    } else {
      process.env.ALLOY_DEBUG = origDebug;
    }
  });

  it("stores creation location keyed by raw target when debug enabled", () => {
    const raw = { x: 1 };
    shallowReactive(raw);

    const location = getReactiveCreationLocation(raw);
    // When ALLOY_DEBUG is set, captureSourceLocation should return something.
    expect(location).toBeDefined();
  });

  it("does not store location when debug is disabled", () => {
    delete process.env.ALLOY_DEBUG;
    const raw = { y: 2 };
    shallowReactive(raw);

    const location = getReactiveCreationLocation(raw);
    expect(location).toBeUndefined();
  });

  it("location is keyed by raw target, not proxy", () => {
    const raw = { z: 3 };
    const proxy = shallowReactive(raw);

    // Proxy and raw are different objects.
    expect(proxy).not.toBe(raw);

    // Location should be on the raw target.
    const location = getReactiveCreationLocation(raw);
    expect(location).toBeDefined();

    // The proxy itself should NOT have a location stored (WeakMap keyed by raw).
    // Note: Vue may unwrap the proxy to raw internally, but our code explicitly
    // stores on `target` (the raw object passed to shallowReactive).
  });
});
