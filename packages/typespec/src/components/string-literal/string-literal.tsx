import { Children } from "@alloy-js/core";

export interface StringLiteralProps {
  /**
   * The string content. May include {@link StringTemplateExpr} children
   * for interpolation.
   */
  children: Children;

  /**
   * Render as a triple-quoted multi-line string (`""" ... """`).
   * When true, content is indented and wrapped in triple-quote delimiters.
   */
  multiline?: boolean;
}

/**
 * A TypeSpec string literal or string template literal.
 *
 * @example Simple string
 * ```tsx
 * <StringLiteral>hello world</StringLiteral>
 * ```
 * Produces: `"hello world"`
 *
 * @example Multi-line string
 * ```tsx
 * <StringLiteral multiline>
 *   {code`
 *     This is a multi line string
 *     - opt 1
 *     - opt 2
 *   `}
 * </StringLiteral>
 * ```
 * Produces:
 * ```typespec
 * """
 *   This is a multi line string
 *   - opt 1
 *   - opt 2
 *   """
 * ```
 *
 * @example Template literal with interpolation
 * ```tsx
 * <StringLiteral>
 *   hello <StringTemplateExpr>{refkey(greeting)}</StringTemplateExpr>!
 * </StringLiteral>
 * ```
 * Produces: `"hello ${greeting}!"`
 */
export function StringLiteral(props: StringLiteralProps) {
  if (props.multiline) {
    return (
      <>
        {'"""'}
        <indent>
          <hbr />
          {props.children}
          <hbr />
          {'"""'}
        </indent>
      </>
    );
  }

  return <>"{props.children}"</>;
}
