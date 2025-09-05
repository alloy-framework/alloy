import { ClassDeclaration } from "#components/class/declaration.jsx";
import { Namespace } from "#components/namespace/namespace.jsx";
import { Children, FormatOptions, Indent, Output, Prose } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { CSharpFormatOptions } from "../../contexts/format-options.js";
import { SourceFile } from "./source-file.jsx";

it("defines multiple source files with unique content", () => {
  expect(
    <Output>
      <Namespace name="TestCode">
        <SourceFile path="Test1.cs">
          <ClassDeclaration public name="TestClass1" />
        </SourceFile>
        <SourceFile path="Test2.cs">
          <ClassDeclaration public name="TestClass2" />
        </SourceFile>
      </Namespace>
    </Output>,
  ).toRenderTo({
    "Test1.cs": `
      namespace TestCode;

      public class TestClass1;
    `,
    "Test2.cs": `
      namespace TestCode;

      public class TestClass2;
    `,
  });
});

describe("format options", () => {
  function FileWithFormatOptions(props: {
    options: CSharpFormatOptions;
    children: Children;
  }) {
    return (
      <CSharpFormatOptions value={props.options}>
        <SourceFile path="hi.cs">{props.children}</SourceFile>
      </CSharpFormatOptions>
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

  it("CSharpFormatOptions takes precedence over FormatOptions", () => {
    expect(
      <FormatOptions value={{ tabWidth: 5 }}>
        <CSharpFormatOptions value={{ tabWidth: 3 }}>
          <SourceFile path="hi.cs">
            hello
            <Indent>indented 3 spaces</Indent>
          </SourceFile>
        </CSharpFormatOptions>
      </FormatOptions>,
    ).toRenderTo(`
      hello
         indented 3 spaces
    `);
  });
});
