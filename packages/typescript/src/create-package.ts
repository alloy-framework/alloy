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
  | { name: string; staticMembers?: Array<NamedModuleDescriptor> };

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
  staticMembers: NamedModuleDescriptor[],
  keys: any,
  namespaceName: string,
) {
  const namespaceScope = createTSMemberScope(binder, undefined, namespaceSym);
  for (const staticMember of staticMembers) {
    const memberName =
      typeof staticMember === "string" ? staticMember : staticMember.name;
    const staticKey = keys[namespaceName][memberName];
    const nestedSym = createTSSymbol({
      name: memberName,
      scope: namespaceScope,
      refkey: staticKey,
      export: false,
      default: false,
      flags: OutputSymbolFlags.StaticMember,
    });

    // recursively handle nested static members
    if (typeof staticMember === "object" && staticMember.staticMembers) {
      createStaticMembers(
        binder,
        nestedSym,
        staticMember.staticMembers,
        keys[namespaceName],
        memberName,
      );
    }
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

// Recursive helper type to extract named exports as objects with static members
type NamedObjectExports<T extends ModuleSymbolsDescriptor> = {
  [N in Extract<
    T["named"] extends readonly any[] ? T["named"][number] : never,
    { name: string }
  >["name"]]: Refkey &
    (Extract<
      T["named"] extends readonly any[] ?
        Extract<T["named"][number], { name: N; staticMembers: any }>
      : never,
      { staticMembers: readonly any[] }
    > extends (
      { staticMembers: infer SM extends readonly NamedModuleDescriptor[] }
    ) ?
      NamedExportsFromDescriptors<SM>
    : {});
};

// Helper type to recursively extract exports from descriptors
type NamedExportsFromDescriptors<T extends readonly NamedModuleDescriptor[]> = {
  [N in Extract<T[number], string>]: Refkey;
} & {
  [N in Extract<T[number], { name: string }>["name"]]: Refkey &
    (Extract<
      T[number],
      { name: N; staticMembers?: readonly NamedModuleDescriptor[] }
    > extends (
      { staticMembers: infer SM extends readonly NamedModuleDescriptor[] }
    ) ?
      NamedExportsFromDescriptors<SM>
    : {});
};

// Helper type to extract named exports as strings
type NamedStringExports<T extends ModuleSymbolsDescriptor> = {
  [N in Extract<
    T["named"] extends readonly any[] ? T["named"][number] : never,
    string
  >]: Refkey;
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
        keys[name] = refkey(props.descriptor, path, name);
        if (staticMembers) {
          keys[name] = {
            ...keys[name],
            ...createStaticMemberKeys(
              props.descriptor,
              path,
              name,
              staticMembers,
            ),
          };
        }
      } else {
        keys[named] = refkey(props.descriptor, path, named);
      }
    }
  }

  return refkeys;
}

// Helper function to recursively create static member keys
function createStaticMemberKeys(
  descriptor: PackageDescriptor,
  path: string,
  parentName: string,
  staticMembers: NamedModuleDescriptor[],
): Record<string, any> {
  const result: Record<string, any> = {};
  for (const member of staticMembers) {
    if (typeof member === "string") {
      result[member] = refkey(descriptor, path, `${parentName}.${member}`);
    } else {
      result[member.name] = refkey(
        descriptor,
        path,
        `${parentName}.${member.name}`,
      );
      if (member.staticMembers) {
        result[member.name] = {
          ...result[member.name],
          ...createStaticMemberKeys(
            descriptor,
            path,
            `${parentName}.${member.name}`,
            member.staticMembers,
          ),
        };
      }
    }
  }
  return result;
}
