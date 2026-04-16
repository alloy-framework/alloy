import {
  type Binder,
  createScope,
  createSymbol,
  getSymbolCreatorSymbol,
  REFKEYABLE,
  type Refkey,
  type RefkeyableObject,
  refkey,
  SymbolCreator,
} from "@alloy-js/core";
import { RustCrateScope, RustModuleScope } from "./scopes/index.js";
import {
  FunctionSymbol,
  NamedTypeSymbol,
  RustOutputSymbol,
  type RustSymbolKind,
} from "./symbols/index.js";

export interface MemberDescriptor {
  kind: RustSymbolKind;
  name?: string;
  /** True for associated functions (no self receiver, called with `::`). */
  associated?: boolean;
  metadata?: Record<string, unknown>;
}

export interface SymbolDescriptor {
  kind: RustSymbolKind;
  name?: string;
  metadata?: Record<string, unknown>;
  members?: Record<string, MemberDescriptor>;
}

export interface CrateDescriptor<
  TModules extends Record<string, Record<string, SymbolDescriptor>> = Record<
    string,
    Record<string, SymbolDescriptor>
  >,
> {
  name: string;
  version?: string;
  builtin?: boolean;
  modules: TModules;
}

type SymbolRef<TSymbol extends SymbolDescriptor> =
  TSymbol extends { members: infer M extends Record<string, MemberDescriptor> }
    ? RefkeyableObject & { [K in keyof M]: Refkey }
    : Refkey;

export type CrateRef<TDescriptor extends CrateDescriptor = CrateDescriptor> = {
  [P in keyof TDescriptor["modules"]]: {
    [S in keyof TDescriptor["modules"][P]]: SymbolRef<
      TDescriptor["modules"][P][S]
    >;
  };
};

const crateFactoryStateSymbol: unique symbol = Symbol(
  "RustCreateCrateFactoryState",
);

interface CrateFactoryState {
  name: string;
  version?: string;
  builtin: boolean;
  scopes: WeakMap<Binder, RustCrateScope>;
}

export interface ExternalCrate {
  [crateFactoryStateSymbol]: unknown;
}

export function getCrateInfo(crate: ExternalCrate) {
  const state = getFactoryState(crate);
  return {
    name: state.name,
    version: state.version,
  };
}

export function getCrateScope(crate: ExternalCrate, binder: Binder) {
  return getFactoryState(crate).scopes.get(binder);
}

export function isBuiltinCrate(crate: ExternalCrate | RustCrateScope) {
  if (crate instanceof RustCrateScope) {
    return crate.builtin;
  }

  return getFactoryState(crate).builtin;
}

interface DescriptorEntry {
  modulePath: string;
  exportName: string;
  descriptor: SymbolDescriptor;
  symbolRefkey: Refkey;
  modules: object; // reference to descriptor.modules for stable refkey derivation
}

interface BinderState {
  crateScope: RustCrateScope;
  moduleScopes: Map<string, RustModuleScope>;
  createdSymbols: Map<Refkey, RustOutputSymbol>;
}

export function createCrate<
  const TModules extends Record<string, Record<string, SymbolDescriptor>>,
>(
  descriptor: CrateDescriptor<TModules>,
): CrateRef<CrateDescriptor<TModules>> & SymbolCreator & ExternalCrate {
  const binderStates = new WeakMap<Binder, BinderState>();
  const entries: DescriptorEntry[] = [];
  const crateFactoryState: CrateFactoryState = {
    name: descriptor.name,
    version: descriptor.version,
    builtin: descriptor.builtin ?? false,
    scopes: new WeakMap<Binder, RustCrateScope>(),
  };

  const crateRef = {
    [getSymbolCreatorSymbol()](binder: Binder) {
      const state = mapGet(binderStates, binder, () =>
        createBinderState(binder, descriptor, crateFactoryState),
      );

      for (const entry of entries) {
        if (state.createdSymbols.has(entry.symbolRefkey)) {
          continue;
        }

        const moduleScope = ensureModuleScope(
          state,
          entry.modulePath,
          descriptor.name,
        );
        const symbol = createSymbolFromDescriptor(
          binder,
          moduleScope,
          entry,
        );
        state.createdSymbols.set(entry.symbolRefkey, symbol);
      }
    },
    [crateFactoryStateSymbol]: crateFactoryState,
  } as Record<string | symbol, unknown>;

  for (const [modulePath, symbols] of Object.entries(descriptor.modules)) {
    const moduleRefs: Record<string, unknown> = {};
    for (const [exportName, symbolDescriptor] of Object.entries(symbols)) {
      const symbolRefkey = refkey(descriptor.modules, modulePath, exportName);

      // If the symbol has members, create a RefkeyableObject with member refkeys
      if (symbolDescriptor.members) {
        const symbolWithMembers: Record<string | symbol, unknown> = {
          [REFKEYABLE]() {
            return symbolRefkey;
          },
        };
        for (const memberName of Object.keys(symbolDescriptor.members)) {
          const memberRefkey = refkey(
            descriptor.modules,
            modulePath,
            exportName,
            memberName,
          );
          symbolWithMembers[memberName] = memberRefkey;
        }
        moduleRefs[exportName] = symbolWithMembers;
      } else {
        moduleRefs[exportName] = symbolRefkey;
      }

      entries.push({
        modulePath,
        exportName,
        descriptor: symbolDescriptor,
        symbolRefkey,
        modules: descriptor.modules,
      });
    }

    crateRef[modulePath] = moduleRefs;
  }

  return crateRef as CrateRef<CrateDescriptor<TModules>> &
    SymbolCreator &
    ExternalCrate;
}

