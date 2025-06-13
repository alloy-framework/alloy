import { ComponentContext, createNamedContext } from "../context.js";
import type { SourceFileContext } from "./source-file.js";

export interface SourceDirectoryContext {
  contents: (SourceDirectoryContext | SourceFileContext)[];
  addContent(content: SourceDirectoryContext | SourceFileContext): void;
  path: string;
}

export const SourceDirectoryContext: ComponentContext<SourceDirectoryContext> =
  createNamedContext("SourceDirectory");
