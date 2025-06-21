import { ComponentContext, createNamedContext } from "../context.js";
import { ComponentDefinition } from "../runtime/component.js";
import type { Refkey } from "../symbols/refkey.js";

export interface SourceFileContext {
  path: string;
  filetype: string;
  reference?: ComponentDefinition<{ refkey: Refkey }>;
}

export const SourceFileContext: ComponentContext<SourceFileContext> =
  createNamedContext("SourceFile");
