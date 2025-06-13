import {
  Children,
  OutputSymbol,
  OutputSymbolOptions,
  refkey,
  useBinder,
  useContext,
  useScope,
} from "@alloy-js/core";
import { SourceFileContext } from "../components/SourceFile.js";

/**
 * Represents an 'exported' symbol from a .py file. Class, enum, interface etc.
 */
export class PythonOutputSymbol extends OutputSymbol {
  // The module in which the symbol is defined
  #module?: string;

  get module() {
    return this.#module;
  }

  set module(value: string | undefined) {
    this.#module = value;
  }

  constructor(name: string, options?: PythonOutputSymbolOptions) {
    super(name, options);
    this.#module = options!.module ?? undefined;
  }
}

export interface PythonOutputSymbolOptions extends OutputSymbolOptions {
  module?: string;
  children?: Children;
}

export interface CreatePythonOutputSymbolOptions extends PythonOutputSymbolOptions {
  name: string;
}


export function createPythonSymbol(
  props: CreatePythonOutputSymbolOptions,
): PythonOutputSymbol {
  const binder = useBinder();
  const scope = useScope();
  const fileContext = useContext(SourceFileContext);
  const module = props.module ?? (fileContext ? fileContext.module : "");

  const sym = new PythonOutputSymbol(props.name, {
    binder: binder,
    scope: scope,
    refkeys: props.refkeys ?? refkey(props.name),
    module: module,
  });

  return sym;
}
