import { OutputScope } from "@alloy-js/core";

export class PythonModuleScope extends OutputScope {
  get kind() {
    return "module" as const;
  }
}
