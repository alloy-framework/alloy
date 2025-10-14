import { expect, it } from "vitest";
import { Name } from "../src/components/name.jsx";
import { toSourceText } from "./utils.jsx";

it("Should render valid names correctly", () => {
  const result = toSourceText(<Name name="ValidName" />);
  expect(result).toBe("ValidName");
});

it.each([
  "invalid-name",
  "invalid.name",
  "invalid/name",
  "invalid[name",
  "invalid]name",
])("Should render invalid names with backticks (%s)", (invalidName) => {
  const result = toSourceText(<Name name={invalidName} />);
  expect(result).toBe(`\`${invalidName}\``);
});

it.each(["model", "enum", "never", "null", "unknown"])(
  "Should render reserved names with backticks (%s)",
  (reservedName) => {
    const result = toSourceText(<Name name={reservedName} />);
    expect(result).toBe(`\`${reservedName}\``);
  },
);