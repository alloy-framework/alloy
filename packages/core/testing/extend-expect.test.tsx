import { Indent, Output, SourceFile } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import "./extend-expect.js";

describe("toRenderTo", () => {
  it("can validate structure without source files", () => {
    expect(
      <>
        base
        <Indent>indented</Indent>
      </>,
    ).toRenderTo(`
      base
        indented
      `);
  });

  it("can expect the content of the single source file used", () => {
    expect(
      <Output>
        <SourceFile path="Test.cs" tabWidth={4} filetype="csharp">
          base
          <Indent>indented</Indent>
        </SourceFile>
      </Output>,
    ).toRenderTo(`
        base
            indented
        `);
  });

  it("expect with specific file name", () => {
    expect(
      <Output>
        <SourceFile path="Test.cs" tabWidth={4} filetype="csharp">
          base
          <Indent>indented</Indent>
        </SourceFile>
      </Output>,
    ).toRenderTo({
      "Test.cs": `
        base
            indented
        `,
    });
  });

  it("each source file respect their print options", () => {
    expect(
      <Output>
        <SourceFile path="Test.cs" tabWidth={4} filetype="csharp">
          base1
          <Indent>indented</Indent>
        </SourceFile>
        <SourceFile path="Test.ts" tabWidth={2} filetype="csharp">
          base2
          <Indent>indented</Indent>
        </SourceFile>
      </Output>,
    ).toRenderTo({
      "Test.cs": `
        base1
            indented
        `,
      "Test.ts": `
        base2
          indented
        `,
    });
  });

  it("fails when content does not match", () => {
    expect(() =>
      expect(
        <>
          base
          <Indent>indented</Indent>
        </>,
      ).toRenderTo(`
      base
        wrong
    `),
    ).toThrowError(/Render is incorrect/);
  });

  it("fails when files don't match", () => {
    expect(() =>
      expect(
        <Output>
          <SourceFile path="Test.cs" tabWidth={4} filetype="csharp">
            base1
            <Indent>indented</Indent>
          </SourceFile>
          <SourceFile path="Test.ts" tabWidth={2} filetype="typescript">
            base2
            <Indent>indented</Indent>
          </SourceFile>
        </Output>,
      ).toRenderTo({
        "Test.cs": `
        bad
        `,
        "Test.ts": `
        base2
          indented
        `,
      }),
    ).toThrowError(/Render is incorrect/);
  });
});
