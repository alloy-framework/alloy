import { useScope } from "@alloy-js/core";
import { CSharpTypeDeclarationScope } from "../scopes/type-declaration-scope.js";

/*
export interface TypeDeclarationScopeContext {
  scope: CSharpTypeDeclarationScope;
}

export const TypeDeclarationScopeContext: ComponentContext<TypeDeclarationScopeContext> =
  createContext<TypeDeclarationScopeContext>();
  */

export function useTypeDeclarationScope(): CSharpTypeDeclarationScope {
  const context = useScope();
  if (!context) {
    throw new Error("Need a type declaration context");
  }
  if (!(context instanceof CSharpTypeDeclarationScope)) {
    throw new Error("Cannot declare a type in a non-type declaration scope.");
  }

  return context;
}
