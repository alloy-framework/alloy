import type { CommonFormatOptions } from "@alloy-js/core";
import { createFormatOptionsContextFor } from "@alloy-js/core";

export interface CSharpFormatOptions extends CommonFormatOptions {}

export const {
  Provider: CSharpFormatOptions,
  useFormatOptions: useCsharpFormatOptions,
} = createFormatOptionsContextFor<CSharpFormatOptions>("csharp", {
  tabWidth: 4,
  printWidth: 120,
});
