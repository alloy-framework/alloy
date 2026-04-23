import { Output, printTree, ref, renderTree, Show } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as ts from "../src/components/index.js";
import {
  createPackage,
  PackageDirectory,
  refkey,
  SourceFile,
} from "../src/index.js";

const testLib = () =>
  createPackage({
    name: "testLib",
    version: "1.0.0",
    descriptor: {
      ".": { named: ["foo"] },
    },
  });

function sourceFileText(printed: string): string {
  // Strip the surrounding package.json / tsconfig.json blobs and keep the
  // text from index.ts onwards. The file content follows the last tsconfig
  // closing brace.
  const marker = "\n}";
  const idx = printed.lastIndexOf(marker);
  return idx === -1 ? printed : printed.slice(idx + marker.length);
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

  const initial = sourceFileText(printTree(tree));
  showIt.value = false;
  const off = sourceFileText(printTree(tree));
  showIt.value = true;
  const back = sourceFileText(printTree(tree));

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

  const initial = sourceFileText(printTree(tree));
  showLocal.value = false;
  const off = sourceFileText(printTree(tree));
  showLocal.value = true;
  const back = sourceFileText(printTree(tree));

  // While the local is hidden, there's no conflict — the import should be
  // the plain name, not an alias.
  expect(off).toMatch(/import \{ foo \} from "testLib"/);
  // Re-showing the local should produce exactly the initial output, not
  // drift the name to foo_3.
  expect(back).toEqual(initial);
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
  const oneHidden = sourceFileText(printTree(tree));
  expect(oneHidden).toMatch(/import \{ foo \} from "testLib"/);

  // Hide the second — now the import should go away.
  showB.value = false;
  const bothHidden = sourceFileText(printTree(tree));
  expect(bothHidden).not.toMatch(/import .* from "testLib"/);
});
