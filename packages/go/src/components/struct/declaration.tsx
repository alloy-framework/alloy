import {
  Block,
  Children,
  computed,
  Declaration,
  DeclarationContext,
  effect,
  memo,
  Namekey,
  Refkey,
  Scope,
  Show,
  takeSymbols,
  untrack,
  useContext,
  watch,
} from "@alloy-js/core";
import { useGoScope, useNamedTypeScope } from "../../scopes/contexts.js";
import { createNamedTypeScope } from "../../scopes/factories.js";
import { GoNamedTypeScope } from "../../scopes/named-type.js";
import {
  createAnonymousTypeSymbol,
  createStructMemberSymbol,
} from "../../symbols/factories.js";
import { GoSymbol } from "../../symbols/go.js";
import { NamedTypeSymbol } from "../../symbols/named-type.js";
import { LineComment } from "../doc/comment.js";
import { Name } from "../Name.js";
import { TypeDeclaration, TypeDeclarationProps } from "../type/declaration.jsx";

/**
 * Properties for creating a struct declaration.
 * This can be used for both named and anonymous structs.
 * For named structs, use `StructTypeDeclarationProps` instead.
 */
export interface StructDeclarationProps {
  refkey?: Refkey;
  children?: Children;

  /**
   * Whether to render the struct in a single line.
   * This will only compile if `children` is a single line as well.
   * This is not common in Go, so use with caution.
   */
  singleLine?: boolean;
}

/**
 * Properties for creating a named struct type declaration.
 * This is a combination of `StructDeclarationProps` and `TypeDeclarationProps`.
 */
export interface StructTypeDeclarationProps
  extends StructDeclarationProps,
    TypeDeclarationProps {}

/**
 * Wrapper for creating a named struct type declaration.
 */
export function StructTypeDeclaration(props: StructTypeDeclarationProps) {
  return (
    <TypeDeclaration {...props}>
      <StructDeclaration {...props} />
    </TypeDeclaration>
  );
}

/**
 * Go struct declaration.
 * @example
 * ```tsx
 * <StructDeclaration>
 *   <StructEmbed pointer>{MyOtherStruct}</StructEmbed>
 *   <StructMember exported name="MyProperty" type="int" />
 * </StructDeclaration>
 * ```
 * This will produce:
 * ```go
 * struct {
 *   MyOtherStruct
 *   MyProperty int
 * }
 * ```
 */
export function StructDeclaration(props: StructDeclarationProps) {
  const scope = useGoScope();
  let structScope: GoNamedTypeScope | undefined;
  if (
    !(scope instanceof GoNamedTypeScope) ||
    scope.ownerSymbol.typeKind !== "type"
  ) {
    const declSymbol = useContext(DeclarationContext) as
      | NamedTypeSymbol
      | undefined;
    // this is an anonymous struct
    if (!declSymbol) {
      // this can only happen when instantiating a struct directly
      const anonymousSymbol = createAnonymousTypeSymbol("struct");
      const anonymousScope = createNamedTypeScope(anonymousSymbol);
      structScope = anonymousScope;
    } else {
      // this is most likely a struct field
      const anonymousScope = createNamedTypeScope(declSymbol);
      structScope = anonymousScope;
    }
  } else {
    scope.ownerSymbol.typeKind = "struct";
  }

  const content = memo(() => {
    if (props.children) {
      if (props.singleLine) {
        return (
          <>
            {"{"} {props.children} {"}"}
          </>
        );
      } else {
        return (
          <>
            {" "}
            <Block>{props.children}</Block>
          </>
        );
      }
    } else {
      return "{}";
    }
  });

  return (
    <>
      struct
      {structScope ?
        <Scope value={structScope}>{content}</Scope>
      : content}
    </>
  );
}

export interface StructMemberProps {
  name: string | Namekey;
  type: Children;
  refkey?: Refkey;
  tag?: string | Record<string, string>;
  /** Doc comment */
  doc?: Children;
}

export function StructMember(props: StructMemberProps) {
  const symbol = createStructMemberSymbol(props.name, {
    refkeys: props.refkey,
  });

  const tagString = computed(() => {
    if (typeof props.tag === "string") {
      return props.tag;
    } else if (typeof props.tag === "object") {
      return Object.entries(props.tag)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([key, value]) => `${key}:"${value}"`)
        .join(" ");
    }
    return "";
  });

  return (
    <Declaration symbol={symbol}>
      <Show when={Boolean(props.doc)}>
        <LineComment children={props.doc} />
        <hbr />
      </Show>
      <Name /> {props.type}
      {tagString.value === "" ?
        ""
      : tagString.value.includes('"') ?
        ` \`${tagString.value}\``
      : ` "${tagString.value}"`}
    </Declaration>
  );
}

export interface StructEmbedProps {
  refkey?: Refkey;
  children?: Children;
  /** Doc comment */
  doc?: Children;
}

export function StructEmbed(props: StructEmbedProps) {
  let typeName: string = "<Unresolved symbol>";
  if (props.children) {
    if (typeof props.children === "string") {
      typeName = props.children;
    }
  }

  const memberSymbol = createStructMemberSymbol(typeName, {
    refkeys: props.refkey,
  });

  const taken = takeSymbols();
  effect(() => {
    if (taken.size !== 1) return;
    untrack(() => {
      const symbol = Array.from(taken)[0] as GoSymbol;
      memberSymbol.name = symbol.name;
      watch(
        () => symbol.name,
        () => {
          memberSymbol.name = symbol.name;
        },
      );
      const namedTypeScope = useNamedTypeScope();
      // TODO: somehow mark it as "promoted" such that it cannot be constructed directly
      symbol.copyMembersTo(namedTypeScope.ownerSymbol);
    });
  });

  return (
    <Declaration symbol={memberSymbol}>
      <Show when={Boolean(props.doc)}>
        <LineComment children={props.doc} />
        <hbr />
      </Show>
      {props.children}
    </Declaration>
  );
}
