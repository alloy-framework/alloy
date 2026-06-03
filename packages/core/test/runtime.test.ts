/**
 * Phase 1 — runtime unit tests.
 *
 * These exercise the new runtime API (`createComponent` thunk
 * invocation via `insert` + `runInContext`, `createIntrinsic` returning
 * `ElementNode`, `Fragment`, polymorphic `insert`) directly — without
 * going through babel — by hand-writing what compiled output would look
 * like. Babel-plugin integration is a follow-up phase.
 */

import { ref, shallowRef } from "@vue/reactivity";
import { describe, expect, it } from "vitest";
import { createContentSlot } from "../src/content-slot.jsx";
import { createCustomContext, root } from "../src/reactivity.js";
import {
  CommentNode,
  createElement,
  createFragment,
  type AlloyNode,
} from "../src/render/index.js";
import type { Children } from "../src/runtime/component.js";
import {
  createComponent,
  createIntrinsic,
  Fragment,
  insert,
} from "../src/runtime/index.js";
import { flushJobs } from "../src/scheduler.js";
import { textContent } from "./tree-test-utils.js";

function expectTreeIntegrity(rootNode: AlloyNode): void {
  const seen = new Set<AlloyNode>();
  const markers: string[] = [];
  const starts = new Map([
    ["slot:start", "slot:end"],
    ["slot:item:start", "slot:item:end"],
    ["ctx:start", "ctx:end"],
  ]);
  const ends = new Map([...starts].map(([start, end]) => [end, start]));

  function visit(node: AlloyNode): void {
    expect(seen.has(node)).toBe(false);
    seen.add(node);

    if (node instanceof CommentNode) {
      const end = starts.get(node.data);
      if (end) {
        markers.push(end);
      } else if (ends.has(node.data)) {
        expect(markers.pop()).toBe(node.data);
      }
    }

    let previous: AlloyNode | null = null;
    let child = node.firstChild;
    while (child !== null) {
      expect(child.parentNode).toBe(node);
      expect(child.previousSibling).toBe(previous);
      if (previous) {
        expect(previous.nextSibling).toBe(child);
      }
      visit(child);
      previous = child;
      child = child.nextSibling;
    }
    expect(node.lastChild).toBe(previous);
    if (previous) {
      expect(previous.nextSibling).toBeNull();
    } else {
      expect(node.firstChild).toBeNull();
    }
  }

  visit(rootNode);
  expect(markers).toEqual([]);
}

describe("runtime — primitives", () => {
  it("createIntrinsic returns ElementNode with localName + data", () => {
    const node = createIntrinsic("group", { shouldBreak: true });
    expect(node.localName).toBe("group");
    expect((node.data as { shouldBreak: boolean }).shouldBreak).toBe(true);
  });

  it("createIntrinsic eagerly inserts string children", () => {
    const node = createIntrinsic("indent", { children: "hello" });
    expect(textContent(node)).toBe("hello");
  });

  it("createIntrinsic eagerly inserts array children in order", () => {
    const node = createIntrinsic("group", {
      children: ["a", "b", "c"],
    });
    expect(textContent(node)).toBe("abc");
  });

  it("data excludes children", () => {
    const node = createIntrinsic("group", {
      shouldBreak: false,
      children: ["x"],
    });
    const data = node.data as { shouldBreak: boolean; children?: unknown };
    expect(data.shouldBreak).toBe(false);
    expect(data.children).toBeUndefined();
  });

  it("Fragment splices its children into parent on insert", () => {
    const parent = createElement("group");
    const f = Fragment({ children: ["hello", " ", "world"] });
    insert(parent, f);
    expect(textContent(parent)).toBe("hello world");
    // Fragment is emptied after splice (DOM DocumentFragment semantics).
    expect(f.firstChild).toBeNull();
  });
});

describe("runtime — insert polymorphism", () => {
  it("strings, numbers, booleans, null, undefined", () => {
    const parent = createElement("group");
    insert(parent, "a");
    insert(parent, 42);
    insert(parent, true);
    insert(parent, false);
    insert(parent, null);
    insert(parent, undefined);
    insert(parent, "b");
    expect(textContent(parent)).toBe("a42b");
  });

  it("arrays are flattened in order", () => {
    const parent = createElement("group");
    insert(parent, ["a", ["b", ["c", "d"]], "e"]);
    expect(textContent(parent)).toBe("abcde");
  });

  it("AlloyNode child is inserted directly", () => {
    const parent = createElement("group");
    const t = createElement("indent");
    t.append("inner");
    insert(parent, t);
    expect(textContent(parent)).toBe("inner");
    expect(parent.firstChild).toBe(t);
  });

  it("inserts before marker when given", () => {
    const parent = createElement("group");
    parent.append("[", "]");
    const marker = parent.lastChild!; // the "]"
    insert(parent, "middle", marker);
    expect(textContent(parent)).toBe("[middle]");
  });
});

