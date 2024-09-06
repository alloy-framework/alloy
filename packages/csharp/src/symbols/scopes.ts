import * as core from "@alloy-js/core";
import { CSharpOutputSymbol } from "./csharp-output-symbol.js";

// indicates that the scope for a symbols is at the namespace level
export interface CSharpNamespaceScope extends core.OutputScope {
  kind: "namespace";
}

// creates a new namespace scope
export function createCSharpNamespaceScope(binder: core.Binder, parent: core.OutputScope | undefined, name: string): CSharpNamespaceScope {
  return binder.createScope<CSharpNamespaceScope>({
    kind: "namespace",
    name,
    parent,
  });
}

// the kind of member scope. i.e. are we in an enum, class, etc
export type CSharpMemberScopeName = "class" | "enum" | "method";

// indicates that the scope for a symbol resides within a type
// e.g. for an enum value, class field etc, these would have
// member scope where the owner is the containing type.
export interface CSharpMemberScope extends core.OutputScope {
  kind: "member";
  name: CSharpMemberScopeName;
  owner: CSharpOutputSymbol;
}

// creates a new member scope.
// parent is the owning symbol.
export function createCSharpMemberScope(binder: core.Binder, parent: core.OutputScope, owner: CSharpOutputSymbol, name: CSharpMemberScopeName): CSharpMemberScope {
  return binder.createScope<CSharpMemberScope>({
    kind: "member",
    name: name,
    owner,
    parent,
  });
}

// contains the possible scopes where a declaration can reside
export type CSharpOutputScope = CSharpMemberScope | CSharpNamespaceScope;

// returns the current C# scope
export function useCSharpScope(): CSharpOutputScope {
  return core.useScope() as CSharpOutputScope;
}
