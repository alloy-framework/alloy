import { effect, reactive } from "@vue/reactivity";
import { expect, it, vi } from "vitest";
import { splitProps } from "../src/props-combinators.js";

it("splits regular object props", () => {
  const props = {
    a: 1,
    b: 2,
    c: 3,
  };

  const [ab, rest] = splitProps(props, ["a", "b"]);

  expect(ab).toEqual({ a: 1, b: 2 });
  expect(rest).toEqual({ c: 3 });
});

it("splits props with getters without invoking them", () => {
  const getterA = vi.fn(() => 1);
  const getterB = vi.fn(() => 2);
  const props = {
    get a() {
      return getterA();
    },
    get b() {
      return getterB();
    },
    c: 3,
  };

  const [ab, rest] = splitProps(props, ["a", "b"]);

  expect(getterA).not.toHaveBeenCalled();
  expect(getterB).not.toHaveBeenCalled();

  expect(ab.a).toBe(1);
  expect(getterA).toHaveBeenCalledTimes(1);
  expect(ab.b).toBe(2);
  expect(getterB).toHaveBeenCalledTimes(1);

  expect(rest).toEqual({ c: 3 });
});

it("splits reactive props without observing them initially", () => {
  const props = reactive({
    a: 1,
    b: 2,
    c: 3,
  });

  const [ab, rest] = splitProps(props, ["a", "b"]);

  expect(ab.a).toBe(1);
  expect(ab.b).toBe(2);
  expect(rest.c).toBe(3);
});

it("ensures effect is not triggered by splitProps but by accessing reactive props", () => {
  const props = reactive({
    a: 1,
    b: 2,
    c: 3,
  });

  let splits: any;
  const splitEffect = vi.fn(() => {
    splits = splitProps(props, ["a", "b"]);
  });

  effect(splitEffect);
  expect(splitEffect).toHaveBeenCalledTimes(1);

  const observeEffect = vi.fn(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    splits[0].a;
  });
  effect(observeEffect);
  expect(observeEffect).toHaveBeenCalledTimes(1);

  props.a = 2;
  expect(splitEffect).toHaveBeenCalledTimes(1);
  expect(observeEffect).toHaveBeenCalledTimes(2);

  splits[0].a = 3;
  expect(splitEffect).toHaveBeenCalledTimes(1);
  expect(observeEffect).toHaveBeenCalledTimes(3);
});
