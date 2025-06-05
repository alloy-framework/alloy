// Declare libraries (dependencies) that you are adding to the project.
// Allows discovery of symbols from these libraries for use in the program

import {
  Binder,
  getSymbolCreatorSymbol,
  Refkey,
  refkey,
  SymbolCreator,
} from "@alloy-js/core";
import { PythonOutputSymbol } from "./symbols/index.js";
import { createPythonModuleScope } from "./symbols/python-module-scope.js";

export interface ModuleDescriptor {
  [path: string]: ModuleSymbolsDescriptor;
}

export interface ModuleSymbolsDescriptor {
  default?: string;
  named?: readonly string[];
}

function createSymbols(
  binder: Binder,
  props: CreateModuleProps<ModuleDescriptor>,
  refkeys: Record<string, any>,
) {
  for (const [path, symbols] of Object.entries(props.descriptor)) {
    const keys = path === "." ? refkeys : refkeys[path];
    const moduleScope = createPythonModuleScope(binder, undefined, path);

    for (const exportedName of symbols.named ?? []) {
      const key = keys[exportedName];
      const _sym = binder.createSymbol<PythonOutputSymbol>({
        name: exportedName,
        scope: moduleScope,
        refkey: key,
        module: moduleScope.name,
      });
    }
  }
}

export type ModuleRefkeys<T extends ModuleDescriptor> = {
  [K in keyof T as K extends "." ? never : K]: {
    [N in T[K]["named"] extends readonly string[] ? T[K]["named"][number]
    : never]: Refkey;
  } & (T[K] extends { default: string } ? { default: Refkey } : {});
} & (T["."] extends { default: string } ? { default: Refkey } : {}) &
  (T["."] extends { named: readonly string[] } ?
    { [N in T["."]["named"][number]]: Refkey }
  : {});

export interface CreateModuleProps<T extends ModuleDescriptor> {
  name: string;
  version: string;
  descriptor: T;
  builtin?: boolean;
}

export function createModule<const T extends ModuleDescriptor>(
  props: CreateModuleProps<T>,
): ModuleRefkeys<T> & SymbolCreator {
  const refkeys: any = {
    [getSymbolCreatorSymbol()](binder: Binder) {
      createSymbols(binder, props, refkeys);
    },
  };

  for (const [path, symbols] of Object.entries(props.descriptor)) {
    const keys = path === "." ? refkeys : ((refkeys[path] = {}), refkeys[path]);
    for (const named of symbols.named ?? []) {
      keys[named] = refkey(props.descriptor, path, named);
    }
  }

  return refkeys;
}
