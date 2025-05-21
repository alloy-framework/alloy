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

function assignMembers(
  binder: Binder,
  ownerSym: TSOutputSymbol,
  members: NamedModuleDescriptor[],
  keys: Record<string, any>,
  isStatic: boolean,
) {
  const scope =
    isStatic ?
      (ownerSym.staticMemberScope ??= createTSMemberScope(
        binder,
        undefined,
        ownerSym,
        true,
      ))
    : (ownerSym.instanceMemberScope ??= createTSMemberScope(
        binder,
        undefined,
        ownerSym,
        false,
      ));

  const namespace = isStatic ? "static" : "instance";

  for (const member of members) {
    const memberObj = typeof member === "object" ? member : { name: member };

    // The refkey is located in the appropriate namespace
    const memberKey = keys[namespace][memberObj.name];
    if (!memberKey) continue; // Skip if key doesn't exist

    let memberFlags =
      isStatic ?
        OutputSymbolFlags.StaticMember
      : OutputSymbolFlags.InstanceMember;
    if (memberObj.staticMembers?.length) {
      memberFlags |= OutputSymbolFlags.StaticMemberContainer;
    }
    if (memberObj.instanceMembers?.length) {
      memberFlags |= OutputSymbolFlags.InstanceMemberContainer;
    }

    const memberSym = createTSSymbol({
      name: memberObj.name, // Note: name without namespace
      scope: scope as TSOutputScope,
      refkey: memberKey,
      export: false,
      default: false,
      flags: memberFlags,
    });

    scope.symbols.add(memberSym);

    // Recursively handle nested static and instance members
    if (memberObj.staticMembers && isStatic) {
      assignMembers(
        binder,
        memberSym,
        memberObj.staticMembers,
        keys[namespace][memberObj.name],
        true,
      );
    }
    if (memberObj.instanceMembers && !isStatic) {
      assignMembers(
        binder,
        memberSym,
        memberObj.instanceMembers,
        keys[namespace][memberObj.name],
        false,
      );
    }
  }
}

function createStaticMembers(
  binder: Binder,
  ownerSym: TSOutputSymbol,
  staticMembers: NamedModuleDescriptor[],
  keys: Record<string, any>,
) {
  assignMembers(binder, ownerSym, staticMembers, keys, true);
}

function createInstanceMembers(
  binder: Binder,
  ownerSym: TSOutputSymbol,
  instanceMembers: NamedModuleDescriptor[],
  keys: Record<string, any>,
) {
  assignMembers(binder, ownerSym, instanceMembers, keys, false);
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

export type NamedExportsFromDescriptors<
  T extends readonly NamedModuleDescriptor[],
> = {
  static: {
    [N in Extract<T[number], string>]: Refkey;
  } & {
    [N in Extract<T[number], { name: string }>["name"]]: Extract<
      T[number],
      { name: N }
    > extends (
      {
        staticMembers?: infer SM extends readonly NamedModuleDescriptor[];
      }
    ) ?
      NamedExportsFromDescriptors<SM>
    : {};
  };
  instance: {
    [N in Extract<T[number], string>]: Refkey;
  } & {
    [N in Extract<T[number], { name: string }>["name"]]: Extract<
      T[number],
      { name: N }
    > extends (
      {
        instanceMembers?: infer IM extends readonly NamedModuleDescriptor[];
      }
    ) ?
      NamedExportsFromDescriptors<IM>
    : {};
  };
};

export type NamedObjectExports<T extends ModuleSymbolsDescriptor> = {
  [N in Extract<
    T["named"] extends readonly (infer U)[] ? U : never,
    { name: string }
  >["name"]]: {
    static: Extract<
      Extract<T["named"] extends readonly (infer U)[] ? U : never, { name: N }>,
      { staticMembers?: readonly NamedModuleDescriptor[] }
    > extends (
      { staticMembers: infer SM extends readonly NamedModuleDescriptor[] }
    ) ?
      NamedExportsFromDescriptors<SM>["static"]
    : {};
    instance: Extract<
      Extract<T["named"] extends readonly (infer U)[] ? U : never, { name: N }>,
      { instanceMembers?: readonly NamedModuleDescriptor[] }
    > extends (
      { instanceMembers: infer IM extends readonly NamedModuleDescriptor[] }
    ) ?
      NamedExportsFromDescriptors<IM>["instance"]
    : {};
  } & Refkey;
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

      // Create the base refkey
      keys[namedObj.name] = refkey();

      // Create namespaces for static and instance
      if (namedObj.staticMembers?.length || namedObj.instanceMembers?.length) {
        keys[namedObj.name].static = {};
        keys[namedObj.name].instance = {};
      }

      // Process static members
      if (namedObj.staticMembers?.length) {
        for (const member of namedObj.staticMembers) {
          const memberObj =
            typeof member === "string" ? { name: member } : member;
          // Create the refkey for this static member
          keys[namedObj.name].static[memberObj.name] = refkey();

          // For nested static members, create nested structure
          if (memberObj.staticMembers?.length) {
            keys[namedObj.name].static[memberObj.name].static = {};

            // Process nested static members
            for (const nestedMember of memberObj.staticMembers) {
              const nestedObj =
                typeof nestedMember === "string" ?
                  { name: nestedMember }
                : nestedMember;
              keys[namedObj.name].static[memberObj.name].static[
                nestedObj.name
              ] = refkey();
            }
          }
        }
      }

      // Process instance members
      if (namedObj.instanceMembers?.length) {
        for (const member of namedObj.instanceMembers) {
          const memberObj =
            typeof member === "string" ? { name: member } : member;
          // Create the refkey for this instance member
          keys[namedObj.name].instance[memberObj.name] = refkey();
        }
      }

      // Attach symbol creator for binding
      keys[namedObj.name][getSymbolCreatorSymbol()] = (
        binder: Binder,
        parentSym: TSOutputSymbol,
      ) => {
        // Now that we've already created the refkeys structure, we can simply
        // use it to create the corresponding symbols in the binder
        if (namedObj.staticMembers?.length) {
          createStaticMembers(
            binder,
            parentSym,
            namedObj.staticMembers,
            keys[namedObj.name],
          );
        }
        if (namedObj.instanceMembers?.length) {
          createInstanceMembers(
            binder,
            parentSym,
            namedObj.instanceMembers,
            keys[namedObj.name],
          );
        }
      };
    }
  }

  return refkeys;
}
