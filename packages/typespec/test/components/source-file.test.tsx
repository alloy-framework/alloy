import { expect, it } from "vitest";
import { SourceFile } from "../../src/components/source-file/source-file.jsx";
import { toSourceText } from "../utils.jsx";

it("Should render valid names correctly", () => {
  const result = toSourceText(<SourceFile  path="test.tsp" />);
  expect(result).toBe("");
});