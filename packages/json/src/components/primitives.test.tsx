import { jsonTest } from "#test/utils.jsx";
import "@alloy-js/core/testing";
import { expect, it } from "vitest";

it.each([
  ["boolean (true)", true, "true"],
  ["boolean (false)", false, "false"],
  ["integer", 10, "10"],
  ["negative integer", -10, "-10"],
  ["float", 1.314, "1.314"],
  ["string", "Hello, world!", `"Hello, world!"`],
  ["null", null, "null"],
])("%s", (_, data, expected) => {
  expect(jsonTest(data)).toRenderTo(expected);
});
