import {
  Binder,
  LibrarySymbolReference,
  namekey,
  refkey,
  REFKEYABLE,
  TO_SYMBOL,
  useBinder,
} from "@alloy-js/core";
import { getGlobalNamespace } from "./contexts/global-namespace.js";
import {
  isNamespaceSymbol,
  NamedTypeSymbol,
  NamespaceSymbol,
  TypeSpecSymbol,
} from "./symbols/index.js";

export interface MemberDescriptor {
  kind: string;
  type?: LibrarySymbolReference | (() => LibrarySymbolReference);
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
  ownerSymbol(binder: Binder | undefined): NamedTypeSymbol;
}
export function createLibrary<T extends Record<string, Descriptor>>(
  rootNs: string,
  props: T,
): LibraryFrom<T> {
  const ownerSymbolPerBinder = new WeakMap<Binder, NamespaceSymbol>();

  const namespaceNames = rootNs.split(".");

  return createSymbolEntry(
    namespaceNames.at(-1)!,
    {
      kind: "namespace",
      members: props,
    },
    {
      ownerSymbol(binder: Binder | undefined) {
        return mapGet(ownerSymbolPerBinder, binder, () => {
          let ownerSymbol = getGlobalNamespace(binder);
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
              ownerSymbol = new NamespaceSymbol(namekey(name), ownerSymbol, {
                binder,
                refkeys: refkey(),
              });
            }
          }
          return ownerSymbol;
        });
      },
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
    ownerSymbol(binder) {
      return getSymbol(binder) as NamedTypeSymbol;
    },
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

function createSymbolFromDescriptor(
  name: string,
  binder: Binder | undefined,
  descriptor: Descriptor,
  context: InternalContext,
  lazyMemberInitializer: () => void,
): TypeSpecSymbol {
  const ownerSymbol = context.ownerSymbol(binder);

  switch (descriptor.kind) {
    case "namespace": {
      if (!isNamespaceSymbol(ownerSymbol)) {
        throw new Error(
          `Cannot create namespace '${name}' under non-namespace symbol '${ownerSymbol.name}'.`,
        );
      }
      if (ownerSymbol.members.symbolNames.has(name)) {
        return ownerSymbol.members.symbolNames.get(name)! as NamespaceSymbol;
      }
      return new NamespaceSymbol(namekey(name), ownerSymbol, {
        binder,
        refkeys: refkey(),
        lazyMemberInitializer,
      });
    }
    case "union":
    case "enum":
    case "interface":
    case "model": {
      return new NamedTypeSymbol(
        namekey(name),
        ownerSymbol.members,
        descriptor.kind,
        {
          binder,
          refkeys: refkey(),
          lazyMemberInitializer,
        },
      );
    }
    case "operation":
    case "decorator":
    case "union-variant":
    case "enum-member":
    case "property": {
      return new TypeSpecSymbol(namekey(name), ownerSymbol.members, {
        binder,
        refkeys: refkey(),
        type:
          descriptor.type === undefined ? undefined
          : typeof descriptor.type === "function" ?
            descriptor.type()[TO_SYMBOL]()
          : descriptor.type[TO_SYMBOL](),
        lazyMemberInitializer,
      });
    }
    case "scalar": {
      return new NamedTypeSymbol(
        namekey(name),
        ownerSymbol.members,
        descriptor.kind,
        { binder, refkeys: refkey() },
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

function mapGet<V extends TypeSpecSymbol>(
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
