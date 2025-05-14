import {
  Binder,
  getSymbolCreatorSymbol,
  Refkey,
  refkey,
  SymbolCreator,
} from "@alloy-js/core";
import {
  TSModuleScope,
  TSOutputSymbol,
  TSPackageScope,
} from "./symbols/index.js";

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
  refkeys: Record<string, any>,
) {
  const pkgScope = new TSPackageScope(
    props.name,
    props.version,
    `node_modules/${props.name}`,
    {
      binder,
      builtin: props.builtin,
    },
  );

  for (const [path, symbols] of Object.entries(props.descriptor)) {
    const keys = path === "." ? refkeys : refkeys[path];
    const moduleScope = new TSModuleScope(path, {
      binder,
      parent: pkgScope,
    });

    pkgScope.exportedSymbols.set(path, moduleScope);

    if (symbols.default) {
      const key = keys.default;
      const sym = new TSOutputSymbol(symbols.default, {
        scope: moduleScope,
        refkeys: key,
        export: true,
        default: true,
      });

      moduleScope.exportedSymbols.set(key, sym);
    }

    for (const exportedName of symbols.named ?? []) {
      const key = keys[exportedName];

      const sym = new TSOutputSymbol(exportedName, {
        binder,
        scope: moduleScope,
        refkeys: key,
        export: true,
        default: false,
      });
      moduleScope.exportedSymbols.set(key, sym);
    }
  }
}

export type PackageRefkeys<T extends PackageDescriptor> = {
  [K in keyof T as K extends "." ? never : K]: {
    [N in T[K]["named"] extends readonly string[] ? T[K]["named"][number]
    : never]: Refkey;
  } & (T[K] extends { default: string } ? { default: Refkey } : {});
} & (T["."] extends { default: string } ? { default: Refkey } : {}) &
  (T["."] extends { named: readonly string[] } ?
    { [N in T["."]["named"][number]]: Refkey }
  : {});

export interface CreatePackageProps<T extends PackageDescriptor> {
  name: string;
  version: string;
  descriptor: T;
  builtin?: boolean;
}
export function createPackage<const T extends PackageDescriptor>(
  props: CreatePackageProps<T>,
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
