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
  TSModuleScope,
  TSOutputScope,
  TSOutputSymbol,
} from "./symbols/index.js";

export interface PackageDescriptor {
  [path: string]: ModuleSymbolsDescriptor;
}

export type NamedModuleDescriptor =
  | string
  | {
      name: string;
      staticMembers?: Array<NamedModuleDescriptor>;
      instanceMembers?: Array<NamedModuleDescriptor>;
    };

export interface ModuleSymbolsDescriptor {
  default?: string;
  named?: readonly NamedModuleDescriptor[];
}

function createNamedSymbol(
  binder: Binder,
  moduleScope: TSModuleScope,
  name: string,
  key: Refkey,
  flags?: OutputSymbolFlags,
) {
  const sym = createTSSymbol({
    binder,
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
  ownerSym: TSOutputSymbol,
  staticMembers: NamedModuleDescriptor[],
  keys: Record<string, any>,
) {
  const memberScope = createTSMemberScope(binder, undefined, ownerSym);

  for (const member of staticMembers) {
    const memberObj = typeof member === "object" ? member : { name: member };

    console.log("creating static member", memberObj);
    // Create a refkey directly if it doesn't exist yet
    keys[memberObj.name] ??= refkey();

    let memberFlags = OutputSymbolFlags.StaticMember;
    if (memberObj.staticMembers?.length) {
      memberFlags |= OutputSymbolFlags.StaticMemberContainer;
    }

    if (memberObj.instanceMembers?.length) {
      memberFlags |= OutputSymbolFlags.InstanceMemberContainer;
    }

    const memberSym = createTSSymbol({
      name: memberObj.name,
      scope: memberScope,
      binder,
      refkey: keys[memberObj.name],
      export: false,
      default: false,
      flags: memberFlags,
    });
    memberScope.symbols.forEach((s) => {
      console.log("member scope", s.name);
    });
    memberScope.symbols.add(memberSym);
    console.log("created static member", memberSym);

    // Handle static members of the current member
    createStaticMembers(
      binder,
      memberSym,
      memberObj.staticMembers ?? [],
      keys[memberObj.name],
    );

    createInstanceMembers(
      binder,
      memberSym,
      memberObj.instanceMembers ?? [],
      keys[memberObj.name],
    );
  }
}

function createInstanceMembers(
  binder: Binder,
  ownerSym: TSOutputSymbol,
  instanceMembers: NamedModuleDescriptor[],
  keys: Record<string, any>,
) {
  ownerSym.instanceMemberScope ??= createTSMemberScope(
    binder,
    undefined,
    ownerSym,
  );

  for (const member of instanceMembers) {
    const memberObj = typeof member === "object" ? member : { name: member };
    console.log("creating instance member", memberObj);

    // Create a refkey directly if it doesn't exist yet
    if (!keys[memberObj.name]) {
      keys[memberObj.name] = refkey();
    }

    let memberFlags = OutputSymbolFlags.InstanceMember;
    if (memberObj.instanceMembers?.length) {
      memberFlags |= OutputSymbolFlags.InstanceMemberContainer;
    }
    if (memberObj.staticMembers?.length) {
      memberFlags |= OutputSymbolFlags.StaticMemberContainer;
    }

    const memberSym = createTSSymbol({
      name: memberObj.name,
      scope: ownerSym.instanceMemberScope as TSOutputScope,
      refkey: keys[memberObj.name],
      export: false,
      default: false,
      flags: memberFlags,
    });

    ownerSym.instanceMemberScope.symbols.add(memberSym);
    console.log("created instance member", memberSym);

    // Recursively handle nested static members
    createStaticMembers(
      binder,
      memberSym,
      memberObj.staticMembers ?? [],
      keys[memberObj.name],
    );
    // Recursively handle nested instance members
    createInstanceMembers(
      binder,
      memberSym,
      memberObj.instanceMembers ?? [],
      keys[memberObj.name],
    );
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
      const namedRef =
        typeof exportedName === "string" ?
          { name: exportedName }
        : exportedName;
      const { name, staticMembers, instanceMembers } = namedRef;
      const key = keys[name];

      let flags = OutputSymbolFlags.None;
      if (staticMembers?.length) {
        flags |= OutputSymbolFlags.StaticMemberContainer;
      }
      if (instanceMembers?.length) {
        flags |= OutputSymbolFlags.InstanceMemberContainer;
      }

      const ownerSym = createNamedSymbol(binder, moduleScope, name, key, flags);
      createStaticMembers(binder, ownerSym, staticMembers ?? [], keys[name]);
      createInstanceMembers(
        binder,
        ownerSym,
        instanceMembers ?? [],
        keys[name],
      );
    }
  }
}

// Recursive helper type to extract named exports as objects
// with nested static AND instance members
export type NamedObjectExports<T extends ModuleSymbolsDescriptor> = {
  [N in Extract<
    T["named"] extends readonly any[] ? T["named"][number] : never,
    { name: string }
  >["name"]]: Refkey &
    // ── staticMembers recursion ────────────────────────────────
    (Extract<
      T["named"] extends readonly any[] ?
        Extract<T["named"][number], { name: N; staticMembers: any }>
      : never,
      { staticMembers: readonly any[] }
    > extends (
      {
        staticMembers: infer SM extends readonly NamedModuleDescriptor[];
      }
    ) ?
      NamedExportsFromDescriptors<SM>
    : {}) &
    // ── instanceMembers recursion ──────────────────────────────
    (Extract<
      T["named"] extends readonly any[] ?
        Extract<T["named"][number], { name: N; instanceMembers: any }>
      : never,
      { instanceMembers: readonly any[] }
    > extends (
      {
        instanceMembers: infer IM extends readonly NamedModuleDescriptor[];
      }
    ) ?
      NamedExportsFromDescriptors<IM>
    : {});
};

// Helper type to recursively extract exports from descriptors
export type NamedExportsFromDescriptors<
  T extends readonly NamedModuleDescriptor[],
> = {
  // plain string members
  [N in Extract<T[number], string>]: Refkey;
} & {
  // object members – recurse for both static & instance trees
  [N in Extract<T[number], { name: string }>["name"]]: Refkey &
    (Extract<
      T[number],
      { name: N; staticMembers?: readonly NamedModuleDescriptor[] }
    > extends (
      {
        staticMembers: infer SM extends readonly NamedModuleDescriptor[];
      }
    ) ?
      NamedExportsFromDescriptors<SM>
    : {}) &
    (Extract<
      T[number],
      { name: N; instanceMembers?: readonly NamedModuleDescriptor[] }
    > extends (
      {
        instanceMembers: infer IM extends readonly NamedModuleDescriptor[];
      }
    ) ?
      NamedExportsFromDescriptors<IM>
    : {});
};

// Helper type to extract named exports as strings
export type NamedStringExports<T extends ModuleSymbolsDescriptor> = {
  [N in Extract<
    T["named"] extends readonly any[] ? T["named"][number] : never,
    string
  >]: Refkey;
};

// Helper type to handle default exports
export type DefaultExport<T extends ModuleSymbolsDescriptor> =
  T extends { default: string } ? { default: Refkey } : {};

// Combine all exports for a module
export type ModuleExports<T extends ModuleSymbolsDescriptor> =
  NamedStringExports<T> & NamedObjectExports<T> & DefaultExport<T>;

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
      const namedObj = typeof named === "string" ? { name: named } : named;

      keys[namedObj.name] = refkey();

      // Directly attach symbol creator without initializing nested keys
      keys[namedObj.name][getSymbolCreatorSymbol()] = (
        binder: Binder,
        parentSym: TSOutputSymbol,
      ) => {
        createStaticMembers(
          binder,
          parentSym,
          namedObj.staticMembers ?? [],
          keys[namedObj.name],
        );
        createInstanceMembers(
          binder,
          parentSym,
          namedObj.instanceMembers ?? [],
          keys[namedObj.name],
        );
      };
    }
  }

  console.log("all my refkeys", refkeys);
  return refkeys;
}
