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

// it("works local variable", () => {
//   expect(
//     <Output>
//       <go.SourceFile path="test.js">
//         <go.VarDeclaration name="hi" initializer="12" />
//       </go.SourceFile>
//     </Output>,
//   ).toRenderTo(`
//     package main
//
//     hi := 12
//   `);
// });

it("works end-to-end", () => {
  const TestType = refkey("TestType");

  const res = render(
    <Output>
      <go.ModuleDirectory name="github.com/alloy-framework/alloy">
        <go.SourceDirectory path=".">
          <go.SourceFile path="types.go">
            <go.TypeDeclaration name="testType" exported refkey={TestType}>
              string
            </go.TypeDeclaration>
          </go.SourceFile>
          <go.SourceFile path="test.go">
            <go.VarDeclaration name="Hi" type={TestType}>
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
              <go.TypeDeclaration name="TestType" refkey={TestType}>
                string
              </go.TypeDeclaration>
            </go.SourceFile>
          </go.SourceDirectory>
          <go.SourceDirectory path="world">
            <go.SourceFile path="test.go">
              <go.VarDeclaration name="Hi" type={TestType}>
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
            <go.TypeDeclaration name="TestType" exported refkey={TestType}>
              string
            </go.TypeDeclaration>
          </go.SourceFile>
        </go.SourceDirectory>
        <go.SourceDirectory path="world">
          <go.SourceFile path="test.go">
            <go.VarDeclaration name="Hi" type={TestType}>
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
            <go.TypeDeclaration name="TestType" exported refkey={TestType1}>
              string
            </go.TypeDeclaration>
          </go.SourceFile>
        </go.SourceDirectory>
        <go.SourceDirectory path="hello2" name="hello">
          <go.SourceFile path="types.go">
            <go.TypeDeclaration name="TestType" exported refkey={TestType2}>
              string
            </go.TypeDeclaration>
          </go.SourceFile>
        </go.SourceDirectory>
        <go.SourceDirectory path="world">
          <go.SourceFile path="test.go">
            <go.VarDeclaration name="Hi1" type={TestType1}>
              "hello"
            </go.VarDeclaration>
            <hbr />
            <go.VarDeclaration name="Hi2" type={TestType2}>
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

// it("instantiates symbols from its type", () => {
//   const ifaceRk = refkey();
//   const ifaceMemberRk = refkey();
//   const classRk = refkey();
//   const classMemberRk = refkey();
//   const v1Rk = refkey();
//   const v2Rk = refkey();
//
//   const res = render(
//     <Output>
//       <go.SourceFile path="inst.go">
//         <StatementList>
//           <go.VarDeclaration export name="one" refkey={v1Rk} type={classRk}>
//             "test"
//           </go.VarDeclaration>
//           <>{memberRefkey(v1Rk, classMemberRk)}</>
//           <go.VarDeclaration export name="two" refkey={v2Rk} type={ifaceRk}>
//             "test"
//           </go.VarDeclaration>
//           <>{memberRefkey(v2Rk, ifaceMemberRk)}</>
//         </StatementList>
//       </go.SourceFile>
//       <go.SourceFile path="decl.go">
//         <go.InterfaceDeclaration name="Foo" refkey={ifaceRk}>
//           <StatementList>
//             <go.InterfaceMember name="instanceProp" refkey={ifaceMemberRk}>
//               42
//             </go.InterfaceMember>
//           </StatementList>
//         </go.InterfaceDeclaration>
//         <go.ClassDeclaration name="Bar" refkey={classRk}>
//           <StatementList>
//             <go.ClassField name="instanceProp" refkey={classMemberRk}>
//               42
//             </go.ClassField>
//           </StatementList>
//         </go.ClassDeclaration>
//       </go.SourceFile>
//     </Output>,
//   );
//
//   assertFileContents(res, {
//     "inst.go": `
//       import type { Bar, Foo } from "./decl.js";
//
//       export const one: Bar = "test";
//       one.instanceProp;
//       export const two: Foo = "test";
//       two.instanceProp;
//     `,
//   });
// });
//
// it("instantiates symbols from type even when an expression is passed", () => {
//   const classRk = refkey();
//   const classMemberRk = refkey();
//   const v1Rk = refkey();
//
//   const res = render(
//     <Output>
//       <go.SourceFile path="inst.go">
//         <StatementList>
//           <go.VarDeclaration export name="one" refkey={v1Rk} type={classRk}>
//             <go.ObjectExpression>
//               <go.ObjectProperty name="noProp" refkey={refkey()} value="1" />
//             </go.ObjectExpression>
//           </go.VarDeclaration>
//           <>{memberRefkey(v1Rk, classMemberRk)}</>
//         </StatementList>
//       </go.SourceFile>
//       <go.SourceFile path="decl.go">
//         <go.ClassDeclaration name="Bar" refkey={classRk}>
//           <StatementList>
//             <go.ClassField name="instanceProp" refkey={classMemberRk}>
//               42
//             </go.ClassField>
//           </StatementList>
//         </go.ClassDeclaration>
//       </go.SourceFile>
//     </Output>,
//   );
//
//   assertFileContents(res, {
//     "inst.go": `
//       import type { Bar } from "./decl.js";
//
//       export const one: Bar = {
//         noProp: 1
//       };
//       one.instanceProp;
//     `,
//   });
// });
