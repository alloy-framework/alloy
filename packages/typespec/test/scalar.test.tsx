import { expect, it } from "vitest";
import { Scalar } from "../src/components/scalar.jsx";
import { toSourceText } from "./utils.jsx";

it("Should render valid names correctly", () => {
  const result = toSourceText(<Scalar  />);
  expect(result).toBe("");
});