import { reactive, renderTree } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d, printTree } from "@alloy-js/core/testing";
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
  const tree = renderTree(template);

  expect(printTree(tree)).toEqual(`[]`);

  arr.push(1);
  expect(printTree(tree)).toEqual(`[1]`);

  arr.push(2);
  expect(printTree(tree)).toEqual(d`
    [1, 2]
  `);

  arr.push("this is a long item that should be wrapped");
  expect(printTree(tree, { printWidth: 20 })).toEqual(d`
    [
      1,
      2,
      "this is a long item that should be wrapped"
    ]
  `);
});
