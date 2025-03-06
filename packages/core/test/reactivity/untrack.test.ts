import { ref } from "@vue/reactivity";
import { expect, it } from "vitest";
import { memo, untrack } from "../../src/jsx-runtime.js";

it("ignores signals for dependency tracking", () => {
  const signal = ref(0);

  const m = memo(() => {
    return untrack(() => signal.value);
  });

  expect(m()).toBe(0);

  signal.value = 1;

  expect(m()).toBe(0);
});

it("doesn't affect signal changes", () => {
  const signal = ref(0);

  const m = memo(() => {
    return signal.value;
  });

  expect(m()).toBe(0);

  untrack(() => {
    signal.value = 1;
  });

  expect(m()).toBe(1);
});
