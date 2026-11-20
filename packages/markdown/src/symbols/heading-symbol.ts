import {
  createSymbol,
  OutputSymbol,
  type OutputSpace,
  type OutputSymbolOptions,
} from "@alloy-js/core";

export interface HeadingSymbolOptions extends OutputSymbolOptions {
  path: string;
  title: string;
}

export interface HeadingDependency {
  resolve(): HeadingSymbol | undefined;
  isCurrent(): boolean;
}

export class HeadingSymbol extends OutputSymbol {
  readonly path: string;
  readonly dependencies = new Set<HeadingDependency>();
  get title(): string {
    return this.metadata.title as string;
  }

  set title(value: string) {
    this.metadata.title = value;
  }

  get ready(): boolean {
    return this.metadata.ready === true;
  }

  set ready(value: boolean) {
    this.metadata.ready = value;
  }

  constructor(
    name: string,
    spaces: OutputSpace | OutputSpace[] | undefined,
    options: HeadingSymbolOptions,
  ) {
    super(name, spaces, options);
    this.path = options.path;
    this.title = options.title;
  }

  copy() {
    const copy = createSymbol(HeadingSymbol, this.name, undefined, {
      ...this.getCopyOptions(),
      path: this.path,
      title: this.title,
    });
    this.initializeCopy(copy);
    return copy;
  }
}
