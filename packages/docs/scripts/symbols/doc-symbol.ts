import {
  BasicSymbol,
  type OutputSpace,
  type OutputSymbolOptions,
} from "@alloy-js/core";

export class DocSymbol extends BasicSymbol {
  #path: string;
  get path() {
    return this.#path;
  }

  constructor(
    name: string,
    spaces: OutputSpace[] | OutputSpace,
    path: string,
    options?: OutputSymbolOptions,
  ) {
    super(name, spaces, options);
    this.#path = path;
  }
}
