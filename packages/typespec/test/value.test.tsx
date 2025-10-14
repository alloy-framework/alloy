import { expect, it } from "vitest";
import { Value } from "../src/components/value.jsx";
import { toSourceText } from "./utils.jsx";

it("Should render valid names correctly", () => {
  const result = toSourceText(<Value  />);
  expect(result).toBe("");
});