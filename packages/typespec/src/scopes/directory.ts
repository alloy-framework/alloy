import { OutputScope, OutputScopeOptions } from "@alloy-js/core";

export interface DirectoryScopeOptions extends OutputScopeOptions {}

export class DirectoryScope extends OutputScope {
  constructor(
    readonly path: string,
    parent?: DirectoryScope,
    options?: DirectoryScopeOptions,
  ) {
    super(path, parent, options);
  }
}
