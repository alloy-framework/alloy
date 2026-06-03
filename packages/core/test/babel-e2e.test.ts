/**
 * End-to-end test: compile real JSX through the Alloy babel preset with
 * then execute the compiled output against the new runtime.
 *
 * Validates that:
 *  - The preset routes runtime imports to `@alloy-js/core/jsx-runtime`.
 *  - The compiled output (using `_$createIntrinsic` / `_$createComponent`
 *    / `_$memo` / `_$mergeProps`) executes correctly under the new
 *    runtime semantics (component thunks invoked via `runInContext`,
 *    intrinsics returning AlloyNodes eagerly).
 */

// @ts-expect-error — @babel/core has no bundled types in this workspace
import { transformSync } from "@babel/core";
// @ts-expect-error — preset has no types
import alloyPreset from "@alloy-js/babel-preset";
// @ts-expect-error — preset-typescript has no types
import typescriptPreset from "@babel/preset-typescript";
import { describe, expect, it } from "vitest";
import { type AlloyNode } from "../src/render/index.js";
import { createElement } from "../src/render/node.js";
import { insert } from "../src/runtime/index.js";
import { flushJobs } from "../src/scheduler.js";
import { textContent } from "./tree-test-utils.js";

function compile(src: string): string {
  const result = transformSync(src, {
    filename: "test.tsx",
    presets: [typescriptPreset, [alloyPreset]],
  });
  if (!result?.code) throw new Error("compile failed");
  return result.code;
}

/**
 * Build a function that evaluates the compiled module body with our
 * jsx-runtime exports injected, and returns the named export.
 */
async function evalCompiled(src: string, exportName: string): Promise<unknown> {
  const code = compile(src);
  // Replace the auto-imports with a destructure from a passed-in runtime.
  const runtimeStub = `const __rt = arguments[0]; const __core = arguments[1];`;
  // Strip all `import { ... } from "@alloy-js/core/jsx-runtime";` lines
  // and replace them with destructuring from __rt.
  const importRegex =
    /import\s*\{\s*([^}]+)\s*\}\s*from\s*"@alloy-js\/core\/jsx-runtime";?/g;
  const destructures: string[] = [];
  let body = code.replace(importRegex, (_match, names: string) => {
    // Convert `foo as _$foo` (import alias) → `foo: _$foo` (destructure alias).
    const destructureNames = names.replace(/(\w+)\s+as\s+(\w+)/g, "$1: $2");
    destructures.push(`const {${destructureNames}} = __rt;`);
    return "";
  });
  // Bare @alloy-js/core imports (Show, Switch, Match, For, …) come from
  // the second runtime argument.
  const coreImportRegex =
    /import\s*\{\s*([^}]+)\s*\}\s*from\s*"@alloy-js\/core";?/g;
  body = body.replace(coreImportRegex, (_match, names: string) => {
    const destructureNames = names.replace(/(\w+)\s+as\s+(\w+)/g, "$1: $2");
    // Built-ins live in the runtime module; everything
    // else comes from core. Split the names by what the runtime
    // re-exports.
    destructures.push(`const {${destructureNames}} = { ...__core, ...__rt };`);
    return "";
  });
  // The compiled module uses ESM `export { App }`. Convert to a return.
  body = body.replace(
    /export\s*\{\s*([^}]+)\s*\}\s*;?/g,
    (_, names: string) => {
      const list = names.split(",").map((s) => s.trim());
      return `return { ${list.join(",")} };`;
    },
  );
  // import.meta.url isn't available; stub it.
  body = body.replace(/import\.meta\.url/g, '"test://test.tsx"');

  const wrapped = `${runtimeStub}\n${destructures.join("\n")}\n${body}`;
  const fn = new Function(wrapped);
  const runtime = await import("../src/runtime/index.js");
  const core = await import("../src/index.js");
  return fn(runtime, core)[exportName];
}

function renderToString(thunk: unknown): string {
  const parent = createElement("group");
  insert(parent, thunk);
  flushJobs();
  return textContent(parent);
}

function printNode(node: AlloyNode): string {
  flushJobs();
  return textContent(node);
}

