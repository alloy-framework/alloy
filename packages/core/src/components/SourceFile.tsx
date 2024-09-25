import {
  Children,
  ComponentDefinition,
  getContext,
} from "@alloy-js/core/jsx-runtime";
import { join } from "pathe";
import { useContext } from "../context.js";
import { IndentContext } from "../context/indent.js";
import { SourceDirectoryContext } from "../context/source-directory.js";
import { SourceFileContext } from "../context/source-file.js";
import { Refkey } from "../refkey.js";

export interface SourceFileProps {
  /**
   * The path of this file relative to its parent directory
   */
  path: string;

  /**
   * The type of contents in this file.
   */
  filetype: string;

  children?: Children[];

  /**
   * The component to use to render refkeys references within the file's
   * contents.
   */
  reference?: ComponentDefinition<{ refkey: Refkey }>;

  /**
   * A string representing one indent level, used when reindenting contents of
   * this file.
   */
  indent?: string;
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

  return <SourceFileContext.Provider value={context}>
    { props.indent
      ? <IndentContext.Provider value={{ level: 0, indent: props.indent, indentString: "" }}>
          {props.children}
        </IndentContext.Provider>
      : props.children
    }
  </SourceFileContext.Provider>;
}
