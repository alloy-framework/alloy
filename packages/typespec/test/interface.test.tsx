import { expect, it } from "vitest";
import { Interface } from "../src/components/interface.jsx";
import { toSourceText } from "./utils.jsx";

it("Should render valid names correctly", () => {
  const result = toSourceText(<Interface  />);
  expect(result).toBe("");
});