describe("runtime — component thunking", () => {
  it("createComponent returns a thunk; body runs only when inserted", () => {
    let invocations = 0;
    const Greet = (props: { name: string }) => {
      invocations++;
      const f = createFragment();
      insert(f, ["hello, ", props.name]);
      return f;
    };

    const thunk = createComponent(Greet, { name: "world" });
    expect(invocations).toBe(0);

    const parent = createElement("group");
    insert(parent, thunk);
    expect(invocations).toBe(1);
    expect(textContent(parent)).toBe("hello, world");
  });

  it("conditionally skipped components do not run", () => {
    let aRan = 0;
    let bRan = 0;
    const A = () => {
      aRan++;
      return "A";
    };
    const B = () => {
      bRan++;
      return "B";
    };

    const flag = false;
    const parent = createElement("group");
    insert(parent, flag ? createComponent(A, {}) : createComponent(B, {}));
    expect(aRan).toBe(0);
    expect(bRan).toBe(1);
    expect(textContent(parent)).toBe("B");
  });

  it("nested components compose; child renders inside parent's intrinsic", () => {
    const Inner = (props: { value: string }) => props.value;
    const Outer = () =>
      createIntrinsic("indent", {
        children: createComponent(Inner, { value: "x" }),
      });

    const parent = createElement("group");
    insert(parent, createComponent(Outer, {}));
    expect(textContent(parent)).toBe("x");
    // Outer's indent element is in the tree.
    expect((parent.firstChild as { localName?: string }).localName).toBe(
      "indent",
    );
  });
});

