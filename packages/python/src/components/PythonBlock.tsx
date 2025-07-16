import { Block, Children } from "@alloy-js/core";

/**
 * A Python block component that can be used to render a block of Python code.
 *
 * @example
 * ```tsx
 * <PythonBlock opener="def my_function()">
 *   <VariableDeclaration name="x" type="int" />
 *   <VariableDeclaration name="y" type="str" />
 * </PythonBlock>
 * ```
 * renders to
 * ```py
 * def my_function():
 *   x: int = None
 *   y: str = None
 * ```
 */
export function PythonBlock(props: { children: Children; opener?: string }) {
  return (
    <Block opener={props.opener ?? ""} closer="" newline={false}>
      {props.children}
    </Block>
  );
}
