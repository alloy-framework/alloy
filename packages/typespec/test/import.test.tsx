import { expect, it } from "vitest";
import { Import } from "../src/components/import.jsx";
import { toSourceText } from "./utils.jsx";

it("Should render valid names correctly", () => {
  const result = toSourceText(<Import  />);
  expect(result).toBe("");
});