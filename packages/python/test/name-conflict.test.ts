import { createOutputBinder } from "@alloy-js/core";
import { expect, it } from "vitest";
import { pythonNameConflictResolver } from "../src/name-conflict-resolver.js";
import { createPythonSymbol } from "../src/symbol-creation.js";
import { PythonModuleScope } from "../src/symbols/index.js";

it("reverts Python's non-`_N` rename scheme when the conflict is removed", () => {
  // Python renames via `foo_2_modulename` — the old regex-based revert would
  // never match this pattern. The deconflictedName slot is pattern-agnostic,
  // so invoking the resolver with the survivor alone clears the rename
  // regardless of scheme.
  const binder = createOutputBinder();
  const scope = new PythonModuleScope("root", undefined, { binder });

  const a = createPythonSymbol("foo", scope.symbols);
  const b = createPythonSymbol("foo", scope.symbols);

  // Simulate a conflict pass.
  pythonNameConflictResolver("foo", [a, b]);
  expect(a.name).toBe("foo");
  expect(b.name).not.toBe("foo");
  expect(b.deconflictedName).toBeDefined();

  // Simulate the post-delete deconflict pass — the sole survivor must have
  // its prior rename cleared, even though its "rename scheme" differs from
  // the default `_N` shape.
  b.deconflictedName = "foo_2_module"; // pretend b had been renamed using python scheme
  pythonNameConflictResolver("foo", [a]);
  expect(a.name).toBe("foo");
  expect(a.deconflictedName).toBeUndefined();

  // And if a was the one carrying the prior rename:
  a.deconflictedName = "foo_3_other";
  pythonNameConflictResolver("foo", [a]);
  expect(a.name).toBe("foo");
  expect(a.deconflictedName).toBeUndefined();
});
