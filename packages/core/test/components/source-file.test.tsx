import {
  Children,
  CommonFormatOptions,
  computed,
  ContentOutputFile,
  FormatOptions,
  Indent,
  Output,
  Prose,
  render,
  renderTree,
  SourceFile,
  useContext,
} from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { SourceDirectoryContext } from "../../src/context/source-directory.js";
import "../../testing/extend-expect.js";
import { d } from "../../testing/render.js";

it("tracks its content", () => {
  let context;
  function Test() {
    context = useContext(SourceDirectoryContext);
  }
  const _ = renderTree(
    <Output>
      <Test />
      <SourceFile path="hi.txt" filetype="text">
        hello!
      </SourceFile>
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

    return (
      <SourceFile path="contents.txt" filetype="text">
        {allFiles.value}
      </SourceFile>
    );
  }

  expect(
    <Output>
      <SourceFile path="hi.txt" filetype="text">
        hello!
      </SourceFile>
      <TrackContents />
    </Output>,
  ).toRenderTo({
    "hi.txt": "hello!",
    "contents.txt": "hi.txt contents.txt",
  });
});

it("includes header", () => {
  const header = <># This is a header</>;

  expect(
    <Output>
      <SourceFile path="hi.txt" filetype="text" header={header}>
        hello!
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    # This is a header
    hello!
  `);
});

describe("format options", () => {
  function FileWithFormatOptions(props: {
    options: CommonFormatOptions;
    children: Children;
  }) {
    return (
      <FormatOptions value={props.options}>
        <SourceFile path="hi.txt" filetype="text">
          {props.children}
        </SourceFile>
      </FormatOptions>
    );
  }

  it("respect tabWidth", () => {
    expect(
      <FileWithFormatOptions options={{ tabWidth: 5 }}>
        hello
        <Indent>indented 5 spaces</Indent>
      </FileWithFormatOptions>,
    ).toRenderTo(`
      hello
           indented 5 spaces
    `);
  });

  it("respect useTabs", () => {
    expect(
      <FileWithFormatOptions options={{ useTabs: true }}>
        hello
        <Indent>indented with tabs</Indent>
      </FileWithFormatOptions>,
    ).toRenderTo(`
      hello
      \tindented with tabs
    `);
  });

  it("respect printWidth", () => {
    expect(
      <FileWithFormatOptions options={{ printWidth: 10 }}>
        <Prose>this is too long</Prose>
      </FileWithFormatOptions>,
    ).toRenderTo(`
      this is
      too long
    `);
  });

  it("source file overrides take precedence", () => {
    expect(
      <FormatOptions value={{ tabWidth: 5 }}>
        <SourceFile path="hi.txt" filetype="text" tabWidth={3}>
          hello
          <Indent>indented 3 spaces</Indent>
        </SourceFile>
      </FormatOptions>,
    ).toRenderTo(`
      hello
         indented 3 spaces
    `);
  });

  describe("trailing line", () => {
    function testRender(comp: any) {
      const tree = render(<Output>{comp}</Output>);
      return (tree.contents[0] as ContentOutputFile).contents;
    }

    it("add trailing new line by default", () => {
      expect(
        testRender(
          <SourceFile filetype="text" path="abc.txt">
            end with new line
          </SourceFile>,
        ),
      ).toEqual(d`
        end with new line
        
      `);
    });
    it("add trailing new line by default", () => {
      expect(
        testRender(
          <SourceFile filetype="text" path="abc.txt" insertFinalNewLine={false}>
            end with no line
          </SourceFile>,
        ),
      ).toEqual(d`
        end with no line
      `);
    });
  });
});
