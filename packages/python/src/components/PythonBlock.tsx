import { Block, Children } from "@alloy-js/core";

export interface PythonBlockProps {
  children: Children;
  opener?: string;
}

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
export function PythonBlock(props: PythonBlockProps) {
  return (
    <Block opener={props.opener ?? ""} closer="">
      {props.children}
    </Block>
  );
}
