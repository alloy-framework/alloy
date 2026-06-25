import { OutputScope, OutputScopeOptions } from "@alloy-js/core";

export interface ProgramScopeOptions extends OutputScopeOptions {}

export class ProgramScope extends OutputScope {
  public static readonly declarationSpaces: readonly string[] = ["members"];
  constructor(options?: ProgramScopeOptions) {
    super("program", undefined, {
      ...options,
    });
  }

  get members() {
    return this.spaceFor("members")!;
  }
}