function getFactoryState(crate: ExternalCrate): CrateFactoryState {
  return crate[crateFactoryStateSymbol] as CrateFactoryState;
}

function createBinderState(
  binder: Binder,
  descriptor: CrateDescriptor,
  crateFactoryState: CrateFactoryState,
): BinderState {
  const crateScope = createScope(
    RustCrateScope,
    descriptor.name,
    descriptor.version,
    {
      binder,
      builtin: crateFactoryState.builtin,
      metadata: {
        external: true,
        builtin: crateFactoryState.builtin,
      },
    },
  );
  crateFactoryState.scopes.set(binder, crateScope);

  return {
    crateScope,
    moduleScopes: new Map(),
    createdSymbols: new Map(),
  };
}

function ensureModuleScope(
  state: BinderState,
  modulePath: string,
  crateName: string,
) {
  const normalizedPath = normalizeModulePath(modulePath);
  return mapGet(state.moduleScopes, normalizedPath, () => {
    const segments = parseModulePath(normalizedPath);
    if (segments.length === 0) {
      return createScope(RustModuleScope, "", state.crateScope, {
        binder: state.crateScope.binder,
      });
    }

    let currentParent: RustCrateScope | RustModuleScope = state.crateScope;
    let currentPath = "";
    for (const segment of segments) {
      currentPath =
        currentPath.length === 0 ? segment : `${currentPath}::${segment}`;
      currentParent = mapGet(state.moduleScopes, currentPath, () => {
        currentParent.addChildModule({ name: segment, pub: true });
        return createScope(RustModuleScope, segment, currentParent, {
          binder: state.crateScope.binder,
          metadata: {
            crate: crateName,
          },
        });
      });
    }

    return currentParent as RustModuleScope;
  });
}

function createSymbolFromDescriptor(
  binder: Binder,
  moduleScope: RustModuleScope,
  entry: DescriptorEntry,
) {
  const { descriptor, symbolRefkey, exportName } = entry;
  const symbolName = descriptor.name ?? exportName;
  const options = {
    binder,
    refkeys: symbolRefkey,
    symbolKind: descriptor.kind,
    metadata: descriptor.metadata,
    ignoreNamePolicy: true,
    ignoreNameConflict: true,
  } as const;

  let symbol: RustOutputSymbol;

  switch (descriptor.kind) {
    case "struct":
    case "enum":
    case "trait":
    case "type-alias":
      symbol = createSymbol(
        NamedTypeSymbol,
        symbolName,
        moduleScope.types,
        descriptor.kind,
        options,
      );
      break;
    case "function":
    case "method":
      symbol = createSymbol(
        FunctionSymbol,
        symbolName,
        moduleScope.values,
        options,
      );
      break;
    default:
      symbol = createSymbol(
        RustOutputSymbol,
        symbolName,
        moduleScope.values,
        options,
      );
      break;
  }

  // Create member symbols on the type's member space
  if (descriptor.members) {
    for (const [memberName, memberDesc] of Object.entries(
      descriptor.members,
    )) {
      const memberRefkey = refkey(
        entry.modules,
        entry.modulePath,
        exportName,
        memberName,
      );
      const memberSymbolName = memberDesc.name ?? memberName;
      const memberOptions = {
        binder,
        refkeys: memberRefkey,
        symbolKind: memberDesc.kind,
        metadata: memberDesc.metadata,
        ignoreNamePolicy: true,
        ignoreNameConflict: true,
      } as const;

      switch (memberDesc.kind) {
        case "function":
        case "method": // legacy compat
          createSymbol(
            FunctionSymbol,
            memberSymbolName,
            symbol.members,
            memberDesc.associated
              ? memberOptions
              : { ...memberOptions, receiverType: "&self" },
          );
          break;
        case "field":
        case "variant":
          createSymbol(
            RustOutputSymbol,
            memberSymbolName,
            symbol.members,
            memberOptions,
          );
          break;
        default:
          createSymbol(
            RustOutputSymbol,
            memberSymbolName,
            symbol.members,
            memberOptions,
          );
          break;
      }
    }
  }

  return symbol;
}

function normalizeModulePath(path: string) {
  return path.trim();
}

function parseModulePath(path: string): string[] {
  if (path === "") {
    return [];
  }

  return path
    .split(/::|\//g)
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);
}

function mapGet<K extends WeakKey, V>(
  map: WeakMap<K, V>,
  key: K,
  init: () => V,
): V;
function mapGet<K, V>(map: Map<K, V>, key: K, init: () => V): V;
function mapGet<K extends object, V>(
  map: WeakMap<K, V> | Map<K, V>,
  key: K,
  init: () => V,
): V {
  if (map instanceof WeakMap) {
    let value = map.get(key);
    if (value === undefined) {
      value = init();
      map.set(key, value);
    }
    return value;
  }

  let value = map.get(key);
  if (value === undefined) {
    value = init();
    map.set(key, value);
  }
  return value;
}
