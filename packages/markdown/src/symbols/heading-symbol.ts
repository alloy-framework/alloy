import {
  createSymbol,
  OutputSymbol,
  type OutputSpace,
  type OutputSymbolOptions,
} from "@alloy-js/core";

export interface HeadingSymbolOptions extends OutputSymbolOptions {
  path: string;
  text: () => string | undefined;
}

export class HeadingSymbol extends OutputSymbol {
  /** Path of the file declaring the heading. */
  readonly path: string;
  /** Trimmed heading text, or `undefined` when the heading has JSX children. */
  readonly text: () => string | undefined;

  constructor(
    name: string,
    spaces: OutputSpace | OutputSpace[] | undefined,
    options: HeadingSymbolOptions,
  ) {
    super(name, spaces, options);
    this.path = options.path;
    this.text = options.text;
  }

  copy() {
    const copy = createSymbol(HeadingSymbol, this.name, undefined, {
      ...this.getCopyOptions(),
      path: this.path,
      text: this.text,
    });
    this.initializeCopy(copy);
    return copy;
  }
}
