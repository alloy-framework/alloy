/**
 * End-to-end test of the entry point: compile JSX through the babel
 * preset (alloy preset), evaluate against the runtime, and run through
 * `renderAsync` to produce an `OutputDirectory`.
 *
 * Validates:
 *  - Output → SourceDirectory → SourceFile composition.
 *  - File contents are produced via Alloy's direct printer.
 *  - Nested directories accumulate paths correctly.
 *  - `For` works under the runtime emitting multiple files.
 */

// @ts-expect-error — @babel/core has no bundled types in this workspace
import { transformSync } from "@babel/core";
// @ts-expect-error — preset has no types
import alloyPreset from "@alloy-js/babel-preset";
// @ts-expect-error — preset-typescript has no types
import typescriptPreset from "@babel/preset-typescript";
import { beforeAll, describe, expect, it } from "vitest";
import type {
  ContentOutputFile,
  OutputDirectory,
} from "../src/output-types.js";

// Prime the runtime + core module imports once. Without this, the first
// test in the suite pays the full module-init cost of `@alloy-js/core`
// inside its 5s timeout window, which is flaky on slower machines.
let runtimeMod: any;
let coreMod: any;
beforeAll(async () => {
  runtimeMod = await import("../src/runtime/index.js");
  coreMod = await import("../src/index.js");
});

function compile(src: string): string {
  const result = transformSync(src, {
    filename: "test.tsx",
    presets: [typescriptPreset, [alloyPreset]],
  });
  if (!result?.code) throw new Error("compile failed");
  return result.code;
}

async function evalCompiled(src: string, exportName: string): Promise<unknown> {
  const code = compile(src);
  const runtimeStub = `const __rt = arguments[0]; const __core = arguments[1];`;
  const importRegex =
    /import\s*\{\s*([^}]+)\s*\}\s*from\s*"@alloy-js\/core\/jsx-runtime";?/g;
  const destructures: string[] = [];
  let body = code.replace(importRegex, (_match, names: string) => {
    const dn = names.replace(/(\w+)\s+as\s+(\w+)/g, "$1: $2");
    destructures.push(`const {${dn}} = __rt;`);
    return "";
  });
  const coreImportRegex =
    /import\s*\{\s*([^}]+)\s*\}\s*from\s*"@alloy-js\/core";?/g;
  body = body.replace(coreImportRegex, (_match, names: string) => {
    const dn = names.replace(/(\w+)\s+as\s+(\w+)/g, "$1: $2");
    destructures.push(`const {${dn}} = { ...__core, ...__rt };`);
    return "";
  });
  body = body.replace(
    /export\s*\{\s*([^}]+)\s*\}\s*;?/g,
    (_, names: string) => {
      const list = names.split(",").map((s) => s.trim());
      return `return { ${list.join(",")} };`;
    },
  );
  body = body.replace(/import\.meta\.url/g, '"test://test.tsx"');
  const wrapped = `${runtimeStub}\n${destructures.join("\n")}\n${body}`;
  const fn = new Function(wrapped);
  return fn(runtimeMod, coreMod)[exportName];
}

function findFile(
  dir: OutputDirectory,
  path: string,
): ContentOutputFile | undefined {
  for (const c of dir.contents) {
    if (c.kind === "file" && "contents" in c && c.path === path) return c;
    if (c.kind === "directory") {
      const found = findFile(c, path);
      if (found) return found;
    }
  }
  return undefined;
}

describe("renderAsync — end-to-end output structure", () => {
  it("produces a single SourceFile under Output > SourceDirectory", async () => {
    const src = `
      import { Output, SourceDirectory, SourceFile } from "@alloy-js/core";
      const App = () => (
        <Output>
          <SourceDirectory path="src">
            <SourceFile path="hello.txt" filetype="text/plain">
              <group>hello, world</group>
            </SourceFile>
          </SourceDirectory>
        </Output>
      );
      export { App };
    `;
    const App = (await evalCompiled(src, "App")) as () => unknown;
    const { renderAsync } = runtimeMod;
    // App() returns a ComponentCreator (top-level <Output>); pass the
    // thunk directly as Children — renderAsync's insert handles it.
    const out = await renderAsync(App() as any);
    const f = findFile(out, "src/hello.txt");
    expect(f).toBeDefined();
    expect(f!.contents).toBe("hello, world\n");
    expect(f!.filetype).toBe("text/plain");
  });

  it("nested SourceDirectory paths accumulate", async () => {
    const src = `
      import { Output, SourceDirectory, SourceFile } from "@alloy-js/core";
      const App = () => (
        <Output>
          <SourceDirectory path="src">
            <SourceDirectory path="lib">
              <SourceFile path="x.txt" filetype="text/plain">x</SourceFile>
            </SourceDirectory>
          </SourceDirectory>
        </Output>
      );
      export { App };
    `;
    const App = (await evalCompiled(src, "App")) as () => unknown;
    const { renderAsync } = runtimeMod;
    const out = await renderAsync(App() as any);
    expect(findFile(out, "src/lib/x.txt")?.contents).toBe("x\n");
  });

  it("For emits multiple files", async () => {
    const src = `
      import { For, Output, SourceDirectory, SourceFile } from "@alloy-js/core";
      const App = (props) => (
        <Output>
          <SourceDirectory path="src">
            <For each={props.specs}>
              {(spec) => (
                <SourceFile path={spec.path} filetype="text/plain">
                  <group>{spec.body}</group>
                </SourceFile>
              )}
            </For>
          </SourceDirectory>
        </Output>
      );
      export { App };
    `;
    const App = (await evalCompiled(src, "App")) as (props: any) => unknown;
    const { renderAsync } = runtimeMod;
    const specs = [
      { path: "a.txt", body: "alpha" },
      { path: "b.txt", body: "beta" },
      { path: "c.txt", body: "gamma" },
    ];
    const out = await renderAsync(App({ specs }) as any);
    expect(findFile(out, "src/a.txt")?.contents).toBe("alpha\n");
    expect(findFile(out, "src/b.txt")?.contents).toBe("beta\n");
    expect(findFile(out, "src/c.txt")?.contents).toBe("gamma\n");
  });

  it("direct printer formatting — group breaks at printWidth", async () => {
    const src = `
      import { Output, SourceDirectory, SourceFile } from "@alloy-js/core";
      const App = () => (
        <Output>
          <SourceDirectory path=".">
            <SourceFile path="t.txt" filetype="text/plain">
              <group>
                {"["}
                <indent>
                  <line />
                  {"aaaaaaaaaaaaaaaaaaaa,"}
                  <line />
                  {"bbbbbbbbbbbbbbbbbbbb"}
                </indent>
                <line />
                {"]"}
              </group>
            </SourceFile>
          </SourceDirectory>
        </Output>
      );
      export { App };
    `;
    const App = (await evalCompiled(src, "App")) as () => unknown;
    const { renderAsync } = runtimeMod;
    const out = await renderAsync(App() as any, { printWidth: 30 });
    const f = findFile(out, "t.txt");
    expect(f!.contents).toBe(
      "[\n  aaaaaaaaaaaaaaaaaaaa,\n  bbbbbbbbbbbbbbbbbbbb\n]\n",
    );
  });
});
