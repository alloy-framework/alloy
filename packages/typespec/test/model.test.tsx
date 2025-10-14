import { expect, it } from "vitest";
import { Model } from "../src/components/model.jsx";
import { toSourceText } from "./utils.jsx";

it("Should render valid names correctly", () => {
  const result = toSourceText(<Model  />);
  expect(result).toBe("");
});