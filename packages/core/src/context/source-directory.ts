import { ComponentContext, createNamedContext } from "../context.js";
import type { CopyFileContext, SourceFileContext } from "./source-file.js";

export interface SourceDirectoryContext {
  contents: (SourceDirectoryContext | SourceFileContext | CopyFileContext)[];
  addContent(
    content: SourceDirectoryContext | SourceFileContext | CopyFileContext,
  ): void;
  path: string;
}

export const SourceDirectoryContext: ComponentContext<SourceDirectoryContext> =
  createNamedContext("SourceDirectory");
