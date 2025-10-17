import { expect, it } from "vitest";
import { Union } from "../../src/components/union.jsx";
import { toSourceText } from "../utils.jsx";

it("Should render valid names correctly", () => {
  const result = toSourceText(<Union  />);
  expect(result).toBe("");
});