import {
  BasicScope,
  childrenArray,
  code,
  createSymbol,
  Declaration,
  memo,
  onCleanup,
  shallowRef,
  SourceFileContext,
  useContext,
  useScope,
  type Children,
  type Refkey,
} from "@alloy-js/core";

import { useSectionContext } from "../context/section.js";
import {
  MarkdownFileContext,
  type HeadingEntry,
} from "../context/source-file.js";
import { HeadingSymbol } from "../symbols/heading-symbol.js";

export interface HeadingProps {
  /** Heading depth. Defaults to the current section depth. */
  level?: number;
  /**
   * Heading content. Automatic IDs and default link text are derived from
   * string children; headings with JSX children need an explicit `id` to be
   * referenced.
   */
  children: Children;
  /** Key used to link to this heading. */
  refkey?: Refkey;
  /** Stable anchor ID independent of the display text. Must be unique in the file. */
  id?: string;
}

export function Heading(props: HeadingProps) {
  const level =
    props.level !== undefined ? props.level : useSectionContext().level;
  const children = memo(() => childrenArray(() => props.children));
  const file = useContext(MarkdownFileContext);
  const sourceFile = useContext(SourceFileContext);
  const scope = useScope();
  if (!file || !sourceFile || !(scope instanceof BasicScope)) {
    if (props.refkey === undefined && props.id === undefined) {
      return (
        <>
          {"#".repeat(level)} {children}
        </>
      );
    }
    throw new Error("Heading must be rendered inside a Markdown SourceFile.");
  }

  if (
    props.id !== undefined &&
    (props.id.length === 0 || /[\s"'<>&]/u.test(props.id))
  ) {
    throw new Error(
      `Invalid Markdown heading ID: ${JSON.stringify(props.id)}.`,
    );
  }
  const text = memo(() => headingText(children()));
  const symbol =
    props.refkey === undefined
      ? undefined
      : createSymbol(HeadingSymbol, props.id ?? "", scope.symbols, {
          refkeys: props.refkey,
          ignoreNameConflict: true,
          path: sourceFile.path,
          text,
        });
  const entry: HeadingEntry = {
    text,
    id: props.id,
    symbol,
    anchor: shallowRef<string>(),
  };
  file.headings.add(entry);
  onCleanup(() => {
    file.headings.delete(entry);
    symbol?.delete();
  });
  const heading = (
    <>
      {() =>
        entry.anchor.value !== undefined && (
          <>
            {code`<a id="${entry.anchor.value}"></a>`}
            <hbr />
            <hbr />
          </>
        )
      }
      {"#".repeat(level)} {children}
    </>
  );
  return symbol ? (
    <Declaration symbol={symbol}>{heading}</Declaration>
  ) : (
    heading
  );
}

function headingText(children: Children[]): string | undefined {
  let text = "";
  for (const child of children) {
    if (typeof child === "string" || typeof child === "number") {
      text += child;
    } else if (
      child !== null &&
      child !== undefined &&
      typeof child !== "boolean"
    ) {
      return undefined;
    }
  }
  return text.trim();
}