describe("babel preset — end-to-end", () => {
  it("compiles intrinsics and produces AlloyNode output", async () => {
    const src = `
      const App = () => <group>hello, world</group>;
      export { App };
    `;
    const App = (await evalCompiled(src, "App")) as () => unknown;
    // App is a plain function (no createComponent wrapper at the top).
    const node = App() as AlloyNode;
    expect(printNode(node)).toBe("hello, world");
  });

  it("compiles component invocations and threads props correctly", async () => {
    const src = `
      const Greet = (props) => <group>hello, {props.name}!</group>;
      const App = () => <indent><Greet name="world" /></indent>;
      export { App };
    `;
    const App = (await evalCompiled(src, "App")) as () => unknown;
    const node = App() as AlloyNode;
    expect(printNode(node)).toBe("hello, world!");
  });

  it("compiles fragments and arrays of children", async () => {
    const src = `
      const App = () => <><group>a</group>{"-"}<group>b</group></>;
      export { App };
    `;
    const App = (await evalCompiled(src, "App")) as () => unknown;
    // Top-level fragment: App() returns an array (Children) per plugin
    // output. Insert into a parent and print.
    expect(renderToString(App())).toBe("a-b");
  });

  it("compiles nested components composing through intrinsics", async () => {
    const src = `
      const Inner = (props) => <group>[{props.value}]</group>;
      const Mid = (props) => <indent><Inner value={props.value} /></indent>;
      const App = () => <group><Mid value="x" /></group>;
      export { App };
    `;
    const App = (await evalCompiled(src, "App")) as () => unknown;
    expect(printNode(App() as AlloyNode)).toBe("[x]");
  });

  it("Show built-in works with alloy preset", async () => {
    const src = `
      import { Show } from "@alloy-js/core";
      const App = (props) => <group><Show when={props.cond} fallback="no">yes</Show></group>;
      export { App };
    `;
    const App = (await evalCompiled(src, "App")) as (props: any) => unknown;
    expect(printNode(App({ cond: true }) as AlloyNode)).toBe("yes");
    expect(printNode(App({ cond: false }) as AlloyNode)).toBe("no");
  });

  it("Switch/Match built-ins work with alloy preset", async () => {
    const src = `
      import { Switch, Match } from "@alloy-js/core";
      const App = (props) => (
        <group>
          <Switch>
            <Match when={props.kind === "a"}>A!</Match>
            <Match when={props.kind === "b"}>B!</Match>
            <Match else>other</Match>
          </Switch>
        </group>
      );
      export { App };
    `;
    const App = (await evalCompiled(src, "App")) as (props: any) => unknown;
    expect(printNode(App({ kind: "a" }) as AlloyNode)).toBe("A!");
    expect(printNode(App({ kind: "b" }) as AlloyNode)).toBe("B!");
    expect(printNode(App({ kind: "c" }) as AlloyNode)).toBe("other");
  });

  it("For built-in works with alloy preset", async () => {
    const src = `
      import { For } from "@alloy-js/core";
      const App = (props) => (
        <group>
          <For each={props.items}>{(item) => <group>[{item}]</group>}</For>
        </group>
      );
      export { App };
    `;
    const App = (await evalCompiled(src, "App")) as (props: any) => unknown;
    expect(printNode(App({ items: ["a", "b", "c"] }) as AlloyNode)).toBe(
      "[a][b][c]",
    );
  });

  it("For with joiner with alloy preset", async () => {
    const src = `
      import { For } from "@alloy-js/core";
      const App = (props) => (
        <group>
          <For each={props.items} joiner=",">{(item) => <group>{item}</group>}</For>
        </group>
      );
      export { App };
    `;
    const App = (await evalCompiled(src, "App")) as (props: any) => unknown;
    expect(printNode(App({ items: ["x", "y", "z"] }) as AlloyNode)).toBe(
      "x,y,z",
    );
    expect(printNode(App({ items: [] }) as AlloyNode)).toBe("");
  });

  it("Context.Provider value flows to descendants with alloy preset", async () => {
    const src = `
      import { createContext, useContext } from "@alloy-js/core";
      const Ctx = createContext();
      const Reader = () => {
        const v = useContext(Ctx);
        return <group>v={v}</group>;
      };
      const App = () => (
        <Ctx.Provider value="hello">
          <group><Reader /></group>
        </Ctx.Provider>
      );
      export { App };
    `;
    const App = (await evalCompiled(src, "App")) as () => unknown;
    // Top-level Component yields a thunk; route through insert into a parent.
    expect(renderToString(App())).toBe("v=hello");
  });
});
