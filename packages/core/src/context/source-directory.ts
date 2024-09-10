import { ComponentContext, createContext } from "../context.js";
import { SourceFileContext } from "./source-file.js";

export interface SourceDirectoryContext {
  contents: (SourceDirectoryContext | SourceFileContext)[];
  addContent(content: SourceDirectoryContext | SourceFileContext): void;
  path: string;
}

export const SourceDirectoryContext: ComponentContext<SourceDirectoryContext> =
  createContext();