describe("runtime — reactive bindings", () => {
  it("function child reactively updates content between markers", () => {
    root(() => {
      const v = shallowRef("first");
      const parent = createElement("group");
      insert(parent, () => v.value);
      expect(textContent(parent)).toBe("first");
      v.value = "second";
      flushJobs();
      expect(textContent(parent)).toBe("second");
      v.value = "third";
      flushJobs();
      expect(textContent(parent)).toBe("third");
    });
  });

  it("ref child reactively updates", () => {
    root(() => {
      const r = ref(1);
      const parent = createElement("group");
      insert(parent, r);
      expect(textContent(parent)).toBe("1");
      r.value = 99;
      flushJobs();
      expect(textContent(parent)).toBe("99");
    });
  });

  it("function child producing arrays/components also updates correctly", () => {
    root(() => {
      const which = shallowRef<"a" | "b">("a");
      const A = () => "AAA";
      const B = () => "BBB";
      const parent = createElement("group");
      insert(parent, () =>
        which.value === "a" ? createComponent(A, {}) : createComponent(B, {}),
      );
      expect(textContent(parent)).toBe("AAA");
      which.value = "b";
      flushJobs();
      expect(textContent(parent)).toBe("BBB");
    });
  });

  it("clearing reactive content empties the bracketed range", () => {
    root(() => {
      const v = shallowRef<string | null>("hello");
      const parent = createElement("group");
      insert(parent, v);
      expect(textContent(parent)).toBe("hello");
      v.value = null;
      flushJobs();
      expect(textContent(parent)).toBe("");
      v.value = "again";
      flushJobs();
      expect(textContent(parent)).toBe("again");
    });
  });

  it("reconciles duplicate component thunk identities without corrupting markers", () => {
    root(() => {
      const Duplicate = () => "D";
      const duplicate = createComponent(Duplicate, {});
      const items = shallowRef<unknown[]>([duplicate, duplicate]);
      const parent = createElement("group");

      insert(parent, () => items.value);
      expect(textContent(parent)).toBe("DD");
      expectTreeIntegrity(parent);

      items.value = [duplicate, duplicate];
      flushJobs();
      expect(textContent(parent)).toBe("DD");
      expectTreeIntegrity(parent);
    });
  });

  it("reconciles duplicate custom context identities without corrupting markers", () => {
    root(() => {
      const duplicate = createCustomContext((useChildren) => {
        useChildren("C");
      });
      const items = shallowRef<unknown[]>([duplicate, duplicate]);
      const parent = createElement("group");

      insert(parent, () => items.value);
      expect(textContent(parent)).toBe("CC");
      expectTreeIntegrity(parent);

      items.value = [duplicate, duplicate];
      flushJobs();
      expect(textContent(parent)).toBe("CC");
      expectTreeIntegrity(parent);
    });
  });

  it("reconciles array to scalar to array transitions", () => {
    root(() => {
      const A = () => "A";
      const value = shallowRef<unknown>(["[", createComponent(A, {}), "]"]);
      const parent = createElement("group");

      insert(parent, () => value.value);
      expect(textContent(parent)).toBe("[A]");
      expectTreeIntegrity(parent);

      value.value = "scalar";
      flushJobs();
      expect(textContent(parent)).toBe("scalar");
      expectTreeIntegrity(parent);

      value.value = ["x", "y", "z"];
      flushJobs();
      expect(textContent(parent)).toBe("xyz");
      expectTreeIntegrity(parent);
    });
  });

  it("reconciles scalar to array to scalar transitions", () => {
    root(() => {
      const B = () => "B";
      const value = shallowRef<unknown>("scalar");
      const parent = createElement("group");

      insert(parent, () => value.value);
      expect(textContent(parent)).toBe("scalar");
      expectTreeIntegrity(parent);

      value.value = ["<", createComponent(B, {}), ">"];
      flushJobs();
      expect(textContent(parent)).toBe("<B>");
      expectTreeIntegrity(parent);

      value.value = "done";
      flushJobs();
      expect(textContent(parent)).toBe("done");
      expectTreeIntegrity(parent);
    });
  });

  it("preserves component state when stable component thunks reorder", () => {
    root(() => {
      let renders = 0;
      const update = new Map<string, (value: string) => void>();
      const Stateful = (props: { id: string }) => {
        renders++;
        const label = shallowRef(props.id);
        update.set(props.id, (value) => {
          label.value = value;
        });
        return () => label.value;
      };
      const a = createComponent(Stateful, { id: "a" });
      const b = createComponent(Stateful, { id: "b" });
      const c = createComponent(Stateful, { id: "c" });
      const items = shallowRef<unknown[]>([a, b, c]);
      const parent = createElement("group");

      insert(parent, () => items.value);
      expect(textContent(parent)).toBe("abc");
      expect(renders).toBe(3);
      expectTreeIntegrity(parent);

      update.get("b")!("B");
      flushJobs();
      expect(textContent(parent)).toBe("aBc");

      items.value = [c, a, b];
      flushJobs();
      expect(textContent(parent)).toBe("caB");
      expect(renders).toBe(3);
      expectTreeIntegrity(parent);
    });
  });

  it("updates content state when array items are removed", () => {
    root(() => {
      const ContentSlot = createContentSlot();
      const child = createComponent(() => "x", {});
      const items = shallowRef<Children[]>([child]);
      const parent = createElement("group");

      insert(
        parent,
        createComponent(
          () => [
            () => (ContentSlot.isEmpty ? "empty:" : "full:"),
            createComponent(ContentSlot, { children: () => items.value }),
          ],
          {},
        ),
      );
      expect(textContent(parent)).toBe("full:x");
      expectTreeIntegrity(parent);

      items.value = [];
      flushJobs();
      expect(textContent(parent)).toBe("empty:");
      expectTreeIntegrity(parent);

      items.value = [child];
      flushJobs();
      expect(textContent(parent)).toBe("full:x");
      expectTreeIntegrity(parent);
    });
  });
});

describe("runtime — compiled-shape end-to-end", () => {
  // Mimics the babel-emitted output for:
  //   const Greet = (props) => <group>hello, {props.name}!</group>;
  //   const App   = () => <indent><Greet name={who} /></indent>;
  it("compiled-shape JSX equivalent renders correctly", () => {
    const Greet = (props: { name: unknown }) =>
      createIntrinsic("group", {
        children: ["hello, ", () => props.name as string, "!"],
      });

    root(() => {
      const who = shallowRef("world");
      const App = () =>
        createIntrinsic("indent", {
          children: createComponent(Greet, {
            get name() {
              return who.value;
            },
          }),
        });

      const parent = createElement("group");
      insert(parent, createComponent(App, {}));
      expect(textContent(parent)).toBe("hello, world!");

      who.value = "alice";
      flushJobs();
      expect(textContent(parent)).toBe("hello, alice!");
    });
  });
});
