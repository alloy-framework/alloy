import {
  Binder,
  getSymbolCreatorSymbol,
  OutputSymbolFlags,
  Refkey,
  refkey,
  SymbolCreator,
} from "@alloy-js/core";

import {
  createTSMemberScope,
  createTSModuleScope,
  createTSPackageScope,
  createTSSymbol,
} from "./symbols/index.js";

export interface PackageDescriptor {
  [path: string]: ModuleSymbolsDescriptor;
}

export type NamedModuleDescriptor =
  | string
  | { name: string; staticMembers?: Array<string> }; // TODO: array of strings sufficient?

export interface ModuleSymbolsDescriptor {
  default?: string;
  named?: readonly NamedModuleDescriptor[];
}

function createNamedSymbol(
  binder: Binder,
  moduleScope: any,
  name: string,
  key: Refkey,
  flags?: OutputSymbolFlags,
) {
  const sym = createTSSymbol({
    name,
    scope: moduleScope,
    refkey: key,
    export: true,
    default: false,
    flags,
  });
  moduleScope.exportedSymbols.set(key, sym);
  return sym;
}

function createStaticMembers(
  binder: Binder,
  namespaceSym: any,
  staticMembers: string[],
  keys: any,
  namespaceName: string,
) {
  const namespaceScope = createTSMemberScope(binder, undefined, namespaceSym);
  for (const staticMember of staticMembers) {
    const staticKey = keys[namespaceName][staticMember];
    createTSSymbol({
      name: staticMember,
      scope: namespaceScope,
      refkey: staticKey,
      export: false,
      default: false,
      flags: OutputSymbolFlags.StaticMember,
    });
  }
}

function createSymbols(
  binder: Binder,
  props: CreatePackageProps<PackageDescriptor>,
  refkeys: Record<string, any>,
) {
  const pkgScope = createTSPackageScope(
    binder,
    undefined,
    props.name,
    props.version,
    `node_modules/${props.name}`,
    props.builtin,
  );
  for (const [path, symbols] of Object.entries(props.descriptor)) {
    const keys = path === "." ? refkeys : refkeys[path];
    const moduleScope = createTSModuleScope(binder, pkgScope, path);

    pkgScope.exportedSymbols.set(path, moduleScope);

    if (symbols.default) {
      const key = keys.default;
      const sym = createTSSymbol({
        name: symbols.default,
        scope: moduleScope,
        refkey: key,
        export: true,
        default: true,
      });

      moduleScope.exportedSymbols.set(key, sym);
    }

    for (const exportedName of symbols.named ?? []) {
      if (typeof exportedName === "object") {
        const { name, staticMembers } = exportedName;
        const key = keys[name];
        const namespaceSym = createNamedSymbol(
          binder,
          moduleScope,
          name,
          key,
          OutputSymbolFlags.StaticMemberContainer,
        );

        createStaticMembers(
          binder,
          namespaceSym,
          staticMembers ?? [],
          keys,
          name,
        );
      } else {
        const key = keys[exportedName];
        createNamedSymbol(binder, moduleScope, exportedName, key);
      }
    }
  }
}

// TODO: simplify this crazy type?
// Helper type to extract named exports as strings
type NamedStringExports<T extends ModuleSymbolsDescriptor> = {
  [N in Extract<
    T["named"] extends readonly any[] ? T["named"][number] : never,
    string
  >]: Refkey;
};

// Helper type to extract named exports as objects with static members
type NamedObjectExports<T extends ModuleSymbolsDescriptor> = {
  [N in Extract<
    T["named"] extends readonly any[] ? T["named"][number] : never,
    { name: string }
  >["name"]]: Refkey & {
    [SM in Extract<
      T["named"] extends readonly any[] ?
        Extract<T["named"][number], { name: N; staticMembers: any }>
      : never,
      { staticMembers: readonly string[] }
    >["staticMembers"][number]]: Refkey;
  };
};

// Helper type to handle default exports
type DefaultExport<T extends ModuleSymbolsDescriptor> =
  T extends { default: string } ? { default: Refkey } : {};

// Combine all exports for a module
type ModuleExports<T extends ModuleSymbolsDescriptor> = NamedStringExports<T> &
  NamedObjectExports<T> &
  DefaultExport<T>;

// Main simplified type
export type PackageRefkeys<T extends PackageDescriptor> = {
  [K in keyof T as K extends "." ? never : K]: ModuleExports<T[K]>;
} & ModuleExports<T["."]>;

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
      if (typeof named === "object") {
        const { name, staticMembers } = named;
        // Create the base key for the named export
        keys[name] = refkey(props.descriptor, path, name);

        // Create keys for each static member
        for (const staticMember of staticMembers ?? []) {
          // Set the static member key
          keys[name] ??= {};
          keys[name][staticMember] = refkey(`${keys[name]}.${staticMember}`);
        }
      } else {
        // Handle string named exports
        keys[named] = refkey(props.descriptor, path, named);
      }
    }
  }

  return refkeys;
}
