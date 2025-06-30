import { Props, refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as py from "../src/components/index.js";
import { toSourceText } from "./utils.js";

describe("Function Declaration", () => {
  // it("renders a function with no body as 'pass'", () => {
  //   const result = toSourceText(
  //     <py.FunctionDeclaration name="foo" instanceFunction={true} />,
  //   );
  //   expect(result).toRenderTo(d`
  //     def foo(self):
  //       pass


  //   `);
  // });

  // it("renders a function with no body as 'pass' with return type", () => {
  //   const result = toSourceText(
  //     <py.FunctionDeclaration
  //       name="foo"
  //       returnType="int"
  //     />,
  //   );
  //   expect(result).toRenderTo(d`
  //     def foo() -> int:
  //       pass


  //   `);
  // });

  it("renders a function that calls another function", () => {
    const refkeyFoo = refkey();
    const result = toSourceText(
      <>
        <py.FunctionDeclaration
          name="foo"
          instanceFunction={true}
          returnType="int"
          refkey={refkeyFoo}
        />
        <hbr />
        <py.FunctionDeclaration
          name="bar"
          instanceFunction={true}
          returnType="int"
        >
          <py.VariableDeclaration
            name="result"
            type={refkeyFoo}
            initializer={
              <py.FunctionCallExpression target={refkeyFoo} args={[]} />
            }
          />
        </py.FunctionDeclaration>
      </>,
    );
    // TODO: Fix type once we handle types properly
    expect(result).toRenderTo(d`
      def foo(self) -> int:
        pass

      def bar(self) -> int:
        result: foo = foo()


    `);
  });

  // it("renders an instance function with a body", () => {
  //   const result = toSourceText(
  //     <py.FunctionDeclaration name="bar" instanceFunction={true}>
  //       print('hi')
  //     </py.FunctionDeclaration>,
  //   );
  //   expect(result).toRenderTo(d`
  //     def bar(self):
  //       print('hi')


  //   `);
  // });

  // it("renders a function with parameters", () => {
  //   const result = toSourceText(
  //     <py.FunctionDeclaration
  //       name="baz"
  //       parameters={[
  //         { name: "x", type: "int" },
  //         { name: "y", default: 0 },
  //         { name: "z", type: "int", default: 42 },
  //       ]}
  //       args={true}
  //       kwargs={true}
  //     >
  //       print(x, y)
  //     </py.FunctionDeclaration>,
  //   );
  //   expect(result).toRenderTo(
  //     d`
  //       def baz(x: int, y=0, z: int = 42, *args, **kwargs):
  //         print(x, y)


  //     `,
  //   );
  // });

  // it("renders an __init__ function with no body as 'pass'", () => {
  //   const result = toSourceText(
  //     <py.InitFunctionDeclaration parameters={[{ name: "x" }]} />,
  //   );
  //   expect(result).toRenderTo(d`
  //     def __init__(self, x):
  //       pass


  //   `);
  // });

  // it("can be an async function", () => {
  //   expect(toSourceText(<py.FunctionDeclaration async name="foo" />)).toBe(d`
  //     async def foo():
  //       pass

  //   `);
  // });

  // it("can be an async function with returnType", () => {
  //   expect(
  //     toSourceText(<py.FunctionDeclaration async name="foo" returnType="Foo" />),
  //   ).toBe(d`
  //     async def foo() -> Foo:
  //       pass

  //   `);
  // });

  // it("can be an async function with returnType element", () => {
  //   function Foo(_props?: Props) {
  //     return <>Foo</>;
  //   }
  //   expect(
  //     toSourceText(<py.FunctionDeclaration async name="foo" returnType={<Foo />} />),
  //   ).toBe(d`
  //     async def foo() -> Foo:
  //       pass

  //   `);
  // });

  // it("supports parameters", () => {
  //   const decl = (
  //     <py.FunctionDeclaration name="foo" parameters={["a", "b"]}>
  //       return a + b
  //     </py.FunctionDeclaration>
  //   );

  //   expect(toSourceText(decl)).toBe(d`
  //     def foo(a, b):
  //       return a + b
      
  //   `);
  // });

  // it("supports parameters by element", () => {
  //   const decl = (
  //     <py.FunctionDeclaration name="foo">
  //       <py.FunctionDeclaration.Body>return a + b</py.FunctionDeclaration.Body>
  //       <py.FunctionDeclaration.Parameters>a, b</py.FunctionDeclaration.Parameters>
  //     </py.FunctionDeclaration>
  //   );

  //   expect(toSourceText(decl)).toBe(d`
  //     def foo(a, b):
  //       return a + b
      
  //   `);
  // });

  // it("supports more complex parameters by element", () => {
  //   const params = [
  //     { name: "x", type: "int", optional: true, default: 10 },
  //     { name: "y", type: "str", optional: true, default: "default" },
  //     { name: "z", type: "float", optional: true, default: 3.14 },
  //   ];
  //   const decl = (
  //     <py.FunctionDeclaration name="foo" returnType="int">
  //       <py.FunctionDeclaration.Body>return a + b</py.FunctionDeclaration.Body>
  //       <py.FunctionDeclaration.Parameters parameters={params} />
  //     </py.FunctionDeclaration>
  //   );

  //   expect(toSourceText(decl)).toBe(d`
  //     def foo(x: int = 10, y: str = "default", z: float = 3.14) -> int:
  //       return a + b
      
  //   `);
  // });
});