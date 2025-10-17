import { expect, it } from "vitest";
import "@alloy-js/core/testing";
import { Namespace } from "../../src/components/namespace.jsx";
import { TestNamespace, toSourceText } from "../utils.jsx";

it("Should render valid names correctly", () => {
  expect(
    <TestNamespace> 
      <Namespace name={"sub"}>toast</Namespace>
    </TestNamespace>
  ).toRenderTo(`
    namespace sub { toast } 
  `);
});