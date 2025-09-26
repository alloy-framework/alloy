import {
  Binder,
  LibrarySymbolReference,
  namekey,
  refkey,
  REFKEYABLE,
  TO_SYMBOL,
  useBinder,
} from "@alloy-js/core";
import { basename } from "pathe";
import { FunctionSymbol, GoSymbol, PackageSymbol } from "./index.js";
import { NamedTypeSymbol } from "./symbols/named-type.js";

export interface MemberDescriptor {
  kind: string;
  type?: LibrarySymbolReference | (() => LibrarySymbolReference);
}

export interface FieldDescriptor extends MemberDescriptor {
  kind: "field";
}

export interface FunctionDescriptor extends MemberDescriptor {
  kind: "function";
}

export interface MethodDescriptor extends MemberDescriptor {
  kind: "method";
}

export interface VariableDescriptor extends MemberDescriptor {
  kind: "var";
}

export interface EmbedDescriptor extends MemberDescriptor {
  kind: "embed";
}

export interface NamedTypeDescriptor<M extends Record<string, Descriptor>> {
  kind: string;
  members: M;
}

export interface TypeDescriptor<M extends Record<string, Descriptor>>
  extends NamedTypeDescriptor<M> {
  kind: "type";
}

export interface PackageDescriptor<M extends Record<string, Descriptor>>
  extends NamedTypeDescriptor<M> {
  kind: "package";
  path?: string;
  name?: string;
  members: M;
}

export interface StructDescriptor<M extends Record<string, Descriptor>>
  extends NamedTypeDescriptor<M> {
  kind: "struct";
}

export interface InterfaceDescriptor<M extends Record<string, Descriptor>>
  extends NamedTypeDescriptor<M> {
  kind: "interface";
}

export type Descriptor =
  | PackageDescriptor<any>
  | FieldDescriptor
  | FunctionDescriptor
  | MethodDescriptor
  | VariableDescriptor
  | StructDescriptor<any>
  | InterfaceDescriptor<any>
  | TypeDescriptor<any>
  | EmbedDescriptor;

export type StrictDescriptor =
  | PackageDescriptor<Record<string, StrictDescriptor>>
  | FieldDescriptor
  | FunctionDescriptor
  | MethodDescriptor
  | VariableDescriptor
  | StructDescriptor<Record<string, StrictDescriptor>>
  | InterfaceDescriptor<Record<string, StrictDescriptor>>
  | TypeDescriptor<Record<string, StrictDescriptor>>
  | EmbedDescriptor;

export type ResolveDescriptor<D> =
  D extends NamedTypeDescriptor<infer M> ?
    LibrarySymbolReference & { [K in keyof M]: ResolveDescriptor<M[K]> }
  : LibrarySymbolReference;

export type LibraryFrom<T> = ResolveDescriptor<T> & LibrarySymbolReference;

interface InternalContext {
  ownerSymbol(binder: Binder | undefined): GoSymbol | null;
  builtin: boolean;
}

export function createModule<T extends PackageDescriptor<any>>(
  name: string,
  props: T,
  builtin: boolean = false,
): LibraryFrom<T> {
  return createSymbolEntry(name, props, {
    ownerSymbol(_binder: Binder | undefined) {
      return null;
    },
    builtin,
  }) as LibraryFrom<T>;
}

