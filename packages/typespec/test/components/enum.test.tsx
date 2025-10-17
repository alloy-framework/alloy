import { expect, it } from "vitest";
import { Enum } from "../../src/components/enum.jsx";
import { toSourceText } from "../utils.jsx";

it("Should render valid names correctly", () => {
  const result = toSourceText(<Enum  />);
  expect(result).toBe("");
});