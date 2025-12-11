import {
  type Binder,
  getSymbolCreatorSymbol,
  OutputMemberSpace,
  type Refkey,
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
export type NamedModuleDescriptor =
  | string
  | {
      name: string;
      staticMembers?: Array<NamedModuleDescriptor>;
      instanceMembers?: Array<NamedModuleDescriptor>;
    };

/**
 * Describes the symbols exported by a module.
 */
export interface ModuleSymbolsDescriptor {
  default?: string;
  named?: NamedModuleDescriptor[];
}

/**
 * Props for creating a package with a specific name, version, and descriptor.
 */
export interface CreatePackageProps<T extends PackageDescriptor> {
  name: string;
  version: string;
  descriptor: T;
  builtin?: boolean;
}

/**
 * Infers the exported members of a module based on its descriptor.
 *
 * D - The module descriptor, which may specify a `default` export (as a string)
 *   and/or an array of named exports (`named`).
 *
 * If `D` includes a `default` property of type `string`, the resulting type will include a
 * `default` property of type `Refkey`. If `D` includes a `named` property (an array of
 * `NamedModuleDescriptor`), the resulting type will include the mapped named exports as
 * defined by `NamedMap`.
 */
export type ModuleExports<
  D extends { default?: string; named?: NamedModuleDescriptor[] },
> = (D extends { default: string } ? { default: Refkey } : {}) &
  (D["named"] extends NamedModuleDescriptor[] ? NamedMap<D["named"]> : {});

export type PackageRefkeys<
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

// NamedMap is a utility type that maps the named module descriptors
// to their corresponding Refkey types. It handles both string and object
// entries in the array of named module descriptors.
// It creates a mapping where:
// For each TDescriptor extends NamedModuleDescriptor[]:
//   • string entries ➜ { [s]: Refkey }
//   • object entries ➜ { [name]: Refkey & { static: …; instance: … } }
// ────────────────────────────────────────────────────────────────
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

function assignMembers(
  binder: Binder,
  ownerSym: TSOutputSymbol,
  members: NamedModuleDescriptor[],
  keys: Record<string, any>,
  isStatic: boolean,
) {
  let space: OutputMemberSpace;

  if (isStatic) {
    space = ownerSym.staticMembers!;
  } else {
    space = ownerSym.instanceMembers!;
  }

  const namespace = isStatic ? "static" : "instance";

  for (const member of members) {
    const memberObj = typeof member === "object" ? member : { name: member };

    // The refkey is located in the appropriate namespace
    const memberKey = keys[namespace][memberObj.name];
    if (!memberKey) continue; // Skip if key doesn't exist

    const memberSym = new TSOutputSymbol(memberObj.name, space, {
      binder,
      refkeys: memberKey,
      export: false,
      default: false,
    });

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

const packageScopeSymbol: unique symbol = Symbol();
/**
 * Retrieve the package scope associated with an external package created via
 * createPackage.
 */
export function getPackageScope(pgk: ExternalPackage) {
  return (pgk as any)[packageScopeSymbol];
}

function createSymbols(
  binder: Binder,
  props: CreatePackageProps<PackageDescriptor>,
  refkeys: Record<string | typeof packageScopeSymbol, any>,
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

  refkeys[packageScopeSymbol] = pkgScope;

  for (const [path, symbols] of Object.entries(props.descriptor)) {
    const keys = path === "." ? refkeys : refkeys[path];
    const moduleScope = new TSModuleScope(path, pkgScope, {
      binder,
    });

    pkgScope.exportedSymbols.set(path, moduleScope);

    if (symbols.default) {
      const key = keys.default;
      const sym = new TSOutputSymbol(symbols.default, moduleScope.values, {
        refkeys: key,
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
      const ownerSym = new TSOutputSymbol(namedRef.name, moduleScope.values, {
        binder,
        refkeys: key,
        export: true,
        default: false,
        hasInstanceMembers: !!namedRef.instanceMembers?.length,
      });
      moduleScope.exportedSymbols.set(key, ownerSym);

      assignMembers(
        binder,
        ownerSym,
        namedRef.staticMembers ?? [],
        keys[namedRef.name],
        /* isStatic */ true,
      );
      assignMembers(
        binder,
        ownerSym,
        namedRef.instanceMembers ?? [],
        keys[namedRef.name],
        /* isStatic */ false,
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

export interface ExternalPackage {
  [externalPackageSymbol]: true;
}

const externalPackageSymbol: unique symbol = Symbol("ExternalPackageSymbol");

export function createPackage<const T extends PackageDescriptor>(
  props: CreatePackageProps<T>,
): PackageRefkeys<T> & SymbolCreator & ExternalPackage {
  const refkeys: any = {
    [getSymbolCreatorSymbol()](binder: Binder) {
      createSymbols(binder, props, refkeys);
    },
    [externalPackageSymbol]: true,
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
