import { join } from "pathe";
import { useContext } from "../context.js";
import { useFormatOptions } from "../context/format-options.js";
import { SourceDirectoryContext } from "../context/source-directory.js";
import { SourceFileContext } from "../context/source-file.js";
import { getContext } from "../reactivity.js";
import { Refkey } from "../refkey.js";
import { PrintTreeOptions } from "../render.js";
import type { Children, ComponentDefinition } from "../runtime/component.js";
import { Show } from "./Show.jsx";

export interface SourceFileProps extends PrintTreeOptions {
  /**
   * The path of this file relative to its parent directory
   */
  path: string;

  /**
   * The type of contents in this file.
   *
   * @remarks
   * This is a metadata hint only. It does not trigger formatting or content
   * processing. The value is forwarded to debug tooling and the
   * `ContentOutputFile` output metadata.
   */
  filetype: string;

  children?: Children;

  /**
   * The component to use to render refkeys references within the file's
   * contents.
   */
  reference?: ComponentDefinition<{ refkey: Refkey }>;
  /**
   * Content rendered before the file body, separated from it by a hard line
   * break. The separator is emitted whenever `header` is not `undefined` —
   * including when it is an empty string or a component that renders nothing.
   * To suppress both the header and the separator, omit this prop entirely.
   *
   * @example
   * ```tsx
   * // Omitting `header` suppresses both header and separator:
   * <SourceFile filetype="txt" path="output/data.txt">
   *   {children}
   * </SourceFile>
   *
   * // An empty string still emits the separator newline:
   * <SourceFile filetype="txt" path="output/data.txt" header="">
   *   {children}
   * </SourceFile>
   * ```
   */
  header?: Children;
}

export function SourceFile(props: SourceFileProps) {
  const parentDirectory = useContext(SourceDirectoryContext)!;
  const context: SourceFileContext = {
    path: join(parentDirectory ? parentDirectory.path : "", props.path),
    filetype: props.filetype,
    reference: props.reference,
  };
  parentDirectory?.addContent(context);
  const nodeContext = getContext()!;
  nodeContext.meta ??= {};
  nodeContext.meta.sourceFile = context;
  nodeContext.meta.printOptions = useFormatOptions({
    printWidth: props.printWidth,
    tabWidth: props.tabWidth,
    useTabs: props.useTabs,
    insertFinalNewLine: props.insertFinalNewLine,
  });

  return (
    <SourceFileContext.Provider value={context}>
      <Show when={props.header !== undefined}>
        {props.header}
        <hbr />
      </Show>
      {props.children}
    </SourceFileContext.Provider>
  );
}
