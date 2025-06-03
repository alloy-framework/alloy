import * as core from "@alloy-js/core";
import { CSharpOutputSymbol } from "./csharp-output-symbol.js";

// indicates that the scope for a symbols is at the namespace level
export class CSharpNamespaceScope extends core.OutputScope {
  get kind() {
    return "namespace";
  }
}

// the kind of member scope. i.e. are we in an enum, class, etc
export type CSharpMemberScopeName =
  | "class-decl"
  | "constructor-decl"
  | "enum-decl"
  | "method-decl";

// indicates that the scope for a symbol resides within a type
// e.g. for an enum value, class field etc, these would have
// member scope where the owner is the containing type.
export class CSharpMemberScope extends core.OutputScope {
  get kind() {
    return "member";
  }

  get name() {
    return super.name as CSharpMemberScopeName;
  }

  get owner() {
    return super.owner as CSharpOutputSymbol;
  }
}

// contains the possible scopes where a declaration can reside
export type CSharpOutputScope = CSharpMemberScope | CSharpNamespaceScope;

// returns the current C# scope
export function useCSharpScope(): CSharpOutputScope {
  return core.useScope() as CSharpOutputScope;
}
