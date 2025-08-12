import { CSharpNamedTypeScope } from "./named-type.js";

export class CSharpClassScope extends CSharpNamedTypeScope {
  public static readonly declarationSpaces = ["parameters"];

  /**
   * For now, we stuff class parameters into the member scope. This is to ensure
   * name conflicts are handled correctly.
   */
  get parameters() {
    return this.members;
  }
}
