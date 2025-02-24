import {
  computed,
  Output,
  render,
  renderTree,
  SourceFile,
  useContext,
} from "@alloy-js/core";
import { expect, it } from "vitest";
import { SourceDirectoryContext } from "../../src/context/source-directory.js";
import "../../testing/extend-expect.js";

it("tracks its content", () => {
  let context;
  function Test() {
    context = useContext(SourceDirectoryContext);
  }
  const _ = renderTree(
    <Output>
      <Test />
      <SourceFile path="hi.txt" filetype="text">hello!</SourceFile>
    </Output>,
  );
  expect(context!.contents.length).toEqual(1);
});

it("has reactive context", () => {
  function TrackContents() {
    const sdContext = useContext(SourceDirectoryContext)!;
    const allFiles = computed(() => {
      return sdContext.contents.map((v) => v.path).join(" ");
    });

    return <SourceFile path="contents.txt" filetype="text">{allFiles.value}</SourceFile>;
  }

  const tree = render(
    <Output>
      <SourceFile path="hi.txt" filetype="text">hello!</SourceFile>
      <TrackContents />
    </Output>,
  );

  expect(tree.contents[1].contents).toEqual("hi.txt contents.txt");
});
