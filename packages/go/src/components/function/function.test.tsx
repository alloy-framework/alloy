import { code, Output, refkey, Refkey, render } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { describe, expect, it } from "vitest";
import { TestPackage } from "../../../test/utils.js";
import { ModuleDirectory } from "../ModuleDirectory.js";
import { SourceDirectory } from "../SourceDirectory.js";
import { SourceFile } from "../SourceFile.js";
import { StructDeclaration } from "../struct/declaration.js";
import { TypeDeclaration } from "../type/declaration.js";
import { FuncReceiver, Function } from "./function.js";

const Wrapper = (props: { children: Children; refkey: Refkey }) => (
  <TestPackage>
    <TypeDeclaration refkey={props.refkey} exported name="TestStruct">
      <StructDeclaration />
      <hbr />
    </TypeDeclaration>
    {props.children}
  </TestPackage>
);

it("applies PascalCase naming policy when exported", () => {
  expect(
    <TestPackage>
      <Function exported name="methodOne" />
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    func MethodOne() {}
  `);
});

it("applies camelCase naming policy when not exported", () => {
  expect(
    <TestPackage>
      <Function name="MethodOne" />
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    func methodOne() {}
  `);
});

it("defines single-line params and return type", () => {
  const params = [
    {
      name: "intParam",
      type: "int",
    },
    {
      name: "stringParam",
      type: "string",
    },
  ];
  const res = (
    <TestPackage>
      <Function
        exported
        name="MethodOne"
        parameters={params}
        returns="string"
      />
    </TestPackage>
  );

  expect(res).toRenderTo(`
    package alloy

    func MethodOne(intParam int, stringParam string) string {}
  `);
});

it("defines multi-line params and return type", () => {
  const params = [
    {
      name: "intParam",
      type: "int",
    },
    {
      name: "stringParam",
      type: "string",
    },
    {
      name: "stringParam2",
      type: "string",
    },
    {
      name: "stringParam3",
      type: "string",
    },
  ];
  const res = (
    <TestPackage>
      <Function
        exported
        name="MethodOne"
        parameters={params}
        returns="string"
      />
    </TestPackage>
  );

  expect(res).toRenderTo(`
    package alloy

    func MethodOne(
      intParam int,
      stringParam string,
      stringParam2 string,
      stringParam3 string,
    ) string {}
  `);
});

it("specify doc comment", () => {
  expect(
    <TestPackage>
      <Function
        exported
        name="MethodOne"
        doc={
          <>
            {"This is a test"}
            <hbr />
            {"This is another test"}
          </>
        }
      />
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    // This is a test
    // This is another test
    func MethodOne() {}
  `);
});

it("use single-line form", () => {
  expect(
    <TestPackage>
      <Function exported name="MethodOne" singleLine>
        return nil
      </Function>
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    func MethodOne() { return nil }
  `);
});

it("use children", () => {
  expect(
    <TestPackage>
      <Function exported name="MethodOne">
        return nil
      </Function>
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    func MethodOne() {
      return nil
    }
  `);
});

it("use multiple children", () => {
  expect(
    <TestPackage>
      <Function exported name="MethodOne">
        {code`
        lineOne()
        lineTwo()
        return nil
        `}
      </Function>
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    func MethodOne() {
      lineOne()
      lineTwo()
      return nil
    }
  `);
});

it("use method", () => {
  const ReceiverRefkey = refkey("ReceiverRefkey");

  expect(
    <Wrapper refkey={ReceiverRefkey}>
      <Function
        exported
        name="MethodOne"
        receiver={<FuncReceiver name="s" type={ReceiverRefkey} />}
      />
    </Wrapper>,
  ).toRenderTo(`
    package alloy

    type TestStruct struct{}
    func (s TestStruct) MethodOne() {}
  `);
});

it("use method variadic params", () => {
  const ReceiverRefkey = refkey("ReceiverRefkey");

  expect(
    <Wrapper refkey={ReceiverRefkey}>
      <Function
        exported
        name="MethodOne"
        receiver={<FuncReceiver name="s" type={ReceiverRefkey} />}
        parameters={[
          { name: "i", type: "int" },
          { name: "args", type: "string", variadic: true },
        ]}
      />
    </Wrapper>,
  ).toRenderTo(`
    package alloy

    type TestStruct struct{}
    func (s TestStruct) MethodOne(i int, args ...string) {}
  `);
});

it("use method cross-package fail", () => {
  const ReceiverRefkey = refkey("ReceiverRefkey");

  expect(() =>
    render(
      <Output>
        <ModuleDirectory name="github.com/alloy-framework/alloy">
          <SourceDirectory path="hello">
            <SourceFile path="types.go">
              <TypeDeclaration
                refkey={ReceiverRefkey}
                exported
                name="TestStruct"
              >
                <StructDeclaration />
              </TypeDeclaration>
            </SourceFile>
          </SourceDirectory>
          <SourceDirectory path="world">
            <SourceFile path="test.go">
              <Function
                exported
                name="MethodOne"
                receiver={<FuncReceiver name="s" type={ReceiverRefkey} />}
              />
            </SourceFile>
          </SourceDirectory>
        </ModuleDirectory>
      </Output>,
    ),
  ).toThrowError(
    "Receiver symbol s must be in the same package as the type TestStruct.",
  );
});

describe("type parameters", () => {
  it("function type param", () => {
    const T = refkey("T");
    expect(
      <TestPackage>
        <Function
          exported
          name="MethodOne"
          parameters={[{ name: "arg", type: T }]}
          typeParameters={[{ name: "T", constraint: "any", refkey: T }]}
        />
      </TestPackage>,
    ).toRenderTo(`
    package alloy

    func MethodOne[T any](arg T) {}
  `);
  });

  it("method auto type param", () => {
    const ReceiverRefkey = refkey("ReceiverRefkey");

    expect(
      <TestPackage>
        <TypeDeclaration
          refkey={ReceiverRefkey}
          exported
          name="TestStruct"
          typeParameters={[{ name: "T", constraint: "any" }]}
        >
          <StructDeclaration />
          <hbr />
        </TypeDeclaration>
        <Function
          exported
          name="MethodOne"
          receiver={<FuncReceiver name="s" type={ReceiverRefkey} />}
        />
      </TestPackage>,
    ).toRenderTo(`
    package alloy

    type TestStruct[T any] struct{}
    func (s TestStruct[T any]) MethodOne() {}
  `);
  });

  it("method type param", () => {
    const ReceiverRefkey = refkey("ReceiverRefkey");

    expect(
      <TestPackage>
        <TypeDeclaration
          refkey={ReceiverRefkey}
          exported
          name="TestStruct"
          typeParameters={[{ name: "T", constraint: "any" }]}
        >
          <StructDeclaration />
          <hbr />
        </TypeDeclaration>
        <Function
          exported
          name="MethodOne"
          receiver={
            <FuncReceiver
              name="s"
              type={ReceiverRefkey}
              typeParameters={[{ name: "U", constraint: "any" }]}
            />
          }
        />
      </TestPackage>,
    ).toRenderTo(`
    package alloy

    type TestStruct[T any] struct{}
    func (s TestStruct[U any]) MethodOne() {}
  `);
  });
});
