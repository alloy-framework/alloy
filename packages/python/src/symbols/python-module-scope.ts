import { Binder, OutputScope } from "@alloy-js/core";

export interface PythonModuleScope extends OutputScope {
  kind: "module";
}

export function createPythonModuleScope(
  binder: Binder,
  parent: OutputScope | undefined,
  name: string,
): PythonModuleScope {
  return binder.createScope<PythonModuleScope>({
    kind: "module",
    name,
    parent,
  });
}
