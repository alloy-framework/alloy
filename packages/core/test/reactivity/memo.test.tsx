import { ref } from "@vue/reactivity";
import { expect, it } from "vitest";
import { memo } from "../../src/reactivity.js";

it("doesn't recalculate when dependencies don't change", () => {
  const signal = ref(0);
  let callCount = 0;
  const m = memo(() => {
    callCount += 1;
    return signal.value;
  });
  expect(callCount).toBe(1);
  m();
  expect(callCount).toBe(1);
  m();
  expect(callCount).toBe(1);
});
