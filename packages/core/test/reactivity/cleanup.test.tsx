import { Children, cleanup, effect, memo } from "@alloy-js/core/jsx-runtime";
import { ref } from "@vue/reactivity";
import { describe, expect, it } from "vitest";
import { renderTree } from "../../src/render.js";

describe("memo cleanup", () => {
  it("cleans up when memo value is recomputed", () => {
    const r = ref(1);
    let cleanedUp = false;
    const m = memo(() => {
      cleanup(() => {
        cleanedUp = true;
      });

      return r.value;
    });

    expect(m()).toBe(1);
    expect(cleanedUp).toBe(false);

    r.value = 2;

    expect(m()).toBe(2);
    expect(cleanedUp).toBe(true);
  });
});

describe("effect cleanup", () => {
  it("cleans up when the effect is run", () => {
    const r = ref(1);
    let cleanedUp = false;
    effect(() => {
      cleanup(() => {
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
      cleanup(() => {
        cleanedUp = true;
      });
      return "hi!";
    }
    const el = ref<unknown>(<Component />);
    const template = <>
      {el}
    </>;
    renderTree(template);
    el.value = "";
    expect(cleanedUp).toBe(true);
  });

  it("should clean up when the element is unmounted, recursively", () => {
    let cleanedUpC1 = false;
    let cleanedUpC2 = false;

    function C1(props: { children: Children }) {
      cleanup(() => {
        cleanedUpC1 = true;
      });
      return props.children;
    }

    function C2() {
      cleanup(() => {
        cleanedUpC2 = true;
      });
    }
    const el = ref<unknown>(<C1>
      <C2></C2>
    </C1>);
    const template = <>
      {el}
    </>;
    renderTree(template);
    el.value = "";
    expect(cleanedUpC1).toBe(true);
    expect(cleanedUpC2).toBe(true);
  });
});
