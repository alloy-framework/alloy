import { OutputSymbol, OutputSymbolOptions, track, TrackOpTypes, trigger, TriggerOpTypes } from "@alloy-js/core";
import { PythonMemberScope } from "./python-member-scope.js";

export enum PythonSymbolFlags {
  None = 0,
  LocalImportSymbol = 1 << 0, // from foo import >Bar<
  ClassSymbol = 1 << 1, // class >MyClass<
  FunctionSymbol = 1 << 2, // def >func<()
  ParameterSymbol = 1 << 3, // def foo(>x<):
  InstanceMember = 1 << 4, // self.>value< = 42
  StaticMember = 1 << 5, // @staticmethod / @classFunction decorated methods or class variables
  PrivateMember = 1 << 6, // _hidden or __hidden__-named variables
  Nullish = 1 << 7, // >foo<: Optional[str] = None
}

export interface CreatePythonSymbolOptions extends OutputSymbolOptions {
  module?: string;
  pythonFlags?: PythonSymbolFlags;
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
    this.#pythonFlags = options.pythonFlags ?? PythonSymbolFlags.None;
  }

  #pythonFlags: PythonSymbolFlags;
  get pythonFlags() {
    track(this, TrackOpTypes.GET, "pythonFlags");
    return this.#pythonFlags;
  }
  set pythonFlags(value: PythonSymbolFlags) {
    const oldValue = this.#pythonFlags;
    if (oldValue === value) {
      return;
    }
    this.#pythonFlags = value;
    trigger(this, TriggerOpTypes.SET, "pythonFlags", value, oldValue);
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
