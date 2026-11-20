import {
  BasicScope,
  code,
  createSymbol,
  Declaration,
  onCleanup,
  printTree,
  SourceFileContext,
  sti,
  useContext,
  useScope,
  type Refkey,
} from "@alloy-js/core";
import type { Children } from "@alloy-js/core/jsx-runtime";

import { useSectionContext } from "../context/section.js";
import { MarkdownFileContext } from "../context/source-file.js";
import { headingText } from "../heading-text.js";
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

  const content = sti("group")({ children: props.children })();
  const title = headingText(
    printTree(content, { noFlush: true, printWidth: Infinity }),
  );
  const automaticId = file.slugger.slug(title);
  const id = props.id ?? (automaticId || "section");
  if (id.length === 0 || /[\s"'<>&]/u.test(id)) {
    throw new Error(`Invalid Markdown heading ID: ${JSON.stringify(id)}.`);
  }
  if (file.ids.has(id) || file.ids.has(automaticId)) {
    throw new Error(`Duplicate Markdown heading ID: ${JSON.stringify(id)}.`);
  }
  file.ids.add(id);
  file.ids.add(automaticId);
  onCleanup(() => {
    file.ids.delete(id);
    file.ids.delete(automaticId);
  });

  const symbol = createSymbol(HeadingSymbol, id, scope.symbols, {
    refkeys: props.refkey,
    ignoreNameConflict: true,
    path: sourceFile.path,
    title,
  });
  onCleanup(() => symbol.delete());

  return (
    <Declaration symbol={symbol}>
      {(props.id !== undefined || automaticId === "") && (
        <>
          {code`<a id="${id}"></a>`}
          <hbr />
          <hbr />
        </>
      )}
      {"#".repeat(level)} {content}
    </Declaration>
  );
}
