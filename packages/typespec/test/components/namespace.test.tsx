import { expect, it } from "vitest";
import { Namespace } from "../../src/components/namespace.jsx";
import { toSourceText } from "../utils.jsx";

it("Should render valid names correctly", () => {
  const result = toSourceText(<Namespace name={"test.namespace"}  />);
  expect(result).toBe("namespace test.namespace");
});