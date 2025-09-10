import {
  Binder,
  LibrarySymbolReference,
  refkey,
  REFKEYABLE,
  TO_SYMBOL,
  useBinder,
} from "@alloy-js/core";
import { getGlobalNamespace } from "./contexts/global-namespace.js";
import { MethodKinds, MethodSymbol } from "./index.js";
import { CSharpSymbol } from "./symbols/csharp.js";
import { NamedTypeSymbol } from "./symbols/named-type.js";
import { NamespaceSymbol } from "./symbols/namespace.js";

export interface MemberDescriptor {
  kind: string;
  type?: LibrarySymbolReference | (() => LibrarySymbolReference);
  isOverride?: boolean;
  isAbstract?: boolean;
  isVirtual?: boolean;
  isStatic?: boolean;
  isSealed?: boolean;
  isExtern?: boolean;
  isReadOnly?: boolean;
  isNullable?: boolean;
}

export interface NamespaceDescriptor<M> {
  kind: "namespace";
  members: M;
}

export interface FieldDescriptor extends MemberDescriptor {
  kind: "field";
}

export interface MethodDescriptor extends MemberDescriptor {
  kind: "method";
  methodKind: MethodKinds;
}

export interface NamedTypeDescriptor<M> {
  kind: string;
  members: M;
  isAbstract?: boolean;
  isStatic?: boolean;
  isSealed?: boolean;
}
export interface ClassDescriptor<M> extends NamedTypeDescriptor<M> {
  kind: "class";
}

export interface PropertyDescriptor extends MemberDescriptor {
  kind: "property";
}

export interface InterfaceDescriptor<M> extends NamedTypeDescriptor<M> {
  kind: "interface";
}

export interface EnumDescriptor<M> extends NamedTypeDescriptor<M> {
  kind: "enum";
}

export interface StructDescriptor<M> extends NamedTypeDescriptor<M> {
  kind: "struct";
}

export interface RecordDescriptor<M> extends NamedTypeDescriptor<M> {
  kind: "record";
}

export interface GenericDescriptor {
  kind: "generic";
}

export type Descriptor =
  | FieldDescriptor
  | MethodDescriptor
  | PropertyDescriptor
  | NamespaceDescriptor<any>
  | ClassDescriptor<any>
  | InterfaceDescriptor<any>
  | EnumDescriptor<any>
  | StructDescriptor<any>
  | RecordDescriptor<any>
  | GenericDescriptor;

export type ResolveDescriptor<D> =
  D extends NamedTypeDescriptor<infer M> ?
    LibrarySymbolReference & { [K in keyof M]: ResolveDescriptor<M[K]> }
  : LibrarySymbolReference;

export type LibraryFrom<T> = {
  [K in keyof T]: ResolveDescriptor<T[K]>;
} & LibrarySymbolReference;

interface InternalContext {
  binder(): Binder;
  ownerSymbol(): NamedTypeSymbol;
}

export function createLibrary<T extends Record<string, Descriptor>>(
  rootNs: string,
  props: T,
): LibraryFrom<T> {
  let binder: Binder | undefined = undefined;
  let ownerSymbol: NamespaceSymbol | undefined = undefined;
  const namespaceNames = rootNs.split(".");

  return createSymbolEntry(
    namespaceNames.at(-1)!,
    {
      kind: "namespace",
      members: props,
    },
    {
      binder() {
        if (!binder) {
          binder = useBinder();
        }
        return binder!;
      },
      ownerSymbol() {
        if (ownerSymbol) {
          return ownerSymbol;
        }

        const binder = this.binder();
        ownerSymbol = getGlobalNamespace(binder);
        for (const name of namespaceNames.slice(0, -1)) {
          if (ownerSymbol!.members.symbolNames.has(name)) {
            ownerSymbol = ownerSymbol!.members.symbolNames.get(
              name,
            )! as NamespaceSymbol;
          } else {
            ownerSymbol = new NamespaceSymbol(name, ownerSymbol!, {
              binder,
              refkeys: refkey(),
            });
          }
        }

        return ownerSymbol;
      },
    },
  ) as LibraryFrom<T>;
}

function createSymbolEntry(
  name: string,
  descriptor: Descriptor,
  context: InternalContext,
): LibrarySymbolReference {
  let symbol: CSharpSymbol | undefined = undefined;

  function getSymbol() {
    if (symbol) return symbol;

    symbol = createSymbolFromDescriptor(
      name,
      descriptor,
      context,
      initializeMembers,
    );
    return symbol;
  }

  const newContext: InternalContext = {
    binder: context.binder,
    ownerSymbol() {
      return getSymbol() as NamedTypeSymbol;
    },
  };

  function initializeMembers() {
    for (const key of Object.keys(obj)) {
      if (typeof key === "symbol") continue;
      (obj as any)[key][TO_SYMBOL]();
    }
  }

  const obj: LibrarySymbolReference & Record<string, unknown> = {
    [REFKEYABLE]() {
      return getSymbol().refkeys[0];
    },
    [TO_SYMBOL]() {
      return getSymbol();
    },
  };

  switch (descriptor.kind) {
    case "class":
    case "namespace":
    case "interface":
    case "enum":
    case "struct":
    case "record":
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
  descriptor: Descriptor,
  context: InternalContext,
  lazyMemberInitializer: () => void,
): CSharpSymbol {
  const ownerSymbol = context.ownerSymbol();
  const binder = context.binder();

  switch (descriptor.kind) {
    case "namespace":
      if (ownerSymbol.members.symbolNames.has(name)) {
        return ownerSymbol.members.symbolNames.get(name)! as NamespaceSymbol;
      }
      return new NamespaceSymbol(name, ownerSymbol as NamespaceSymbol, {
        binder,
        refkeys: refkey(),
        lazyMemberInitializer,
      });
    case "class":
    case "enum":
    case "interface":
    case "struct":
    case "record":
      return new NamedTypeSymbol(name, ownerSymbol.members, descriptor.kind, {
        binder,
        refkeys: refkey(),
        lazyMemberInitializer,
      });
    case "method":
      return new MethodSymbol(
        name,
        ownerSymbol.members,
        descriptor.methodKind,
        {
          binder,
          refkeys: refkey(),
        },
      );
    case "field":
    case "property":
      return new CSharpSymbol(name, ownerSymbol.members, {
        binder,
        refkeys: refkey(),
        type:
          descriptor.type === undefined ? undefined
          : typeof descriptor.type === "function" ?
            descriptor.type()[TO_SYMBOL]()
          : descriptor.type[TO_SYMBOL](),
        isNullable: descriptor.isNullable,
        lazyMemberInitializer,
      });
    case "generic":
      return new CSharpSymbol(name, ownerSymbol.members, {
        binder,
        refkeys: refkey(),
      });
    default:
      throw "Unsupported";
  }
}
