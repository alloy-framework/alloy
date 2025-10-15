import { expect, it } from "vitest";
import { ModelProperty } from "../src/components/model-property.jsx";
import { toSourceText } from "./utils.jsx";

it("Should render valid names correctly", () => {
  const result = toSourceText(<ModelProperty  />);
  expect(result).toBe("");
});