import { OutputScope, createScope, useScope } from "@alloy-js/core";
import type { PackageSymbol } from "../symbols/package.js";
import { GoModuleScope } from "./module.js";
import { GoNamedTypeScope } from "./named-type.js";

export class GoPackageScope extends GoNamedTypeScope {
  constructor(
    packageSymbol: PackageSymbol,
    parentScope?: GoPackageScope | GoModuleScope,
  ) {
    super(packageSymbol, parentScope, { binder: packageSymbol.binder });
  }

  get ownerSymbol() {
    return super.ownerSymbol as PackageSymbol;
  }
}

export function createGoPackageScope(packageSymbol: PackageSymbol) {
  const parentScope = useScope();
  if (
    parentScope &&
    !(
      parentScope instanceof GoPackageScope ||
      parentScope instanceof GoModuleScope
    )
  ) {
    throw new Error("Packages can only be created within a package or module");
  }

  const scope = createScope(GoPackageScope, packageSymbol, parentScope);

  return scope;
}

export function useEnclosingPackageScope(): GoPackageScope | undefined {
  const currentScope = useScope();
  if (!(currentScope instanceof GoPackageScope)) {
    return undefined;
  }

  return currentScope;
}

export function usePackage() {
  let scope: OutputScope | undefined = useScope();
  while (scope) {
    if (scope instanceof GoPackageScope) {
      return scope;
    }
    scope = scope.parent;
  }

  throw new Error("A package is not in scope");
}
