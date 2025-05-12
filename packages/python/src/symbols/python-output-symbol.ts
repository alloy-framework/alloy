import {
  Children,
  OutputSymbol,
  refkey,
  Refkey,
  useBinder,
  useScope,
} from "@alloy-js/core";

/**
 * Represents an 'exported' symbol from a .py file. Class, enum, interface etc.
 */
export interface PythonOutputSymbol extends OutputSymbol {
  // The module in which the symbol is defined
  module?: string;
}

export interface createPythonSymbolProps {
  name: string;
  module?: string;
  refKey?: Refkey | Refkey[];
  children?: Children;
}

export function createPythonSymbol(
  props: createPythonSymbolProps,
): PythonOutputSymbol {
  const binder = useBinder();
  const scope = useScope();

  const sym = binder.createSymbol<PythonOutputSymbol>({
    name: props.name,
    scope,
    refkey: props.refKey ?? refkey(props.name),
    module: props.module ? props.module : "", //TODO: Write a ModuleComponent to handle this
  });
  return sym;
}
