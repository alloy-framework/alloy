import { expect, it } from "vitest"; import { ValueExpression } from "../src/index.js";
import { TestFile } from "./utils.js";

it.each([
  [undefined, "undefined"],
  [null, "null"],
  [true, "true"],
  [false, "false"],
  [42, "42"],
  [42n, "42n"],
  ["abc", `"abc"`],
  ["a\nb\rc\\", `"a\\nb\\rc\\\\"`],
  [
    [1, 2, 3],
    `
      [1, 2, 3]
    `,
  ],
  [
    { a: 1, b: 2, c: 3 },
    `
      {
        a: 1,
        b: 2,
        c: 3,
      }
    `,
  ],
  [
    { "mangled-name": 1, "@pagination": 2 },
    `
      {
        "mangled-name": 1,
        "@pagination": 2,
      }
    `,
  ],
])("works - %o => %s", (jsValue, expectedSource) => {
  expect((
    <TestFile>
        <ValueExpression jsValue={jsValue} />
    </TestFile>
  )).toRenderTo(
    expectedSource,
  );
});
