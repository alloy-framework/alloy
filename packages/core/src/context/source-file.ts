import { ComponentContext, createNamedContext } from "../context.js";
import type { Refkey } from "../refkey.js";
import { ComponentDefinition } from "../runtime/component.js";

export interface SourceFileContext {
  path: string;
  filetype: string;
  reference?: ComponentDefinition<{ refkey: Refkey }>;
}

export const SourceFileContext: ComponentContext<SourceFileContext> =
  createNamedContext("SourceFile");
