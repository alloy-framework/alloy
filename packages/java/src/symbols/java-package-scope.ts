import { Binder, OutputScope } from "@alloy-js/core";

export interface JavaPackageScope extends OutputScope {
  kind: "package";
}

export function createJavaPackageScope(
  binder: Binder,
  parent: OutputScope | undefined,
  name: string,
): JavaPackageScope {
  return binder.createScope<JavaPackageScope>({
    kind: "package",
    name,
    parent,
  });
}
