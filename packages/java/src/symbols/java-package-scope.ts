import { OutputScope } from "@alloy-js/core";

export class JavaPackageScope extends OutputScope {
  public static readonly declarationSpaces = ["symbols"] as const;

  get kind() {
    return "package";
  }

  get symbols() {
    return this.spaceFor("symbols")!;
  }
}
