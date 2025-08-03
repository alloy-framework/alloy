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
  OutputSymbolFlags,
  Refkey,
  Show,
  takeSymbols,
} from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { BaseDeclarationProps, Declaration } from "./Declaration.js";
import { JSDoc } from "./JSDoc.jsx";

import { TypeParameterDescriptor } from "../parameter-descriptor.js";
import { useTSLexicalScope, useTSMemberScope } from "../symbols/scopes.js";
import { TSOutputSymbol, TSSymbolFlags } from "../symbols/ts-output-symbol.js";
import { TypeParameters } from "./FunctionBase.jsx";
import { MemberDeclaration } from "./MemberDeclaration.jsx";
import { MemberScope } from "./MemberScope.jsx";
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
    const name = useTSNamePolicy().getName(props.name, "interface");
    const filteredChildren = findUnkeyedChildren(children);
    const currentScope = useTSLexicalScope();

    const sym = new TSOutputSymbol(name, currentScope.types, {
      refkeys: props.refkey,
      default: props.default,
      export: props.export,
      metadata: props.metadata,
      tsFlags: TSSymbolFlags.TypeSymbol,
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
      flags: OutputSymbolFlags.Transient,
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
    let sym = undefined;
    if (props.name) {
      const scope = useTSMemberScope();
      sym = new TSOutputSymbol(name, scope.ownerSymbol.staticMembers, {
        refkeys: props.refkey,
        tsFlags:
          TSSymbolFlags.TypeSymbol |
          ((props.nullish ?? props.optional) ?
            TSSymbolFlags.Nullish
          : TSSymbolFlags.None),
      });

      const taken = takeSymbols();

      effect(() => {
        if (taken.size > 1) return;
        const symbol = Array.from(taken)[0];
        if (symbol?.flags & OutputSymbolFlags.Transient) {
          symbol.moveMembersTo(sym!);
        }
      });
    } else {
      // noop
      takeSymbols();
    }

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
}
