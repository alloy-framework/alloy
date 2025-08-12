import { OutputSymbol, OutputSymbolOptions, SymbolTable } from "@alloy-js/core";

export interface PythonOutputSymbolOptions extends OutputSymbolOptions {
  module?: string;
}

export interface CreatePythonSymbolFunctionOptions
  extends PythonOutputSymbolOptions {
  name: string;
}

/**
 * Represents an 'exported' symbol from a .py file. Class, enum, interface etc.
 */
export class PythonOutputSymbol extends OutputSymbol {
  static readonly memberSpaces = ["static", "instance"] as const;

  constructor(
    name: string,
    spaces: SymbolTable[] | SymbolTable | undefined,
    options: PythonOutputSymbolOptions,
  ) {
    super(name, spaces, options);
    this.#module = options.module ?? undefined;
  }

  // The module in which the symbol is defined
  #module?: string;

  get module() {
    return this.#module;
  }

  get staticMembers() {
    return this.memberSpaceFor("static")!;
  }

  get instanceMembers() {
    return this.memberSpaceFor("instance")!;
  }

  get isStaticMemberSymbol() {
    return !this.isInstanceMemberSymbol;
  }

  get isInstanceMemberSymbol() {
    return this.spaces.some((s) => s.key === "instance");
  }

  copy() {
    const copy = new PythonOutputSymbol(this.name, undefined, {
      binder: this.binder,
      aliasTarget: this.aliasTarget,
      module: this.module,
      flags: this.flags,
      metadata: this.metadata,
    });

    this.initializeCopy(copy);

    return copy;
  }
}
