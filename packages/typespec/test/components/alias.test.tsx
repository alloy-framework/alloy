import { expect, it } from "vitest";
import { Alias } from "../../src/components/alias.jsx";
import { toSourceText } from "../utils.jsx";

it("Should render valid names correctly", () => {
  const result = toSourceText(<Alias  />);
  expect(result).toBe("");
});