import { Children } from "@alloy-js/core";

export interface StringTemplateExprProps {
  /** The expression to interpolate inside `${ }`. */
  children: Children;
}

/**
 * A TypeSpec string template expression (`${expr}`).
 * Must be used inside a {@link StringLiteral}.
 *
 * @example
 * ```tsx
 * <StringLiteral>
 *   hello <StringTemplateExpr>{refkey(greeting)}</StringTemplateExpr>!
 * </StringLiteral>
 * ```
 * Produces: `"hello ${greeting}!"`
 */
export function StringTemplateExpr(props: StringTemplateExprProps) {
  return (
    <>
      {"${"}
      {props.children}
      {"}"}
    </>
  );
}
