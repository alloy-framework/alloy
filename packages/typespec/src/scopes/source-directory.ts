import { OutputScope, OutputScopeOptions } from "@alloy-js/core";

export interface SourceDirectoryScopeOptions extends OutputScopeOptions {}

export class SourceDirectoryScope extends OutputScope {
  constructor(
    readonly path: string,
    parent?: SourceDirectoryScope,
    options?: SourceDirectoryScopeOptions,
  ) {
    super(path, parent, options);
  }
}
