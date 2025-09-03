import {
  Block,
  Children,
  Declaration,
  DeclarationContext,
  effect,
  memo,
  Namekey,
  Refkey,
  Scope,
  Show,
  takeSymbols,
  useContext,
  watch,
} from "@alloy-js/core";
import { useGoScope, useNamedTypeScope } from "../../scopes/contexts.js";
import {
  createFunctionScope,
  createNamedTypeScope,
} from "../../scopes/factories.js";
import { GoNamedTypeScope } from "../../scopes/named-type.js";
import {
  createAnonymousTypeSymbol,
  createInterfaceMemberSymbol,
} from "../../symbols/factories.js";
import { GoSymbol, isNameExported } from "../../symbols/go.js";
import { NamedTypeSymbol } from "../../symbols/named-type.js";
import { LineComment } from "../doc/comment.js";
import { Name } from "../Name.js";
import { ParameterProps, Parameters } from "../parameters/parameters.js";

// properties for creating an interface
export interface InterfaceDeclarationProps {
  refkey?: Refkey;
  children?: Children;

  /**
   * Whether to render the interface in a single line.
   * This will only compile if `children` is a single line as well.
   * This is not common in Go, so use with caution.
   */
  singleLine?: boolean;
  // TODO: implement type parameters
  // typeParameters?: (TypeParameterProps | string)[];
}

/**
 * Go interface declaration.
 * @example
 * ```tsx
 * <InterfaceDeclaration>
 *   <InterfaceEmbed>{MyOtherInterface}</InterfaceEmbed>
 *   <InterfaceFunction exported name="MyFunc" parameters={params} returns="int" />
 * </InterfaceDeclaration>
 * ```
 * This will produce:
 * ```go
 * interface {
 *   MyOtherInterface
 *   func MyFunc(param Param) int
 * }
 * ```
 */
export function InterfaceDeclaration(props: InterfaceDeclarationProps) {
  // TODO: implement general interfaces https://go.dev/ref/spec#General_interfaces

  const scope = useGoScope();
  let interfaceScope: GoNamedTypeScope | undefined;
  if (
    !(scope instanceof GoNamedTypeScope) ||
    scope.ownerSymbol.typeKind !== "type"
  ) {
    const declSymbol = useContext(DeclarationContext) as
      | NamedTypeSymbol
      | undefined;
    // this is an anonymous interface
    if (!declSymbol) {
      // this can only happen when instantiating an interface directly
      const anonymousSymbol = createAnonymousTypeSymbol("interface");
      const anonymousScope = createNamedTypeScope(anonymousSymbol);
      interfaceScope = anonymousScope;
    } else {
      // this is most likely a struct field
      const anonymousScope = createNamedTypeScope(declSymbol);
      interfaceScope = anonymousScope;
    }
  } else {
    scope.ownerSymbol.typeKind = "interface";
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
      interface
      {interfaceScope ?
        <Scope value={interfaceScope}>{content}</Scope>
      : content}
    </>
  );
}

export interface InterfaceFunctionProps {
  name: string | Namekey;
  exported?: boolean;
  parameters?: ParameterProps[];
  returns?: Children;
  refkey?: Refkey;
  /** Doc comment */
  doc?: Children;
}

export function InterfaceFunction(props: InterfaceFunctionProps) {
  const symbol = createInterfaceMemberSymbol(props.name, {
    refkeys: props.refkey,
    canExport: true,
    exported: props.exported,
  });
  const functionScope = createFunctionScope();

  return (
    <Declaration symbol={symbol}>
      <Scope value={functionScope}>
        <Show when={Boolean(props.doc)}>
          <LineComment children={props.doc} />
          <hbr />
        </Show>
        func <Name />
        <Parameters parameters={props.parameters} />
        {props.returns ?
          <> {props.returns}</>
        : null}
      </Scope>
    </Declaration>
  );
}

export interface InterfaceEmbedProps {
  refkey?: Refkey;
  children?: Children;
  /** Doc comment */
  doc?: Children;
}

export function InterfaceEmbed(props: InterfaceEmbedProps) {
  let typeName: string = "<Unresolved symbol>";
  if (props.children) {
    if (typeof props.children === "string") {
      typeName = props.children;
    }
  }

  const memberSymbol = createInterfaceMemberSymbol(typeName, {
    refkeys: props.refkey,
    canExport: true,
    exported: isNameExported(typeName),
  });

  const taken = takeSymbols();
  effect(() => {
    if (taken.size !== 1) return;
    const symbol = Array.from(taken)[0] as GoSymbol;
    memberSymbol.exported = symbol.exported;
    memberSymbol.name = symbol.name;
    watch(
      () => symbol.exported,
      () => {
        memberSymbol.exported = symbol.exported;
      },
    );
    watch(
      () => symbol.name,
      () => {
        memberSymbol.name = symbol.name;
      },
    );
    const namedTypeScope = useNamedTypeScope();
    symbol.copyMembersTo(namedTypeScope.ownerSymbol);
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
