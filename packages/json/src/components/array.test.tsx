import { reactive, renderTree } from "@alloy-js/core";
import { expect, it } from "vitest";
import { jsonTest } from "../../test/utils.jsx";

it("renders empty arrays", () => {
  const template = jsonTest([]);

  expect(template).toRenderTo(`[]`);
});

it("renders arrays", () => {
  const template = jsonTest([1, "hello"]);

  expect(template).toRenderTo(`
    [1, "hello"]
  `);
});

it("renders nested arrays", () => {
  const template = jsonTest([1, ["hello there this is a long thing"]]);

  expect(template).toRenderTo(
    `
    [
      1,
      [
        "hello there this is a long thing"
      ]
    ]
  `,
    { printWidth: 20 },
  );
});

it("works reactively", () => {
  const arr = reactive([] as (number | string)[]);

  const template = jsonTest(arr);

  expect(template).toRenderTo(`[]`);

  const tree = renderTree(template);

  arr.push(1);
  expect(tree).toRenderTo(`[1]`);

  arr.push(2);
  expect(tree).toRenderTo(`
    [1, 2]
  `);

  arr.push("this is a long item that should be wrapped");
  expect(tree).toRenderTo(
    `
    [
      1,
      2,
      "this is a long item that should be wrapped"
    ]
  `,
    { printWidth: 20 },
  );
});
