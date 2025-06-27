import { type OutputScopeOptions } from "@alloy-js/core";
import { CSharpScope } from "./csharp.js";
import type { CSharpNamespaceScope } from "./namespace-scope.js";
import { CSharpSourceFileScope } from "./source-file-scope.js";

/**
 * This scope contains type declarations
 */
export class CSharpTypeDeclarationScope extends CSharpScope {
  public static readonly declarationSpaces = ["declarations"];

  constructor(
    name: string,
    parentScope:
      | CSharpTypeDeclarationScope
      | CSharpNamespaceScope
      | CSharpSourceFileScope
      | undefined,
    options: OutputScopeOptions = {},
  ) {
    super(name, parentScope, options);
  }

  get declarations() {
    return this.spaceFor("declarations")!;
  }
}
