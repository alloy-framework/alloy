import { effect } from "@alloy-js/core/jsx-runtime";
import { reactive } from "@vue/reactivity";
import { describe, expect, it } from "vitest";
import { ReactiveUnionSet } from "../src/reactive-union-set.js";
import { flushJobs } from "../src/scheduler.js";

describe("is reactive", () => {
  it("on size", () => {
    const set = new ReactiveUnionSet();
    let callCount = 0;
    effect(() => {
      callCount++;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      set.size;
    });

    set.add(1);
    flushJobs();
    expect(callCount).toBe(2);
  });

  it("on iteration", () => {
    const set = new ReactiveUnionSet();
    let callCount = 0;
    effect(() => {
      callCount++;
      for (const _ of set) {
        // do nothing
      }
    });

    set.add(1);
    flushJobs();
    expect(callCount).toBe(2);
  });

  it("on deletion with iteration", () => {
    const set = new ReactiveUnionSet();
    let callCount = 0;
    effect(() => {
      callCount++;
      for (const _ of set) {
        // do nothing
      }
    });

    set.add(1);
    flushJobs();
    expect(callCount).toBe(2);

    set.delete(1);
    flushJobs();
    expect(callCount).toBe(3);
  });
});

it("adds items to main set from subset", () => {
  const set = new ReactiveUnionSet();

  const subset1 = reactive(new Set<number>());
  const subset2 = reactive(new Set<number>());

  set.addSubset(subset1);
  set.addSubset(subset2);

  subset1.add(1);
  subset2.add(2);
  flushJobs();
  expect(set.has(1)).toBe(true);
  expect(set.has(2)).toBe(true);

  subset1.delete(1);
  flushJobs();
  expect(set.has(1)).toBe(false);
});

it("doesn't remove items that are present in more than one subset", () => {
  const set = new ReactiveUnionSet();

  const subset1 = reactive(new Set<number>());
  const subset2 = reactive(new Set<number>());

  set.addSubset(subset1);
  set.addSubset(subset2);

  subset1.add(1);
  subset2.add(1);
  flushJobs();
  expect(set.has(1)).toBe(true);

  subset1.delete(1);
  flushJobs();
  expect(set.has(1)).toBe(true);

  subset2.delete(1);
  flushJobs();
  expect(set.has(1)).toBe(false);
});

it("removes all items when you clear the subset", () => {
  const set = new ReactiveUnionSet();

  const subset1 = reactive(new Set<number>());
  const subset2 = reactive(new Set<number>());

  set.addSubset(subset1);
  set.addSubset(subset2);
  subset1.add(1);
  subset1.add(2);
  subset1.add(3);
  subset2.add(1);
  flushJobs();
  expect(set.size).toBe(3);
  subset1.clear();
  flushJobs();
  expect(set.size).toBe(1);
});

interface Item {
  id: number;
  name: string;
}

describe("indexing", () => {
  it("creates an index of properties", () => {
    const set = new ReactiveUnionSet<Item>();

    const index = set.createIndex((item) => item.id);

    let callCount = 0;
    effect(() => {
      callCount++;
      index.values();
    });

    const brian = { id: 1, name: "brian" };
    const timothee = { id: 2, name: "timothee" };
    set.add(brian);
    set.add(timothee);
    flushJobs();
    expect(callCount).toBe(2);
    expect(index.get(1)).toEqual(brian);
    expect(index.get(2)).toEqual(timothee);
    set.delete(brian);
    flushJobs();
    expect(callCount).toBe(3);
    expect(index.get(1)).toBeUndefined();
  });

  it("updates the index when the item changeS", () => {
    const set = new ReactiveUnionSet<Item>();

    const index = set.createIndex((item) => item.id);

    let callCount = 0;
    effect(() => {
      callCount++;
      index.values();
    });

    const brian = reactive({ id: 1, name: "brian" });
    set.add(brian);
    flushJobs();
    expect(index.get(1)).toEqual(brian);
    brian.id = 2;
    flushJobs();
    expect(callCount).toBe(3);
    expect(index.get(2)).toEqual(brian);
  });
});

describe("derived sets", () => {
  it("creates a derived set", () => {
    const set = new ReactiveUnionSet<Item>();
    const derivedSet = set.createDerivedSet((item) => item.name);
    const brian = { id: 1, name: "brian" };
    const timothee = { id: 2, name: "timothee" };
    set.add(brian);
    set.add(timothee);
    flushJobs();
    expect(derivedSet.size).toBe(2);
    expect(derivedSet.has("brian")).toBe(true);
    expect(derivedSet.has("timothee")).toBe(true);

    set.delete(brian);
    flushJobs();
    expect(derivedSet.size).toBe(1);
    expect(derivedSet.has("brian")).toBe(false);
    expect(derivedSet.has("timothee")).toBe(true);
  });
});
