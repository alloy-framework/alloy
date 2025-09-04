import {
  Block,
  Children,
  childrenArray,
  createSymbolSlot,
  effect,
  emitSymbol,
  findKeyedChild,
  findUnkeyedChildren,
  Name,
  Namekey,
  Refkey,
  Show,
  takeSymbols,
} from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { TypeParameterDescriptor } from "../parameter-descriptor.js";
import { useTSLexicalScope, useTSMemberScope } from "../symbols/scopes.js";
import { TSOutputSymbol, TSSymbolFlags } from "../symbols/ts-output-symbol.js";
import { CommonDeclarationProps, Declaration } from "./Declaration.js";
import { TypeParameters } from "./FunctionBase.jsx";
import { JSDoc } from "./JSDoc.jsx";
import { MemberDeclaration } from "./MemberDeclaration.jsx";
import { MemberScope } from "./MemberScope.jsx";
import { PropertyName } from "./PropertyName.jsx";
import { ensureTypeRefContext } from "./TypeRefContext.jsx";

export interface InterfaceDeclarationProps extends CommonDeclarationProps {
  extends?: Children;

  /**
   * The generic type parameters of the interface.
   */
  typeParameters?: TypeParameterDescriptor[] | string[];
}

const _InterfaceDeclaration = ensureTypeRefContext(
  (props: InterfaceDeclarationProps) => {
    const ExprSlot = createSymbolSlot();

    effect(() => {
      if (ExprSlot.ref.value) {
        const takenSymbols = ExprSlot.ref.value;
        for (const symbol of takenSymbols) {
          // ignore non-transient symbols (likely not the result of an expression).
          if (symbol.isTransient) {
            symbol.moveMembersTo(sym);
          }
        }
      }
    });

    const children = childrenArray(() => props.children);

    const typeParametersChildren =
      findKeyedChild(children, TypeParameters.tag) ?? undefined;

    const sTypeParameters =
      typeParametersChildren ?
        <>
          {"<"}
          {typeParametersChildren}
          {">"}
        </>
      : <TypeParameters parameters={props.typeParameters} />;

    const extendsPart = props.extends ? <> extends {props.extends}</> : "";
    const filteredChildren = findUnkeyedChildren(children);
    const currentScope = useTSLexicalScope();

    const sym = new TSOutputSymbol(props.name, currentScope.types, {
      refkeys: props.refkey,
      default: props.default,
      export: props.export,
      metadata: props.metadata,
      tsFlags: TSSymbolFlags.TypeSymbol,
      namePolicy: useTSNamePolicy().for("interface"),
    });
    return (
      <>
        <Show when={Boolean(props.doc)}>
          <JSDoc children={props.doc} />
          <hbr />
        </Show>
        <Declaration {...props} nameKind="interface" kind="type" symbol={sym}>
          interface <Name />
          {sTypeParameters}
          {extendsPart}{" "}
          <ExprSlot>
            <InterfaceExpression>{filteredChildren}</InterfaceExpression>
          </ExprSlot>
        </Declaration>
      </>
    );
  },
);

/**
 * Create a TypeScript interface declaration.
 *
 * @remarks
 *
 * This component will declare a symbol for this interface. The `export` and
 * `default` boolean props determine whether and how this symbol is exported
 * from the package.
 */
export function InterfaceDeclaration(props: InterfaceDeclarationProps) {
  return _InterfaceDeclaration(props);
}

InterfaceDeclaration.TypeParameters = TypeParameters;

export interface InterfaceExpressionProps {
  children?: Children;
}

export const InterfaceExpression = ensureTypeRefContext(
  (props: InterfaceExpressionProps) => {
    const symbol = new TSOutputSymbol("", undefined, {
      transient: true,
    });

    emitSymbol(symbol);

    return (
      <group>
        <MemberScope ownerSymbol={symbol}>
          <Block>{props.children}</Block>
        </MemberScope>
      </group>
    );
  },
);

export interface InterfaceMemberPropsBase {
  type?: Children;
  children?: Children;
  readonly?: boolean;
  doc?: Children;
  refkey?: Refkey | Refkey[];
}
export interface InterfacePropertyMemberProps extends InterfaceMemberPropsBase {
  name: string | Namekey;
  optional?: boolean;
  nullish?: boolean;
}

export interface InterfaceIndexerMemberProps extends InterfaceMemberPropsBase {
  indexer: Children;
}

export type InterfaceMemberProps =
  | InterfacePropertyMemberProps
  | InterfaceIndexerMemberProps;

/**
 * Create a TypeScript interface member.
 *
 * An interface member can either provide a `name` prop to create a named
 * property, or an `indexer` prop to define an indexer for the interface.
 *
 * The type of the member can be provided either as the `type` prop or as the
 * children of the component.
 */
export function InterfaceMember(props: InterfaceMemberProps) {
  const type = props.type ?? props.children;
  const readonly = props.readonly ? "readonly " : "";

  if ("indexer" in props) {
    return (
      <>
        <Show when={Boolean(props.doc)}>
          <JSDoc children={props.doc} />
          <hbr />
        </Show>
        {readonly}[{props.indexer}]: {type}
      </>
    );
  }

  const optionality = props.optional ? "?" : "";
  const scope = useTSMemberScope();
  const sym = new TSOutputSymbol(props.name, scope.ownerSymbol.staticMembers, {
    refkeys: props.refkey,
    tsFlags:
      TSSymbolFlags.TypeSymbol |
      ((props.nullish ?? props.optional) ?
        TSSymbolFlags.Nullish
      : TSSymbolFlags.None),
    namePolicy: useTSNamePolicy().for("interface-member"),
  });

  const taken = takeSymbols();

  effect(() => {
    if (taken.size > 1) return;
    const symbol = Array.from(taken)[0];
    if (symbol?.isTransient) {
      symbol.moveMembersTo(sym!);
    }
  });

  return (
    <MemberDeclaration symbol={sym}>
      <Show when={Boolean(props.doc)}>
        <JSDoc children={props.doc} />
        <hbr />
      </Show>
      {readonly}
      <PropertyName />
      {optionality}: {type}
    </MemberDeclaration>
  );
}
