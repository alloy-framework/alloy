import { OutputSymbol, type OutputSymbolOptions } from "@alloy-js/core";

export class DocSymbol extends OutputSymbol {
  #path: string;
  get path() {
    return this.#path;
  }

  constructor(name: string, path: string, options?: OutputSymbolOptions) {
    super(name, options);
    this.#path = path;
  }
}
