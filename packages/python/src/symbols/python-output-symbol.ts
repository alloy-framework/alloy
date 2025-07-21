import { OutputSymbol, OutputSymbolOptions } from "@alloy-js/core";
import { PythonMemberScope } from "./python-member-scope.js";

export interface CreatePythonSymbolOptions extends OutputSymbolOptions {
  module?: string;
}

export interface CreatePythonSymbolFunctionOptions
  extends CreatePythonSymbolOptions {
  name: string;
}

/**
 * Represents an 'exported' symbol from a .py file. Class, enum, interface etc.
 */
export class PythonOutputSymbol extends OutputSymbol {
  constructor(name: string, options: CreatePythonSymbolOptions) {
    super(name, options);
    this.#module = options.module ?? undefined;
  }

  // The module in which the symbol is defined
  #module?: string;

  get module() {
    return this.#module;
  }

  set module(value: string | undefined) {
    this.#module = value;
  }

  get instanceMemberScope() {
    return super.instanceMemberScope as PythonMemberScope | undefined;
  }
}
