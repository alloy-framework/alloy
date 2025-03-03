import { Children, effect, memo, onCleanup } from "@alloy-js/core/jsx-runtime";
import { ref } from "@vue/reactivity";
import { describe, expect, it } from "vitest";
import { renderTree } from "../../src/render.js";

describe("memo cleanup", () => {
  it("cleans up when memo value is recomputed", () => {
    const r = ref(1);
    let callCount = 0;
    const m = memo(() => {
      onCleanup(() => {
        callCount++;
      });

      return r.value;
    });

    expect(m()).toBe(1);
    expect(callCount).toBe(0);

    r.value = 2;

    expect(m()).toBe(2);
    expect(callCount).toBe(1);
  });
});

describe("effect cleanup", () => {
  it("cleans up when the effect is run", () => {
    const r = ref(1);
    let cleanedUp = false;
    effect(() => {
      onCleanup(() => {
        cleanedUp = true;
      });

      return r.value;
    });

    expect(cleanedUp).toBe(false);

    r.value = 2;

    expect(cleanedUp).toBe(true);
  });
});

describe("element cleanup", () => {
  it("should clean up when the element is unmounted", () => {
    let cleanedUp = false;
    function Component() {
      onCleanup(() => {
        cleanedUp = true;
      });
      return "hi!";
    }
    const el = ref<unknown>(<Component />);
    const template = <>{el}</>;
    renderTree(template);
    el.value = "";
    expect(cleanedUp).toBe(true);
  });

  it("should clean up when the element is unmounted, recursively", () => {
    let cleanedUpC1 = false;
    let cleanedUpC2 = false;

    function C1(props: { children: Children }) {
      onCleanup(() => {
        cleanedUpC1 = true;
      });
      return props.children;
    }

    function C2() {
      onCleanup(() => {
        cleanedUpC2 = true;
      });
    }
    const el = ref<unknown>(
      <C1>
        <C2></C2>
      </C1>,
    );
    const template = <>{el}</>;
    renderTree(template);
    el.value = "";
    expect(cleanedUpC1).toBe(true);
    expect(cleanedUpC2).toBe(true);
  });
});
