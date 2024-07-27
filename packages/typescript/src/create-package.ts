import {
  Binder,
  reactive,
  Refkey,
  SymbolCreator,
  getSymbolCreatorSymbol,
  refkey,
} from "@alloy-js/core";
import { createTSPackageScope } from "./components/PackageDirectory.jsx";
import { TSModuleScope, TSOutputSymbol } from "./symbols.js";

export interface PackageDescriptor {
  [path: string]: ModuleSymbolsDescriptor;
}

export interface ModuleSymbolsDescriptor {
  default?: string;
  named?: readonly string[];
}

function createSymbols(
  binder: Binder,
  props: CreatePackageProps<PackageDescriptor>,
  refkeys: Record<string, any>
) {
  const pkgScope = createTSPackageScope(
    binder,
    undefined,
    props.name,
    props.version,
    `node_modules/${props.name}`,
    props.builtin
  );
  for (const [path, symbols] of Object.entries(props.descriptor)) {
    const keys = path === "." ? refkeys : refkeys[path];
    const moduleScope = binder.createScope<TSModuleScope>(
      "module",
      path,
      pkgScope,
      {
        exportedSymbols: reactive(new Map()),
      }
    );

    pkgScope.exportedSymbols.set(path, moduleScope);

    if (symbols.default) {
      const key = keys.default;
      const sym = binder.createSymbol<TSOutputSymbol>(
        symbols.default,
        moduleScope,
        key,
        {
          export: true,
          default: true,
        }
      );
      moduleScope.exportedSymbols.set(key, sym);
    }

    for (const exportedName of symbols.named ?? []) {
      const key = keys[exportedName];
      const sym = binder.createSymbol<TSOutputSymbol>(
        exportedName,
        moduleScope,
        key,
        {
          export: true,
          default: false,
        }
      );
      moduleScope.exportedSymbols.set(key, sym);
    }
  }
}

type PackageRefkeys<T extends PackageDescriptor> = {
  [K in keyof T as K extends "." ? never : K]: {
    [N in T[K]["named"] extends readonly string[]
      ? T[K]["named"][number]
      : never]: Refkey;
  } & (T[K] extends { default: string } ? { default: Refkey } : {});
} & (T["."] extends { default: string } ? { default: Refkey } : {}) &
  (T["."] extends { named: readonly string[] }
    ? { [N in T["."]["named"][number]]: Refkey }
    : {});

interface CreatePackageProps<T extends PackageDescriptor> {
  name: string;
  version: string;
  descriptor: T;
  builtin?: boolean;
}
export function createPackage<const T extends PackageDescriptor>(
  props: CreatePackageProps<T>
): PackageRefkeys<T> & SymbolCreator {
  const refkeys: any = {
    [getSymbolCreatorSymbol()](binder: Binder) {
      createSymbols(binder, props, refkeys);
    },
  };

  for (const [path, symbols] of Object.entries(props.descriptor)) {
    const keys = path === "." ? refkeys : ((refkeys[path] = {}), refkeys[path]);

    if (symbols.default) {
      keys.default = refkey(props.descriptor, path, "default");
    }

    for (const named of symbols.named ?? []) {
      keys[named] = refkey(props.descriptor, path, named);
    }
  }

  return refkeys;
}
