import {
  Block,
  Children,
  Declaration,
  DeclarationContext,
  effect,
  For,
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
import { GoSymbol } from "../../symbols/go.js";
import { NamedTypeSymbol } from "../../symbols/named-type.js";
import { LineComment } from "../doc/comment.js";
import { Name } from "../Name.js";
import {
  FunctionParameterProps,
  FunctionParameters,
} from "../parameters/parameters.js";
import { TypeDeclaration, TypeDeclarationProps } from "../type/declaration.jsx";

/**
 * Properties for creating an interface declaration.
 * This can be used for both named and anonymous interfaces.
 * For named interfaces, use `InterfaceTypeDeclarationProps` instead.
 */
export interface InterfaceDeclarationProps {
  refkey?: Refkey;
  children?: Children;

  /**
   * Whether to render the interface in a single line.
   * This will only compile if `children` is a single line as well.
   * This is not common in Go, so use with caution.
   */
  singleLine?: boolean;
}

/**
 * Properties for creating a named interface type declaration.
 * This is a combination of `InterfaceDeclarationProps` and `TypeDeclarationProps`.
 */
export interface InterfaceTypeDeclarationProps
  extends InterfaceDeclarationProps,
    TypeDeclarationProps {}

/**
 * Wrapper for creating a named interface type declaration.
 */
export function InterfaceTypeDeclaration(props: InterfaceTypeDeclarationProps) {
  return (
    <TypeDeclaration {...props}>
      <InterfaceDeclaration {...props} />
    </TypeDeclaration>
  );
}

/**
 * Go interface declaration.
 * @example
 * ```tsx
 * <InterfaceDeclaration>
 *   <InterfaceEmbed>{MyOtherInterface}</InterfaceEmbed>
 *   <InterfaceFunction name="MyFunc" parameters={params} returns="int" />
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
  parameters?: FunctionParameterProps[];
  returns?: Children;
  refkey?: Refkey;
  /** Doc comment */
  doc?: Children;
  /** Whether function should be public (exported) or private (unexported) */
  public?: boolean;
}

export function InterfaceFunction(props: InterfaceFunctionProps) {
  const symbol = createInterfaceMemberSymbol(props.name, {
    refkeys: props.refkey,
    public: props.public,
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
        <FunctionParameters parameters={props.parameters} />
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
  });

  const taken = takeSymbols();
  effect(() => {
    if (taken.size !== 1) return;
    const symbol = Array.from(taken)[0] as GoSymbol;
    memberSymbol.name = symbol.name;
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

export interface TypeConstraintProps {
  constraints?: Children[];
  children?: Children;
}

export function TypeConstraint(props: TypeConstraintProps) {
  const constraints: Children[] = [];
  if (!props.constraints || props.constraints.length === 0) {
    if (props.children) {
      constraints.push(props.children);
    } else {
      throw new Error("TypeConstraint requires constraints or children.");
    }
  } else {
    if (props.children) {
      throw new Error(
        "TypeConstraint cannot have both constraints and children.",
      );
    }
    constraints.push(...props.constraints);
  }

  return (
    <For each={constraints} joiner=" | ">
      {(constraint) => <>{constraint}</>}
    </For>
  );
}
