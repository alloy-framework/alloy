import { Children } from "../jsx-runtime.js";

export interface IndentProps {
  children: Children;
  /**
   * Don't include a line break. The new indentation level will start after the
   * first linebreak within the children.
   */
  nobreak?: boolean;

  /**
   * Use a regular line (`<br />`) to start (and optionally end with
   * `trailingBreak`) the new indentation level.
   */
  line?: boolean;

  /**
   * Use a soft line (`<sbr />`) to start (and optionally end with
   * `trailingBreak`) the new indentation level.
   */
  softline?: boolean;

  /**
   * Use a hard line (`<hbr />`) to start (and optionally end with
   * `trailingBreak`) the new indentation level.
   */
  hardline?: boolean;

  /**
   * Place the configured line break at the end of the block after restoring the
   * indentation level.
   */
  trailingBreak?: boolean;
}

/**
 * Create an indented block of source text. The indented block starts a new line
 * at the new indentation level and, with `trailingBreak`, ends with a new line
 * after restoring the indentation level. The default line break is a hard line
 * break suitable for typical blocks of statements but can be configured.
 */
export function Indent(props: IndentProps) {
  const breakElem =
    props.nobreak ? ""
    : props.hardline ? <hbr />
    : props.softline ? <sbr />
    : props.line ? <br />
    : <hbr />;

  return (
    <>
      <indent>
        {breakElem}
        {props.children}
      </indent>
      {props.trailingBreak && breakElem}
    </>
  );
}
