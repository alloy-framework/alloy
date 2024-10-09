import { ComponentContext, createNamedContext } from "../context.js";
import { ComponentDefinition } from "../jsx-runtime.js";
import { Refkey } from "../refkey.js";

export interface SourceFileContext {
  path: string;
  filetype: string;
  reference?: ComponentDefinition<{ refkey: Refkey }>;
}

export const SourceFileContext: ComponentContext<SourceFileContext> =
  createNamedContext("SourceFile");
