import { OutputScope, useScope } from "@alloy-js/core";
import { GoScope } from "./go.js";

export class GoModuleScope extends GoScope {
  constructor(name: string, builtin = false) {
    super(name, undefined);
    this.#builtin = builtin;
  }

  #builtin: boolean;
  get builtin() {
    return this.#builtin;
  }
}

export function createGoModuleScope(name: string) {
  const parentScope = useScope();
  if (parentScope) {
    throw new Error("Modules can only be created at the top level");
  }
  const scope = new GoModuleScope(name);
  return scope;
}

export function useModule() {
  let scope: OutputScope | undefined = useScope();
  while (scope) {
    if (scope instanceof GoModuleScope) {
      return scope;
    }
    scope = scope.parent;
  }

  throw new Error("A module is not in scope");
}
