import { createNamePolicy, Output, useNamePolicy } from "@alloy-js/core";
import { expect, it } from "vitest";
import "../testing/extend-expect.js";

it("is applied by output", () => {
  const policy = createNamePolicy((name) => {
    return "name" + name;
  });

  function Foo() {
    const namer = useNamePolicy();
    return namer!.getName("hi", "name");
  }
  expect(
    <Output namePolicy={policy}>
      <Foo />
    </Output>,
  ).toRenderTo("namehi");
});
