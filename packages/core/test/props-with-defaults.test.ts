import { effect, reactive } from "@vue/reactivity";
import { expect, it, vi } from "vitest";
import { defaultProps } from "../src/jsx-runtime.js";

it("applies defaults to regular object props", () => {
  const props = {
    a: 1,
    b: 2,
    c: undefined as number | undefined,
  };

  const dProps = defaultProps(props, { a: 10, c: 20 });

  expect(dProps).toEqual({ a: 1, b: 2, c: 20 });
});

it("applies defaults with getters without invoking them", () => {
  const getterA = vi.fn(() => 1);
  const getterB = vi.fn(() => undefined as number | undefined);
  const props = {
    get a() {
      return getterA();
    },
    get b() {
      return getterB();
    },
    c: 3,
  };

  const dProps = defaultProps(props, { b: 20, c: 30 });

  expect(getterA).not.toHaveBeenCalled();
  expect(getterB).not.toHaveBeenCalled();

  const value = dProps.b;
  expect(getterB).toHaveBeenCalledTimes(1);
  expect(value).toEqual(20);
});

it("applies defaults to reactives without observing them initially", () => {
  const props = reactive({
    a: 1,
    b: 2,
    c: undefined as number | undefined,
  });

  const defaults = defaultProps(props, { c: 10 });

  expect(defaults.a).toBe(1);
  expect(defaults.b).toBe(2);
  expect(defaults.c).toBe(10);
});

it("ensures effect is not triggered by defaults but by accessing reactive props", () => {
  const props = reactive({
    a: 1,
    b: 2,
    c: undefined as number | undefined,
  });

  let withDefaults: any;
  const splitEffect = vi.fn(() => {
    withDefaults = defaultProps(props, { c: 10 });
  });

  effect(splitEffect);
  expect(splitEffect).toHaveBeenCalledTimes(1);

  const observeEffect = vi.fn(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    withDefaults.a;
  });
  effect(observeEffect);
  expect(observeEffect).toHaveBeenCalledTimes(1);

  props.a = 2;
  expect(splitEffect).toHaveBeenCalledTimes(1);
  expect(observeEffect).toHaveBeenCalledTimes(2);
});

it("applies defaults to reactives", () => {
  const props = reactive({
    a: 1,
    b: 2,
    c: undefined as number | undefined,
  });

  const withDefaults = defaultProps(props, { c: 10 });

  expect(withDefaults.c).toBe(10);
  props.c = 20;

  expect(withDefaults.c).toBe(20);
  props.c = undefined;

  expect(withDefaults.c).toBe(10);
});
