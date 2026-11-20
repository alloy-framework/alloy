import {
  BasicScope,
  code,
  createSymbol,
  Declaration,
  onCleanup,
  SourceFileContext,
  sti,
  useContext,
  useScope,
  type Refkey,
} from "@alloy-js/core";
import type { Children } from "@alloy-js/core/jsx-runtime";

import { useSectionContext } from "../context/section.js";
import {
  HeadingContext,
  MarkdownFileContext,
  type HeadingTarget,
} from "../context/source-file.js";
import { HeadingSymbol } from "../symbols/heading-symbol.js";

export interface HeadingProps {
  /** Heading depth. Defaults to the current section depth. */
  level?: number;
  /** Heading display text, including inline Markdown components. */
  children: Children;
  /** Key used to link to this heading. */
  refkey?: Refkey;
  /** Stable anchor ID independent of the display text. Must be unique in the file. */
  id?: string;
}

export function Heading(props: HeadingProps) {
  const level =
    props.level !== undefined ? props.level : useSectionContext().level;
  const file = useContext(MarkdownFileContext);
  const sourceFile = useContext(SourceFileContext);
  const scope = useScope();
  if (!file || !sourceFile || !(scope instanceof BasicScope)) {
    if (props.refkey === undefined && props.id === undefined) {
      return (
        <>
          {"#".repeat(level)} {props.children}
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
  const symbol = createSymbol(HeadingSymbol, props.id ?? "", scope.symbols, {
    refkeys: props.refkey,
    ignoreNameConflict: true,
    path: sourceFile.path,
    title: "",
  });
  const target: HeadingTarget = {
    symbol,
    explicitId: props.id,
    dependencies: symbol.dependencies,
  };
  const markdownFile = file;
  markdownFile.headings.add(target);
  onCleanup(() => {
    markdownFile.headings.delete(target);
    symbol.delete();
    markdownFile.invalidate();
  });
  function Content() {
    target.content = sti("group")({
      children: () => {
        const children = props.children;
        markdownFile.invalidate();
        return children;
      },
    })();
    return target.content;
  }
  markdownFile.invalidate();
  return (
    <Declaration symbol={symbol}>
      {symbol.metadata.explicitAnchor === true && (
        <>
          {code`<a id="${symbol.name}"></a>`}
          <hbr />
          <hbr />
        </>
      )}
      {"#".repeat(level)}{" "}
      <HeadingContext.Provider value={target}>
        <Content />
      </HeadingContext.Provider>
    </Declaration>
  );
}
