import {
  Children,
  OutputSymbol,
  refkey,
  Refkey,
  useBinder,
  useContext,
  useScope,
} from "@alloy-js/core";
import { SourceFileContext } from "../components/SourceFile.js";

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
  const fileContext = useContext(SourceFileContext);
  const module = props.module ?? (fileContext ? fileContext.module : "");

  const sym = binder.createSymbol<PythonOutputSymbol>({
    name: props.name,
    scope,
    refkey: props.refKey ?? refkey(props.name),
    module: module,
  });
  return sym;
}
