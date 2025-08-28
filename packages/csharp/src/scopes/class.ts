import type { OutputSpace } from "@alloy-js/core";
import { CSharpNamedTypeScope } from "./named-type.js";

export class CSharpClassScope extends CSharpNamedTypeScope {
  /**
   * For now, we stuff class parameters into the member scope. This is to ensure
   * name conflicts are handled correctly.
   */
  get parameters(): OutputSpace {
    return this.members;
  }
}
