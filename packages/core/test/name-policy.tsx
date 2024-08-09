import { it, expect, describe } from "vitest";
import "../testing/extend-expect.js";
import { createNamePolicy, useNamePolicy, Output } from "@alloy-js/core";


it("is applied by output", () => {
  const policy = createNamePolicy((name) => {
    return "name" + name;
  })

  function Foo() {
    const namer = useNamePolicy();
    return namer!.getName("hi", "name");
  }
  expect(<Output namePolicy={policy}>
    <Foo />
  </Output>).toRenderTo("namehi");
});