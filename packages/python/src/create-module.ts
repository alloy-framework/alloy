// Declare libraries (dependencies) that you are adding to the project.
// Allows discovery of symbols from these libraries for use in the program

import {
  type Binder,
  getSymbolCreatorSymbol,
  type Refkey,
  refkey,
  SymbolCreator,
} from "@alloy-js/core";
import { PythonOutputSymbol, ref } from "./symbols/index.js";
import { createPythonModuleScope } from "./symbols/python-module-scope.js";

export interface ModuleDescriptor {
  [path: string]: ModuleSymbolsDescriptor;
}

export type NamedModuleDescriptor =
  | string
  | {
      name: string;
    };

export interface ModuleSymbolsDescriptor {
  default?: string;
  named?: NamedModuleDescriptor[];
}

export interface CreateModuleProps<T extends ModuleDescriptor> {
  name: string;
  version: string;
  descriptor: T;
  builtin?: boolean;
}

export type ModuleExports<
  D extends { default?: string; named?: NamedModuleDescriptor[] },
> = (D extends { default: string } ? { default: Refkey } : {}) &
  (D["named"] extends NamedModuleDescriptor[] ? NamedMap<D["named"]> : {});

export type ModuleRefkeys<
  PD extends Record<
    string,
    { default?: string; named?: NamedModuleDescriptor[] }
  >,
  // “Root” module descriptor at key `"."` becomes the “flat” exports on mcpSdk.*
> = ModuleExports<PD["."]> & {
  // Every other module-path (e.g. "./foo/bar.js") lives under its own index:
  //    mcpSdk["./foo/bar.js"].<exports>
  [P in keyof PD as P extends "." ? never : P]: ModuleExports<PD[P]>;
};

export type NamedMap<TDescriptor extends readonly NamedModuleDescriptor[]> =
  // plain-string exports
  {
    [S in Extract<TDescriptor[number], string>]: Refkey;
  } & {
    // object exports, each one is BOTH a Refkey _and_ has .static/.instance
    [O in Extract<
      TDescriptor[number],
      { name: string }
    > as O["name"]]: Refkey & {
      static: O extends (
        { staticMembers: infer SM extends NamedModuleDescriptor[] }
      ) ?
        NamedMap<SM>
      : {};
      instance: O extends (
        { instanceMembers: infer IM extends NamedModuleDescriptor[] }
      ) ?
        NamedMap<IM>
      : {};
    };
  };

function createSymbols(
  binder: Binder,
  props: CreateModuleProps<ModuleDescriptor>,
  refkeys: Record<string, any>,
) {
  for (const [path, symbols] of Object.entries(props.descriptor)) {
    const keys = path === "." ? refkeys : refkeys[path];
    const moduleScope = createPythonModuleScope(path, undefined, binder);

    for (const exportedName of symbols.named ?? []) {
      const namedRef =
        typeof exportedName === "string" ?
          { name: exportedName }
        : exportedName;
      const key = keys[namedRef.name];
      const _ownerSym = new PythonOutputSymbol(namedRef.name, {
        scope: moduleScope,
        refkeys: key,
        module: moduleScope.name,
      });
    }
  }
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
    const keys = path === "." ? refkeys : (refkeys[path] = {});
    for (const named of symbols.named ?? []) {
      const namedObj = typeof named === "string" ? { name: named } : named;
      keys[namedObj.name] = refkey(props.descriptor, path, namedObj);
    }
  }

  return refkeys;
}
