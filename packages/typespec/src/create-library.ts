import {
  Binder,
  isLibrarySymbolReference,
  LibrarySymbolReference,
  namekey,
  refkey,
  REFKEYABLE,
  TO_SYMBOL,
  useBinder,
} from "@alloy-js/core";
import { getProgram } from "./contexts/program.js";
import { ProgramScope } from "./scopes/program.js";
import {
  isNamespaceSymbol,
  NamedTypeSymbol,
  NamespaceSymbol,
  TypeSpecSymbol,
} from "./symbols/index.js";

export interface MemberDescriptor {
  kind: string;
  /**
   * The type of this member. Can be:
   * - A {@link LibrarySymbolReference} pointing to another library symbol
   * - A function returning a {@link LibrarySymbolReference} (for circular refs)
   * - An inline {@link Descriptor} for anonymous types (e.g. inline unions)
   *
   * Inline descriptors are not materialized as referenceable symbols; they
   * serve as documentation of the member's type shape.
   */
  type?: LibrarySymbolReference | (() => LibrarySymbolReference) | Descriptor;
}

export interface NamedTypeDescriptor<M> {
  kind: string;
  members: M;
}

export interface NamespaceDescriptor<M> {
  kind: "namespace";
  members: M;
}

export interface ScalarDescriptor extends MemberDescriptor {
  kind: "scalar";
}

export interface DecoratorDescriptor extends MemberDescriptor {
  kind: "decorator";
}

export interface ModelDescriptor<M> extends NamedTypeDescriptor<M> {
  kind: "model";
}

export interface PropertyDescriptor extends MemberDescriptor {
  kind: "property";
}

export interface InterfaceDescriptor<M> extends NamedTypeDescriptor<M> {
  kind: "interface";
}

export interface OperationDescriptor extends MemberDescriptor {
  kind: "operation";
}

export interface UnionDescriptor<M> extends NamedTypeDescriptor<M> {
  kind: "union";
}

export interface UnionVariantDescriptor extends MemberDescriptor {
  kind: "union-variant";
}

export interface EnumDescriptor<M> extends NamedTypeDescriptor<M> {
  kind: "enum";
}

export interface EnumMemberDescriptor extends MemberDescriptor {
  kind: "enum-member";
}

export type Descriptor =
  | NamespaceDescriptor<any>
  | ScalarDescriptor
  | DecoratorDescriptor
  | ModelDescriptor<any>
  | PropertyDescriptor
  | InterfaceDescriptor<any>
  | OperationDescriptor
  | UnionDescriptor<any>
  | UnionVariantDescriptor
  | EnumDescriptor<any>
  | EnumMemberDescriptor;

export type ResolveDescriptor<D> =
  D extends NamedTypeDescriptor<infer M> ?
    LibrarySymbolReference & { [K in keyof M]: ResolveDescriptor<M[K]> }
  : LibrarySymbolReference;

export type LibraryFrom<T> = {
  [K in keyof T]: ResolveDescriptor<T[K]>;
} & LibrarySymbolReference;

interface InternalContext {
  parent(binder: Binder | undefined): NamedTypeSymbol | ProgramScope;
  libraryOptions?: CreateLibraryOptions;
}

export interface CreateLibraryOptions {
  /**
   * When true, the namespace's members are implicitly available without
   * a `using` statement (like the core `TypeSpec` namespace).
   */
  implicitlyUsed?: boolean;
  /**
   * When set, referencing a symbol from this library will automatically
   * add an `import "<packageImport>";` to the source file.
   */
  packageImport?: string;
}

export function createLibrary<T extends Record<string, Descriptor>>(
  rootNs: string,
  props: T,
  options?: CreateLibraryOptions,
): LibraryFrom<T> {
  const ownerSymbolPerBinder = new WeakMap<
    Binder,
    NamespaceSymbol | ProgramScope
  >();

  const namespaceNames = rootNs.split(".");

  return createSymbolEntry(
    namespaceNames.at(-1)!,
    {
      kind: "namespace",
      members: props,
    },
    {
      parent(binder: Binder | undefined) {
        return mapGet(ownerSymbolPerBinder, binder, () => {
          const program = getProgram(binder);
          let ownerSymbol: ProgramScope | NamespaceSymbol = program;

          for (const name of namespaceNames.slice(0, -1)) {
            if (ownerSymbol.members.symbolNames.has(name)) {
              const nsSymbol = ownerSymbol.members.symbolNames.get(
                name,
              )! as NamedTypeSymbol;
              if (!isNamespaceSymbol(nsSymbol)) {
                throw new Error(
                  `Symbol '${name}' in namespace '${ownerSymbol.name}' is not a namespace.`,
                );
              }
              ownerSymbol = nsSymbol;
            } else {
              ownerSymbol = new NamespaceSymbol(
                namekey(name),
                ownerSymbol.members,
                {
                  binder,
                  refkeys: refkey(),
                },
              );
            }
          }
          return ownerSymbol;
        });
      },
      libraryOptions: options,
    },
  ) as LibraryFrom<T>;
}

