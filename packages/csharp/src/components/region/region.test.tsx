import { Children } from "@alloy-js/core/jsx-runtime";
import { expect, it } from "vitest";
import { TestNamespace } from "../../../test/utils.jsx";
import { Region } from "./region.jsx";

const Wrapper = (props: { name: string; children: Children }) => (
  <TestNamespace>
    <Region name={props.name}>{props.children}</Region>
  </TestNamespace>
);

it("region test", () => {
  expect(<Wrapper name="Test Region">// This is inside region</Wrapper>)
    .toRenderTo(`
      #region Test Region
      // This is inside region
      #endregion
    `);
});
