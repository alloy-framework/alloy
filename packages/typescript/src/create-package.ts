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
  TSOutputScope,
  TSOutputSymbol,
} from "./symbols/index.js";

export interface PackageDescriptor {
  [path: string]: ModuleSymbolsDescriptor;
}

/**
 * Describes the structure of a module descriptor.
 *
 * A module descriptor can either be a string (representing the module name)
 * or an object with the following properties:
 * - `name`: The name of the module.
 * - `staticMembers`: An optional array of named module descriptors representing
 *   static members of the module.
 * - `instanceMembers`: An optional array of named module descriptors representing
 *  instance members of the module.
 */
type NamedModuleDescriptor =
  | string
  | {
      name: string;
      staticMembers?: Array<NamedModuleDescriptor>;
      instanceMembers?: Array<NamedModuleDescriptor>;
    };

/**
 * Describes the symbols exported by a module.
 */
interface ModuleSymbolsDescriptor {
  default?: string;
  named?: NamedModuleDescriptor[];
}

export interface CreatePackageProps<T extends PackageDescriptor> {
  name: string;
  version: string;
  descriptor: T;
  builtin?: boolean;
}

export type ModuleExports<
  D extends { default?: string; named?: NamedModuleDescriptor[] },
> = (D extends { default: string } ? { default: Refkey } : {}) &
  (D["named"] extends NamedModuleDescriptor[] ? NamedMap<D["named"]> : {});

export type PackageRefkeys<
  PD extends Record<
    string,
    { default?: string; named?: NamedModuleDescriptor[] }
  >,
> = { [P in keyof PD]: ModuleExports<PD[P]> };

// NamedMap is a utility type that maps the named module descriptors
// to their corresponding Refkey types. It handles both string and object
// entries in the array of named module descriptors.
// It creates a mapping where:
// For each L extends NamedModuleDescriptor[]:
//   • string entries ➜ { [s]: Refkey }
//   • object entries ➜ { [name]: Refkey & { static: …; instance: … } }
// ────────────────────────────────────────────────────────────────
type NamedMap<L extends readonly NamedModuleDescriptor[]> =
  // plain-string exports
  {
    [S in Extract<L[number], string>]: Refkey;
  } & {
    // object exports, each one is BOTH a Refkey _and_ has .static/.instance
    [O in Extract<L[number], { name: string }> as O["name"]]: Refkey & {
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
      const key = keys[namedRef.name];

      let flags = OutputSymbolFlags.None;
      if (namedRef.staticMembers?.length) {
        flags |= OutputSymbolFlags.StaticMemberContainer;
      }
      if (namedRef.instanceMembers?.length) {
        flags |= OutputSymbolFlags.InstanceMemberContainer;
      }

      const ownerSym = createTSSymbol({
        binder,
        name: namedRef.name,
        scope: moduleScope,
        refkey: key,
        export: true,
        default: false,
        flags,
      });
      moduleScope.exportedSymbols.set(key, ownerSym);

      createStaticMembers(
        binder,
        ownerSym,
        namedRef.staticMembers ?? [],
        keys[namedRef.name],
      );
      createInstanceMembers(
        binder,
        ownerSym,
        namedRef.instanceMembers ?? [],
        keys[namedRef.name],
      );
    }
  }
}

function createRefkeysForMembers(
  members: NamedModuleDescriptor[],
  keys: Record<string, any>,
  namespace: "static" | "instance",
) {
  keys[namespace] ??= {};

  for (const member of members) {
    const memberObj = typeof member === "string" ? { name: member } : member;
    const memberKey = refkey();
    keys[namespace][memberObj.name] = memberKey;

    if (memberObj.staticMembers?.length) {
      createRefkeysForMembers(memberObj.staticMembers, memberKey, "static");
    }
    if (memberObj.instanceMembers?.length) {
      createRefkeysForMembers(memberObj.instanceMembers, memberKey, "instance");
    }
  }
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
    const keys = path === "." ? refkeys : (refkeys[path] = {});

    if (symbols.default) {
      keys.default = refkey(props.descriptor, path, "default");
    }

    for (const named of symbols.named ?? []) {
      const namedObj = typeof named === "string" ? { name: named } : named;
      keys[namedObj.name] = refkey();

      if (namedObj.staticMembers?.length) {
        createRefkeysForMembers(
          namedObj.staticMembers,
          keys[namedObj.name],
          "static",
        );
      }

      if (namedObj.instanceMembers?.length) {
        createRefkeysForMembers(
          namedObj.instanceMembers,
          keys[namedObj.name],
          "instance",
        );
      }

      keys[namedObj.name][getSymbolCreatorSymbol()] = (
        binder: Binder,
        parentSym: TSOutputSymbol,
      ) => {
        if (namedObj.staticMembers?.length) {
          assignMembers(
            binder,
            parentSym,
            namedObj.staticMembers,
            keys[namedObj.name],
            true,
          );
        }
        if (namedObj.instanceMembers?.length) {
          assignMembers(
            binder,
            parentSym,
            namedObj.instanceMembers,
            keys[namedObj.name],
            false,
          );
        }
      };
    }
  }

  return refkeys;
}
