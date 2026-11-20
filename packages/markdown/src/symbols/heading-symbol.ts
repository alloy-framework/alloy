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

export class HeadingSymbol extends OutputSymbol {
  readonly path: string;
  readonly title: string;

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
