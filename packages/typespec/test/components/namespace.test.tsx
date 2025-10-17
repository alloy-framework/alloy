import { expect, it } from "vitest";
import { Namespace } from "../../src/components/namespace.jsx";
import { TestNamespace, toSourceText } from "../utils.jsx";

it("Should render valid names correctly", () => {
  const result = toSourceText(
    <TestNamespace> 
      <Namespace name={"sub"} />
    </TestNamespace>
  );
  expect(result).toBe("namespace sub");
});