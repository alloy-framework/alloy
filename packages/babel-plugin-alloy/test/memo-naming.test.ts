import { transformSync } from "@babel/core";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const pluginPath = join(
  import.meta.dirname,
  "../../babel-plugin-jsx-dom-expressions/index.js",
);

function transform(code: string, addSourceInfo: boolean) {
  const result = transformSync(code, {
    plugins: [
      [
        pluginPath,
        {
          moduleName: "r-custom",
          builtIns: ["For", "Show"],
          generate: "universal",
          addSourceInfo,
        },
      ],
    ],
    filename: "test.js",
  });
  return result?.code ?? "";
}

describe("memo naming (addSourceInfo)", () => {
  it("adds name for simple member expression", () => {
    const out = transform("const x = <>{signal.value}</>;", true);
    expect(out).toContain('false, "signal.value"');
  });

  it("adds name for chained member expression", () => {
    const out = transform("const x = <>{a.b.c}</>;", true);
    expect(out).toContain('false, "a.b.c"');
  });

  it("adds name for call expression", () => {
    const out = transform("const x = <>{getData()}</>;", true);
    expect(out).toContain('false, "getData"');
  });

  it("adds name for numeric computed property", () => {
    const out = transform("const x = <>{arr[0]}</>;", true);
    expect(out).toContain('false, "arr[0]"');
  });

  it("adds name for string computed property", () => {
    const out = transform('const x = <>{obj["key"]}</>;', true);
    expect(out).toContain('false, "obj[key]"');
  });

  it("adds name for optional chaining", () => {
    const out = transform("const x = <>{a?.b}</>;", true);
    expect(out).toContain('false, "a.b"');
  });

  it("does not add name when addSourceInfo is false", () => {
    const out = transform("const x = <>{signal.value}</>;", false);
    expect(out).toContain("_$memo");
    expect(out).not.toContain('"signal.value"');
  });
});
