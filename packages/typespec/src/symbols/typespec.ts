import {
  Namekey,
  OutputSpace,
  OutputSymbol,
  OutputSymbolOptions,
} from "@alloy-js/core";

export interface TypeSpecSymbolOptions extends OutputSymbolOptions {
  /**
   * When set, referencing this symbol will automatically add
   * an `import "<packageImport>";` to the source file.
   */
  packageImport?: string;
  /**
   * When true, this symbol is implicitly available without
   * any `import` or `using` statement.
   */
  implicitlyUsed?: boolean;
}

export type TypeSpecSymbolKind =
  | "symbol"
  | "program"
  | "namespace"
  | "named-type";

export class TypeSpecSymbol extends OutputSymbol {
  public readonly symbolKind: TypeSpecSymbolKind = "symbol";

  constructor(
    name: string | Namekey,
    spaces: OutputSpace[] | OutputSpace | undefined,
    options: TypeSpecSymbolOptions = {},
  ) {
    super(name, spaces, options);
    this.#packageImport = options.packageImport;
    this.#implicitlyUsed = options.implicitlyUsed ?? false;
  }

  #packageImport: string | undefined;
  get packageImport() {
    return this.#packageImport;
  }

  #implicitlyUsed: boolean;
  get implicitlyUsed() {
    return this.#implicitlyUsed;
  }

  copy(): OutputSymbol {
    const options = this.getCopyOptions();
    const copy = new TypeSpecSymbol(this.name, this.spaces, {
      ...options,
      packageImport: this.#packageImport,
      implicitlyUsed: this.#implicitlyUsed,
    });
    this.initializeCopy(copy);

    return copy;
  }
}
