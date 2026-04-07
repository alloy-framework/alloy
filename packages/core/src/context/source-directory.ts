import { ComponentContext, createNamedContext } from "../context.js";
import type { CopyFileContext, SourceFileContext } from "./source-file.js";

export interface SourceDirectoryContext {
  contents: (SourceDirectoryContext | SourceFileContext | CopyFileContext)[];
  addContent(
    content: SourceDirectoryContext | SourceFileContext | CopyFileContext,
  ): void;
  path: string;
}

/**
 * Always provided by `<Output>` — `useContext(SourceDirectoryContext)` is
 * never `undefined` inside an `<Output>` tree. At the root of the tree,
 * `path` equals the `basePath` prop on `<Output>` (default `"./"`); nested
 * `<SourceDirectory>` components update `path` relative to their parent.
 *
 * @see {@link Output}
 * @see {@link SourceDirectory}
 */
export const SourceDirectoryContext: ComponentContext<SourceDirectoryContext> =
  createNamedContext("SourceDirectory");
