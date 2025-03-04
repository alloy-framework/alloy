import { join } from "pathe";
import { useContext } from "../context.js";
import { SourceDirectoryContext } from "../context/source-directory.js";
import { SourceFileContext } from "../context/source-file.js";
import { Children, ComponentDefinition, getContext } from "../jsx-runtime.js";
import { Refkey } from "../refkey.js";
import { PrintTreeOptions } from "../render.js";

export interface SourceFileProps extends PrintTreeOptions {
  /**
   * The path of this file relative to its parent directory
   */
  path: string;

  /**
   * The type of contents in this file.
   */
  filetype: string;

  children?: Children;

  /**
   * The component to use to render refkeys references within the file's
   * contents.
   */
  reference?: ComponentDefinition<{ refkey: Refkey }>;
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
  nodeContext.meta.printOptions = {
    printWidth: props.printWidth,
    tabWidth: props.tabWidth,
    useTabs: props.useTabs,
  };

  return (
    <SourceFileContext.Provider value={context}>
      {props.children}
    </SourceFileContext.Provider>
  );
}
