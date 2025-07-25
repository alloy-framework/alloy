import { join } from "path";
import { useContext } from "../context.js";
import { SourceDirectoryContext } from "../context/source-directory.js";
import { CopyFileContext } from "../context/source-file.js";
import { getContext } from "../reactivity.js";

export interface CopyFileProps {
  /**
   * The path to write the copy to, relative to the containing directory.
   */
  path: string;

  /**
   * The path to the file to copy.
   */
  src: string;
}

export function CopyFile(props: CopyFileProps) {
  const parentDirectory = useContext(SourceDirectoryContext)!;
  const context: CopyFileContext = {
    path: join(parentDirectory ? parentDirectory.path : "", props.path),
    sourcePath: props.src,
  };
  parentDirectory?.addContent(context);
  const nodeContext = getContext()!;
  nodeContext.meta ??= {};
  nodeContext.meta.copyFile = context;
}
