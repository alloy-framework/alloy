import { expect, it } from "vitest";
import { Operation } from "../../src/components/operation.jsx";
import { toSourceText } from "../utils.jsx";

it("Should render valid names correctly", () => {
  const result = toSourceText(<Operation  />);
  expect(result).toBe("");
});