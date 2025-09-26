import { Output, refkey, render } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { assertFileContents } from "../../../test/utils.js";
import * as go from "../index.js";

it("works variable", () => {
  expect(
    <Output>
      <go.ModuleDirectory name="github.com/alloy-framework/alloy">
        <go.SourceDirectory path=".">
          <go.SourceFile path="test.go">
            <go.VarDeclaration name="hi">12</go.VarDeclaration>
          </go.SourceFile>
        </go.SourceDirectory>
      </go.ModuleDirectory>
    </Output>,
  ).toRenderTo(`
    package alloy

    var hi = 12
  `);
});

it("works variable group", () => {
  expect(
    <Output>
      <go.ModuleDirectory name="github.com/alloy-framework/alloy">
        <go.SourceDirectory path=".">
          <go.SourceFile path="test.go">
            <go.VarDeclarationGroup>
              <go.VarDeclaration name="hi1">12</go.VarDeclaration>
              <go.VarDeclaration name="hi2" type="string">
                12
              </go.VarDeclaration>
              <go.VarDeclaration name="hi3" type="string"></go.VarDeclaration>
            </go.VarDeclarationGroup>
          </go.SourceFile>
        </go.SourceDirectory>
      </go.ModuleDirectory>
    </Output>,
  ).toRenderTo(`
    package alloy

    var (
      hi1 = 12
      hi2 string = 12
      hi3 string
    )
  `);
});

it("works const group", () => {
  expect(
    <Output>
      <go.ModuleDirectory name="github.com/alloy-framework/alloy">
        <go.SourceDirectory path=".">
          <go.SourceFile path="test.go">
            <go.VarDeclarationGroup const>
              <go.VarDeclaration name="hi1">12</go.VarDeclaration>
              <go.VarDeclaration name="hi2" type="string">
                12
              </go.VarDeclaration>
            </go.VarDeclarationGroup>
          </go.SourceFile>
        </go.SourceDirectory>
      </go.ModuleDirectory>
    </Output>,
  ).toRenderTo(`
    package alloy

    const (
      hi1 = 12
      hi2 string = 12
    )
  `);
});

it("works end-to-end", () => {
  const TestType = refkey("TestType");

  const res = render(
    <Output>
      <go.ModuleDirectory name="github.com/alloy-framework/alloy">
        <go.SourceDirectory path=".">
          <go.SourceFile path="types.go">
            <go.TypeDeclaration name="TestType" refkey={TestType}>
              string
            </go.TypeDeclaration>
          </go.SourceFile>
          <go.SourceFile path="test.go">
            <go.VarDeclaration name="hi" type={TestType}>
              "hello"
            </go.VarDeclaration>
          </go.SourceFile>
        </go.SourceDirectory>
      </go.ModuleDirectory>
    </Output>,
  );

  assertFileContents(res, {
    "types.go": `
      package alloy

      type TestType string
    `,
    "test.go": `
      package alloy

      var hi TestType = "hello"
    `,
  });
});

it("throws end-to-end cross-package with unexported type", () => {
  const TestType = refkey("TestType");

  expect(() =>
    render(
      <Output>
        <go.ModuleDirectory name="github.com/alloy-framework/alloy">
          <go.SourceDirectory path="hello">
            <go.SourceFile path="types.go">
              <go.TypeDeclaration name="testType" refkey={TestType}>
                string
              </go.TypeDeclaration>
            </go.SourceFile>
          </go.SourceDirectory>
          <go.SourceDirectory path="world">
            <go.SourceFile path="test.go">
              <go.VarDeclaration name="hi" type={TestType}>
                "hello"
              </go.VarDeclaration>
            </go.SourceFile>
          </go.SourceDirectory>
        </go.ModuleDirectory>
      </Output>,
    ),
  ).toThrowError(
    "Can't reference non-exported symbol testType from another package.",
  );
});

it("works end-to-end cross-package", () => {
  const TestType = refkey("TestType");

  const res = render(
    <Output>
      <go.ModuleDirectory name="github.com/alloy-framework/alloy">
        <go.SourceDirectory path="hello">
          <go.SourceFile path="types.go">
            <go.TypeDeclaration name="TestType" refkey={TestType}>
              string
            </go.TypeDeclaration>
          </go.SourceFile>
        </go.SourceDirectory>
        <go.SourceDirectory path="world">
          <go.SourceFile path="test.go">
            <go.VarDeclaration name="hi" type={TestType}>
              "hello"
            </go.VarDeclaration>
          </go.SourceFile>
        </go.SourceDirectory>
      </go.ModuleDirectory>
    </Output>,
  );

  assertFileContents(res, {
    "hello/types.go": `
      package hello

      type TestType string
    `,
    "world/test.go": `
      package world

      import "github.com/alloy-framework/alloy/hello"

      var hi hello.TestType = "hello"
    `,
  });
});

it("works with conflict resolution", () => {
  const TestType1 = refkey("TestType1");
  const TestType2 = refkey("TestType2");

  const res = render(
    <Output>
      <go.ModuleDirectory name="github.com/alloy-framework/alloy">
        <go.SourceDirectory path="hello" name="hello">
          <go.SourceFile path="types.go">
            <go.TypeDeclaration name="TestType" refkey={TestType1}>
              string
            </go.TypeDeclaration>
          </go.SourceFile>
        </go.SourceDirectory>
        <go.SourceDirectory path="hello2" name="hello">
          <go.SourceFile path="types.go">
            <go.TypeDeclaration name="TestType" refkey={TestType2}>
              string
            </go.TypeDeclaration>
          </go.SourceFile>
        </go.SourceDirectory>
        <go.SourceDirectory path="world">
          <go.SourceFile path="test.go">
            <go.VarDeclaration name="hi1" type={TestType1}>
              "hello"
            </go.VarDeclaration>
            <hbr />
            <go.VarDeclaration name="hi2" type={TestType2}>
              "hello"
            </go.VarDeclaration>
          </go.SourceFile>
        </go.SourceDirectory>
      </go.ModuleDirectory>
    </Output>,
  );

  assertFileContents(res, {
    "world/test.go": `
      package world

      import (
        "github.com/alloy-framework/alloy/hello"
        hello_2 "github.com/alloy-framework/alloy/hello2"
      )

      var hi1 hello.TestType = "hello"
      var hi2 hello_2.TestType = "hello"
    `,
  });
});
