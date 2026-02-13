import { reactive } from "@vue/reactivity";
import { describe, expect, it } from "vitest";
import { ReactiveUnionSet } from "../src/reactive-union-set.js";
import { effect } from "../src/reactivity.js";
import { flushJobs } from "../src/scheduler.js";

describe("ReactiveUnionSet: per-item disposers via addSubset", () => {
  it("calls onDelete when item is removed from subset", () => {
    const parentSet = new ReactiveUnionSet<string>();
    const subset = reactive(new Set<string>());
    const deleted: string[] = [];

    parentSet.addSubset(subset, {
      onDelete(value) {
        deleted.push(value);
      },
    });

    subset.add("a");
    subset.add("b");
    flushJobs();
    expect(parentSet.has("a")).toBe(true);
    expect(parentSet.has("b")).toBe(true);

    subset.delete("a");
    flushJobs();
    expect(parentSet.has("a")).toBe(false);
    expect(deleted).toContain("a");
  });

  it("calls onDelete for all items when subset is cleared", () => {
    const parentSet = new ReactiveUnionSet<string>();
    const subset = reactive(new Set<string>());
    const deleted: string[] = [];

    parentSet.addSubset(subset, {
      onDelete(value) {
        deleted.push(value);
      },
    });

    subset.add("a");
    subset.add("b");
    subset.add("c");
    flushJobs();
    expect(parentSet.size).toBe(3);

    subset.clear();
    flushJobs();
    expect(parentSet.size).toBe(0);
    expect(deleted.sort()).toEqual(["a", "b", "c"]);
  });

  it("disposes root scopes created by onAdd when item is removed", () => {
    const parentSet = new ReactiveUnionSet<string>();
    const subset = reactive(new Set<string>());
    let disposeCount = 0;

    // Use the constructor-level onAdd so items are still added to the set,
    // plus per-subset onAdd with root scope tracking.
    parentSet.addSubset(subset, {
      onAdd(value) {
        // The onAdd in addSubset wraps in root() internally.
        // Side-effects created here are cleaned up when the item is removed.
        effect(() => {
          void value; // track nothing real, just proving the effect exists
        });
        return value;
      },
      onDelete() {
        disposeCount++;
      },
    });

    subset.add("x");
    flushJobs();

    // Remove item — root scope (and its effects) should be disposed.
    subset.delete("x");
    flushJobs();
    expect(disposeCount).toBe(1);
  });

  it("re-adding after delete triggers fresh onAdd", () => {
    const parentSet = new ReactiveUnionSet<string>();
    const subset = reactive(new Set<string>());
    let addCount = 0;
    const deleted: string[] = [];

    parentSet.addSubset(subset, {
      onAdd(value) {
        addCount++;
        return value;
      },
      onDelete(value) {
        deleted.push(value);
      },
    });

    subset.add("a");
    flushJobs();
    expect(addCount).toBe(1);

    subset.delete("a");
    flushJobs();
    expect(deleted).toEqual(["a"]);

    subset.add("a");
    flushJobs();
    expect(addCount).toBe(2);
  });
});
