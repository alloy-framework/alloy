import { Children } from "@alloy-js/core";

export interface StringLiteralProps {
  /**
   * The string value. For multi-line strings, newlines in the value are
   * rendered as line breaks. Use this for simple strings without interpolation.
   */
  value?: string;

  /**
   * The string content as children. Use this for template expressions
   * with {@link StringTemplateExpr} interpolation. If both `value` and
   * `children` are provided, `children` takes precedence.
   */
  children?: Children;

  /**
   * Render as a triple-quoted multi-line string (`""" ... """`).
   * When true, content is indented and wrapped in triple-quote delimiters.
   */
  multiline?: boolean;
}

/**
 * A TypeSpec string literal or string template literal.
 *
 * @example Simple string via value prop
 * ```tsx
 * <StringLiteral value="hello world" />
 * ```
 * Produces: `"hello world"`
 *
 * @example Multi-line string via value prop
 * ```tsx
 * <StringLiteral value={"line one\nline two"} multiline />
 * ```
 * Produces:
 * ```typespec
 * """
 *   line one
 *   line two
 *   """
 * ```
 *
 * @example Template literal with interpolation via children
 * ```tsx
 * <StringLiteral>
 *   hello <StringTemplateExpr>{refkey(greeting)}</StringTemplateExpr>!
 * </StringLiteral>
 * ```
 * Produces: `"hello ${greeting}!"`
 */
export function StringLiteral(props: StringLiteralProps) {
  const content = props.children ?? valueToChildren(props.value ?? "");

  if (props.multiline) {
    return (
      <>
        {'"""'}
        <indent>
          <hbr />
          {content}
          <hbr />
          {'"""'}
        </indent>
      </>
    );
  }

  return <>"{content}"</>;
}

function valueToChildren(value: string): Children {
  const lines = value.split("\n");
  if (lines.length === 1) {
    return value;
  }
  const result: Children[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (i > 0) {
      result.push(<hbr />);
    }
    result.push(lines[i]);
  }
  return result;
}
