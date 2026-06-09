import { Output, ref, refkey, renderTree, Show } from "@alloy-js/core";
import { getFilesFromTree } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { flushJobs } from "../../core/src/scheduler.js";
import * as ts from "../src/components/index.js";
import { createPackage, PackageDirectory, SourceFile } from "../src/index.js";

const testLib = () =>
  createPackage({
    name: "testLib",
    version: "1.0.0",
    descriptor: {
      ".": { named: ["foo"] },
    },
  });

function sourceFileText(tree: ReturnType<typeof renderTree>): string {
  flushJobs();
  const files = getFilesFromTree(tree);
  return typeof files === "string" ? files : (files["index.ts"] ?? "");
}

it("removes an import when the reference is removed", () => {
  const lib = testLib();
  const showIt = ref(true);

  const tree = renderTree(
    <Output externals={[lib]}>
      <PackageDirectory path="." name="test" version="1.0.0">
        <SourceFile path="index.ts">
          <Show when={showIt.value}>x = {lib.foo};</Show>
        </SourceFile>
      </PackageDirectory>
    </Output>,
  );

  const initial = sourceFileText(tree);
  showIt.value = false;
  const off = sourceFileText(tree);
  showIt.value = true;
  const back = sourceFileText(tree);

  // With no live reference, the import line should not be in the file.
  expect(off).not.toMatch(/import .* from "testLib"/);
  // After re-showing, we should be back to the initial output.
  expect(back).toEqual(initial);
});

it("does not leak name-conflict aliases across re-renders", () => {
  const lib = testLib();
  const showLocal = ref(true);
  const fooRk = refkey("local-foo");

  const tree = renderTree(
    <Output externals={[lib]}>
      <PackageDirectory path="." name="test" version="1.0.0">
        <SourceFile path="index.ts">
          <Show when={showLocal.value}>
            <ts.VarDeclaration const name="foo" refkey={fooRk}>
              1
            </ts.VarDeclaration>
            ;
          </Show>
          use = {lib.foo};
        </SourceFile>
      </PackageDirectory>
    </Output>,
  );

  sourceFileText(tree);
  showLocal.value = false;
  const off = sourceFileText(tree);
  showLocal.value = true;
  const back = sourceFileText(tree);
  showLocal.value = false;
  const off2 = sourceFileText(tree);
  showLocal.value = true;
  const back2 = sourceFileText(tree);

  // While the local is hidden, the import should be the plain name, not an
  // alias — the conflict is gone.
  expect(off).toMatch(/import \{ foo \} from "testLib"/);
  expect(off2).toMatch(/import \{ foo \} from "testLib"/);
  // Off snapshots after repeated toggles must be identical (no drift).
  expect(off2).toEqual(off);
  // Back-on snapshots after repeated toggles must be identical too — no
  // `foo_3`/`foo_4` drift.
  expect(back2).toEqual(back);
  // No generated name should drift beyond the expected `_2` suffix.
  expect(back).not.toMatch(/foo_3|foo_4/);
  expect(back2).not.toMatch(/foo_3|foo_4/);
});

it("removes only one ref count at a time", () => {
  const lib = testLib();
  const showA = ref(true);
  const showB = ref(true);

  const tree = renderTree(
    <Output externals={[lib]}>
      <PackageDirectory path="." name="test" version="1.0.0">
        <SourceFile path="index.ts">
          <Show when={showA.value}>a = {lib.foo};</Show>
          <Show when={showB.value}>b = {lib.foo};</Show>
        </SourceFile>
      </PackageDirectory>
    </Output>,
  );

  // Hide only one of the two references — the import must still be present.
  showA.value = false;
  const oneHidden = sourceFileText(tree);
  expect(oneHidden).toMatch(/import \{ foo \} from "testLib"/);

  // Hide the second — now the import should go away.
  showB.value = false;
  const bothHidden = sourceFileText(tree);
  expect(bothHidden).not.toMatch(/import .* from "testLib"/);
});
