import {
  type Binder,
  createScope,
  getSymbolCreatorSymbol,
  type Refkey,
  refkey,
  SymbolCreator,
} from "@alloy-js/core";
import { createPythonSymbol } from "./symbol-creation.js";
import { PythonModuleScope } from "./symbols/index.js";

export interface ModuleDescriptor {
  [path: string]: string[];
}

export interface CreateModuleProps<T extends ModuleDescriptor> {
  name: string;
  descriptor: T;
}

export type NamedMap<TDescriptor extends readonly string[]> = {
  [S in TDescriptor[number]]: Refkey;
};

export type ModuleRefkeys<PD extends Record<string, string[]>> = {
  [P in keyof PD]: NamedMap<PD[P]>;
};

function createSymbols(
  binder: Binder,
  props: CreateModuleProps<ModuleDescriptor>,
  refkeys: Record<string, any>,
) {
  // Create a module scope for each path in the descriptor
  for (const [path, symbols] of Object.entries(props.descriptor)) {
    // If the path is ".", we use the module name directly
    // Otherwise, we append the path to the module name
    const fullModuleScopeName = props.name + (path === "." ? "" : `.${path}`);
    const keys = refkeys[path];
    const moduleScope = createScope(
      PythonModuleScope,
      fullModuleScopeName,
      undefined,
      { binder },
    );

    // Create a symbol for each exported name
    for (const exportedName of symbols ?? []) {
      const key = keys[exportedName];

      const _ = createPythonSymbol(exportedName, {
        space: moduleScope.symbols,
        binder: binder,
        refkeys: key,
        module: moduleScope.name,
      });
    }
  }
}

// A module is a map of refkeys for each path in the descriptor.
// Each path maps to a set of named refkeys for the exported symbols.
// When one of the symbols is used, the relevant import will be added
// to the source file, and the symbol will be available in the output.
//
// Most of the use cases will be for templates and not for use in JSX,
// so the symbols will not be normally used directly in the code, but
// there may be cases where you want to use them directly.
//
// Example:
// ```ts
// const requestsLib = createModule({
//   name: "requests",
//   descriptor: {
//     ".": ["get", "post"],
//   },
// });
// ```
//
// For this scenario, if requestsLib["."].get is used, it will add
// the import `from requests import get` and would render the symbol
// as `get` in the output.
export function createModule<const T extends ModuleDescriptor>(
  props: CreateModuleProps<T>,
): ModuleRefkeys<T> & SymbolCreator {
  const refkeys: any = {
    [getSymbolCreatorSymbol()](binder: Binder) {
      createSymbols(binder, props, refkeys);
    },
  };

  for (const [path, symbols] of Object.entries(props.descriptor)) {
    const keys: Record<string, Refkey> = (refkeys[path] = {});
    for (const named of symbols ?? []) {
      keys[named] = refkey(props.descriptor, path, named);
    }
  }

  return refkeys;
}
