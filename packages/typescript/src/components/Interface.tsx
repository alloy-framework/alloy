import {
  Block,
  Children,
  childrenArray,
  emitSymbol,
  findKeyedChild,
  findUnkeyedChildren,
  MemberScope,
  Name,
  OutputSymbolFlags,
  Refkey,
  Show,
  useMemberScope,
} from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { BaseDeclarationProps, Declaration } from "./Declaration.js";
import { JSDoc } from "./JSDoc.jsx";

import { TypeParameterDescriptor } from "../parameter-descriptor.js";
import { TSOutputSymbol } from "../symbols/ts-output-symbol.js";
import { TypeParameters } from "./FunctionBase.jsx";
import { MemberDeclaration } from "./MemberDeclaration.jsx";
import { PropertyName } from "./PropertyName.jsx";
import { ensureTypeRefContext } from "./TypeRefContext.jsx";

export interface InterfaceDeclarationProps extends BaseDeclarationProps {
  extends?: Children;

  /**
   * The generic type parameters of the interface.
   */
  typeParameters?: TypeParameterDescriptor[] | string[];
}

const _InterfaceDeclaration = ensureTypeRefContext(
  (props: InterfaceDeclarationProps) => {
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
    const flags = OutputSymbolFlags.StaticMemberContainer;

    const filteredChildren = findUnkeyedChildren(children);

    return (
      <>
        <Show when={Boolean(props.doc)}>
          <JSDoc children={props.doc} />
          <hbr />
        </Show>
        <Declaration {...props} nameKind="interface" flags={flags} kind="type">
          interface <Name />
          {sTypeParameters}
          {extendsPart}{" "}
          <InterfaceExpression>{filteredChildren}</InterfaceExpression>
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
    const symbol = new TSOutputSymbol("", {
      flags:
        OutputSymbolFlags.StaticMemberContainer | OutputSymbolFlags.Transient,
    });

    emitSymbol(symbol);

    return (
      <group>
        <MemberScope owner={symbol}>
          <Block>{props.children}</Block>
        </MemberScope>
      </group>
    );
  },
);

export interface InterfaceMemberProps {
  name?: string;
  indexer?: Children;
  type?: Children;
  children?: Children;
  optional?: boolean;
  nullish?: boolean;
  readonly?: boolean;
  doc?: Children;
  refkey?: Refkey | Refkey[];
}

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
  const optionality = props.optional ? "?" : "";
  const readonly = props.readonly ? "readonly " : "";

  if (props.indexer) {
    return (
      <>
        {readonly}[{props.indexer}]: {type}
      </>
    );
  } else {
    const namer = useTSNamePolicy();
    const name = namer.getName(props.name!, "interface-member");
    const memberScope = useMemberScope();

    if (memberScope) {
      return (
        <MemberDeclaration
          static
          exactName={name}
          kind="type"
          nameKind="interface-member"
          flags={OutputSymbolFlags.StaticMember}
          nullish={props.nullish ?? props.optional}
          refkey={props.refkey}
        >
          <Show when={Boolean(props.doc)}>
            <JSDoc children={props.doc} />
            <hbr />
          </Show>
          {readonly}
          <PropertyName />
          {optionality}: {type}
        </MemberDeclaration>
      );
    } else {
      return (
        <>
          <Show when={Boolean(props.doc)}>
            <JSDoc children={props.doc} />
            <hbr />
          </Show>
          {readonly}
          <PropertyName name={name} />
          {optionality}: {type}
        </>
      );
    }
  }
}
