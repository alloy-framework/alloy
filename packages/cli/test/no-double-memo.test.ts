import { describe, expect, it } from "vitest";
import * as babel from "@babel/core";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const plugin = require("@alloy-js/babel-plugin-jsx-dom-expressions");

function transform(code: string): string {
  const result = babel.transformSync(code, {
    plugins: [
      [
        plugin,
        {
          generate: "universal",
          moduleName: "r-custom",
          wrapConditionals: true,
          memoWrapper: "memo",
          builtIns: ["Comp"],
          staticMarker: "@once",
        },
      ],
    ],
    parserOpts: { plugins: ["jsx"] },
  });
  return result!.code!;
}

/** Strip the import line so we only count memo calls in the transform output. */
function bodyOf(output: string): string {
  return output.split("\n").slice(1).join("\n");
}

describe("babel transform: inline condition memo (boolean gate)", () => {
  // Fragment children: outer memo wraps the expression; inner memo gates the
  // boolean condition so truthy→truthy signal changes don't recreate components.
  it("logical && in fragment children: outer memo + inner condition memo", () => {
    const body = bodyOf(transform("const t = <>{state.dynamic && good()}</>"));
    // outer memo wraps the whole expression, inner memo gates the condition
    expect(body).toContain("_$memo(() => !!state.dynamic)()");
    // The memo name string also contains _$memo, so count the actual call pattern
    expect(body).toMatch(/\[_\$memo\(\(\) => _\$memo\(\(\) => !!/);
  });

  it("ternary in fragment children: outer memo + inner condition memo", () => {
    const body = bodyOf(
      transform("const t = <>{state.dynamic ? good() : bad}</>"),
    );
    expect(body).toContain("_$memo(() => !!state.dynamic)()");
    expect(body).toMatch(/\[_\$memo\(\(\) => _\$memo\(\(\) => !!/);
  });

  it("nested ternary in fragment: outer memo + inner memos for each condition", () => {
    const body = bodyOf(
      transform('const t = <>{state.a ? a() : state.b ? b() : "c"}</>'),
    );
    expect(body).toContain("_$memo(() => !!state.a)()");
    expect(body).toContain("_$memo(() => !!state.b)()");
  });

  // Component children use a getter — no outer memo. The inner condition memo
  // is still present to gate the boolean.
  it("component children conditional: getter + inner condition memo", () => {
    const body = bodyOf(
      transform("const t = <Comp>{state.dynamic && good()}</Comp>"),
    );
    expect(body).toContain("get children()");
    expect(body).toContain("_$memo(() => !!state.dynamic)()");
  });

  it("component prop conditional: getter + inner condition memo", () => {
    const body = bodyOf(
      transform(
        "const t = <Comp render={state.dynamic ? good() : bad} />",
      ),
    );
    expect(body).toContain("get render()");
    expect(body).toContain("_$memo(() => !!state.dynamic)()");
  });

  // Intrinsic element children use a getter too (universal mode).
  it("intrinsic element children: getter + inner condition memo", () => {
    const body = bodyOf(
      transform("const t = <div>{state.dynamic && good()}</div>"),
    );
    expect(body).toContain("get children()");
    expect(body).toContain("_$memo(() => !!state.dynamic)()");
  });
});

