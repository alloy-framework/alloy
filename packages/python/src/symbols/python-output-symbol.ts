import {
  Children,
  OutputScopeFlags,
  OutputSymbol,
  OutputSymbolOptions,
  refkey,
  Refkey,
  track,
  TrackOpTypes,
  trigger,
  TriggerOpTypes,
  useBinder,
  useContext,
  useScope,
} from "@alloy-js/core";
import { SourceFileContext } from "../components/SourceFile.js";''
import { PythonMemberScope } from "./python-member-scope.js";

// prettier-ignore
export enum PythonSymbolFlags {
  None         = 0,
  LocalImport  = 1 << 0, // Symbol is imported from another module
  ClassMember  = 1 << 1, // Symbol is a member of a class
  Function     = 1 << 2, // Symbol is a function (not a class, module, or param)
  Parameter    = 1 << 3, // Symbol is a parameter in a function/method
  Private      = 1 << 4, // Symbol name starts with '_' (conventionally private)
  ModuleLevel  = 1 << 5, // Symbol is defined at module global scope
  Dunder       = 1 << 6, // Symbol is a "dunder" (double-underscore) name
  Nullish      = 1 << 7, // Symbol is 'None'
}

export interface CreatePythonSymbolOptions extends OutputSymbolOptions {
  module?: string;
  children?: Children;
  pythonFlags?: PythonSymbolFlags;
}

export interface CreatePythonSymbolFunctionOptions extends CreatePythonSymbolOptions {
  name: string;
}

/**
 * Represents an 'exported' symbol from a .py file. Class, enum, interface etc.
 */
export class PythonOutputSymbol extends OutputSymbol {
  constructor(name: string, options: CreatePythonSymbolOptions) {
    super(name, options);
    this.#children = !!options.children;
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
    trigger(this, TriggerOpTypes.SET, "tsFlags", value, oldValue);
  }

  #children: boolean;
  get children() {
    track(this, TrackOpTypes.GET, "children");
    return this.#children;
  }

  set children(value: boolean) {
    if (this.#children === value) {
      return;
    }
    this.#children = value;
    trigger(this, TriggerOpTypes.SET, "children", value, !value);
  }

  // The module in which the symbol is defined
  #module?: string;

  get module() {
    return this.#module;
  }

  set module(value: string | undefined) {
    this.#module = value;
  }

  protected createMemberScope(
    name: string,
    options: { owner?: OutputSymbol; flags?: OutputScopeFlags },
  ): PythonMemberScope {
    return new PythonMemberScope(name, {
      ...options,
    });
  }
}
