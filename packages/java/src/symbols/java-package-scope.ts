import { OutputScope } from "@alloy-js/core";

export class JavaPackageScope extends OutputScope {
  get kind() {
    return "package";
  }
}
