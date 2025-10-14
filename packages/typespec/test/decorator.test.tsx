import { expect, it } from "vitest";
import { Decorator } from "../src/components/decorator.jsx";
import { toSourceText } from "./utils.jsx";

it("Should render valid names correctly", () => {
  const result = toSourceText(<Decorator  />);
  expect(result).toBe("");
});