function createSymbolEntry(
  name: string,
  descriptor: Descriptor,
  context: InternalContext,
): LibrarySymbolReference {
  const symbols = new WeakMap<Binder, GoSymbol>();

  function getSymbol(binder: Binder | undefined) {
    // We cache symbols per binder to ensure we only create one symbol. We also
    // track an unbound symbol for cases where there is no binder (mostly
    // tests).
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

  const newContext: InternalContext = {
    ownerSymbol(binder) {
      return getSymbol(binder) as NamedTypeSymbol;
    },
    builtin: context.builtin,
  };

  function initializeMembers() {
    for (const key of Object.keys(obj)) {
      if (typeof key === "symbol") continue;
      (obj as any)[key][TO_SYMBOL]();
    }
  }

  const obj: LibrarySymbolReference & Record<string, unknown> = {
    [REFKEYABLE]() {
      return getSymbol(useBinder()).refkeys[0];
    },
    [TO_SYMBOL]() {
      return getSymbol(useBinder());
    },
  };

  switch (descriptor.kind) {
    case "package":
    case "struct":
    case "interface":
      for (const [memberName, memberDesc] of Object.entries(
        descriptor.members,
      ) as any) {
        obj[memberName] = createSymbolEntry(memberName, memberDesc, newContext);
      }
      break;
  }

  return obj;
}

function createSymbolFromDescriptor(
  name: string,
  binder: Binder | undefined,
  descriptor: Descriptor,
  context: InternalContext,
  lazyMemberInitializer: () => void,
): GoSymbol {
  const ownerSymbol = context.ownerSymbol(binder) as GoSymbol;

  if (ownerSymbol === null && descriptor.kind !== "package") {
    throw new Error(
      `Cannot create a non-package symbol (${name}) without an owner symbol.`,
    );
  }

  switch (descriptor.kind) {
    case "package":
      if (ownerSymbol === null) {
        const dname = basename(name);
        const packageName = descriptor.name ?? dname;
        const packageSymbol = new PackageSymbol(packageName, undefined, {
          binder,
          refkeys: refkey(),
          lazyMemberInitializer,
          path: descriptor.path,
          builtin: context.builtin,
        });
        return packageSymbol;
      }
      if (!(ownerSymbol instanceof PackageSymbol)) {
        throw new Error(
          `Cannot create a package symbol (${name}) with a non-package owner symbol (${ownerSymbol.name}).`,
        );
      }
      if (ownerSymbol.members.symbolNames.has(name)) {
        return ownerSymbol.members.symbolNames.get(name)! as PackageSymbol;
      }
      return new PackageSymbol(name, ownerSymbol as PackageSymbol, {
        binder,
        refkeys: refkey(),
        lazyMemberInitializer,
        path: descriptor.path,
        builtin: context.builtin,
      });
    case "struct":
    case "interface":
    case "type":
      if (!(ownerSymbol instanceof PackageSymbol)) {
        throw new Error(
          `Cannot create a named type symbol (${name}) with a non-package owner symbol (${ownerSymbol.name}).`,
        );
      }
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
    case "function":
      if (!(ownerSymbol instanceof PackageSymbol)) {
        throw new Error(
          `Cannot create a function symbol (${name}) with a non-package owner symbol (${ownerSymbol.name}).`,
        );
      }
      return new FunctionSymbol(namekey(name), ownerSymbol.members, {
        binder,
        refkeys: refkey(),
      });
    case "field":
      if (!(ownerSymbol instanceof NamedTypeSymbol)) {
        throw new Error(
          `Cannot create a field symbol (${name}) with a non-named-type owner symbol (${ownerSymbol.name}).`,
        );
      }
      return new NamedTypeSymbol(
        namekey(name),
        ownerSymbol.members,
        ownerSymbol.typeKind === "interface" ?
          "interface-member"
        : "struct-member",
        {
          binder,
          refkeys: refkey(),
          type:
            descriptor.type === undefined ? undefined
            : typeof descriptor.type === "function" ?
              descriptor.type()[TO_SYMBOL]()
            : descriptor.type[TO_SYMBOL](),
          lazyMemberInitializer,
        },
      );
    case "embed": {
      if (!(ownerSymbol instanceof NamedTypeSymbol)) {
        throw new Error(
          `Cannot create a field symbol (${name}) with a non-named-type owner symbol (${ownerSymbol.name}).`,
        );
      }
      const symbol = new NamedTypeSymbol(
        namekey(name),
        ownerSymbol.members,
        ownerSymbol.typeKind === "interface" ?
          "interface-member"
        : "struct-member",
        {
          binder,
          refkeys: refkey(),
          type:
            descriptor.type === undefined ? undefined
            : typeof descriptor.type === "function" ?
              descriptor.type()[TO_SYMBOL]()
            : descriptor.type[TO_SYMBOL](),
          lazyMemberInitializer,
        },
      );
      symbol.copyMembersTo(ownerSymbol);
      return symbol;
    }
    case "var":
      if (!(ownerSymbol instanceof PackageSymbol)) {
        throw new Error(
          `Cannot create a variable symbol (${name}) with a non-package owner symbol (${ownerSymbol.name}).`,
        );
      }
      return new GoSymbol(namekey(name), ownerSymbol.members, {
        binder,
        refkeys: refkey(),
        type:
          descriptor.type === undefined ? undefined
          : typeof descriptor.type === "function" ?
            descriptor.type()[TO_SYMBOL]()
          : descriptor.type[TO_SYMBOL](),
      });
    default:
      throw "Unsupported";
  }
}

const defaultsPerMap = new WeakMap<object, unknown>();

function mapGet<T extends WeakKey, V>(
  map: WeakMap<T, V>,
  key: T | undefined,
): V | undefined;
function mapGet<T extends WeakKey, V>(
  map: WeakMap<T, V>,
  key: T | undefined,
  init: () => V,
): V;
function mapGet<T extends WeakKey, V>(
  map: WeakMap<T, V>,
  key: T | undefined,
  init?: () => V,
): V | undefined {
  if (key === undefined) {
    // Use a per-map default store when callers request a value for an undefined key.
    let value = defaultsPerMap.get(map as unknown as object) as V | undefined;
    if (value === undefined && init) {
      value = init();
      defaultsPerMap.set(map as unknown as object, value);
    }
    return value;
  }

  let value = map.get(key);
  if (value === undefined && init) {
    value = init();
    map.set(key, value);
  }
  return value;
}