function createSymbolEntry(
  name: string,
  descriptor: Descriptor,
  context: InternalContext,
): LibrarySymbolReference {
  const symbols = new WeakMap<Binder, TypeSpecSymbol>();
  const newContext: InternalContext = {
    parent(binder) {
      return getSymbol(binder) as NamedTypeSymbol;
    },
    libraryOptions: context.libraryOptions,
  };
  const obj: LibrarySymbolReference & Record<string, unknown> = {
    [REFKEYABLE]() {
      return getSymbol(useBinder()).refkeys[0];
    },
    [TO_SYMBOL]() {
      return getSymbol(useBinder());
    },
  };

  function initializeMembers() {
    for (const key of Object.keys(obj)) {
      if (typeof key === "symbol") continue;
      (obj as any)[key][TO_SYMBOL]();
    }
  }

  function getSymbol(binder: Binder | undefined) {
    return mapGet(symbols, binder, () =>
      createSymbolFromDescriptor(
        name,
        binder,
        descriptor,
        context,
        initializeMembers,
      ),
    );
  }

  switch (descriptor.kind) {
    case "namespace":
    case "model":
    case "interface":
    case "union":
    case "enum": {
      for (const [memberName, memberDescriptor] of Object.entries(
        descriptor.members,
      ) as any) {
        obj[memberName] = createSymbolEntry(
          memberName,
          memberDescriptor,
          newContext,
        );
      }
      break;
    }
    case "property":
    case "operation":
    case "union-variant":
    case "enum-member":
    case "decorator":
    case "scalar":
      break;
    default:
      throw new Error(
        `Unsupported descriptor kind: ${(descriptor as any).kind}`,
      );
  }

  return obj;
}

/**
 * Resolves a member descriptor's `type` field to a symbol, or undefined if it's
 * an inline descriptor (anonymous type) that can't be materialized as a symbol.
 */
function resolveTypeRef(
  type: MemberDescriptor["type"],
): ReturnType<LibrarySymbolReference[typeof TO_SYMBOL]> | undefined {
  if (type === undefined) return undefined;
  if (typeof type === "function") {
    const resolved = type();
    if (isLibrarySymbolReference(resolved)) return resolved[TO_SYMBOL]();
    // Function returned a raw descriptor (circular self-reference) — no symbol
    return undefined;
  }
  if (isLibrarySymbolReference(type)) return type[TO_SYMBOL]();
  // Inline descriptor (anonymous type) — no symbol to reference
  return undefined;
}

function createSymbolFromDescriptor(
  name: string,
  binder: Binder | undefined,
  descriptor: Descriptor,
  context: InternalContext,
  lazyMemberInitializer: () => void,
): TypeSpecSymbol {
  const parent = context.parent(binder);
  const libOpts = context.libraryOptions;

  switch (descriptor.kind) {
    case "namespace": {
      if (!(parent instanceof ProgramScope) && !isNamespaceSymbol(parent)) {
        throw new Error(
          `Cannot create namespace '${name}' under non-namespace symbol '${parent.name}'.`,
        );
      }
      if (parent.members.symbolNames.has(name)) {
        return parent.members.symbolNames.get(name)! as NamespaceSymbol;
      }
      return new NamespaceSymbol(namekey(name), parent.members, {
        binder,
        refkeys: refkey(),
        lazyMemberInitializer,
        packageImport: libOpts?.packageImport,
        implicitlyUsed: libOpts?.implicitlyUsed,
      });
    }
    case "union":
    case "enum":
    case "interface":
    case "model": {
      return new NamedTypeSymbol(
        namekey(name),
        parent.members,
        descriptor.kind,
        {
          binder,
          refkeys: refkey(),
          lazyMemberInitializer,
          packageImport: libOpts?.packageImport,
          implicitlyUsed: libOpts?.implicitlyUsed,
        },
      );
    }
    case "operation":
    case "decorator":
    case "union-variant":
    case "enum-member":
    case "property": {
      return new TypeSpecSymbol(namekey(name), parent.members, {
        binder,
        refkeys: refkey(),
        type: resolveTypeRef(descriptor.type),
        lazyMemberInitializer,
        packageImport: libOpts?.packageImport,
        implicitlyUsed: libOpts?.implicitlyUsed,
      });
    }
    case "scalar": {
      return new NamedTypeSymbol(
        namekey(name),
        parent.members,
        descriptor.kind,
        {
          binder,
          refkeys: refkey(),
          packageImport: libOpts?.packageImport,
          implicitlyUsed: libOpts?.implicitlyUsed,
        },
      );
    }
    default: {
      throw new Error(
        `Unsupported descriptor kind: ${(descriptor as any).kind}`,
      );
    }
  }
}

const defaultsPerMap = new WeakMap<WeakMap<Binder, unknown>, unknown>();

function mapGet<V>(
  map: WeakMap<Binder, V>,
  key: Binder | undefined,
  init: () => V,
): V {
  if (key === undefined) {
    // Use a per-map default store when callers request a value for an undefined key.
    let value = defaultsPerMap.get(map);
    if (value === undefined) {
      value = init();
      defaultsPerMap.set(map, value);
    }
    return value as V;
  }

  let value = map.get(key);
  if (value === undefined) {
    value = init();
    map.set(key, value);
  }
  return value as V;
}
