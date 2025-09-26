import {
  Children,
  ComponentContext,
  createContext,
  Declaration,
  Indent,
  List,
  Name,
  Namekey,
  Refkey,
  Scope,
  Show,
  useContext,
} from "@alloy-js/core";
import { createNamedTypeScope } from "../../scopes/factories.js";
import { createTypeSymbol } from "../../symbols/factories.js";
import {
  NamedTypeSymbol,
  TypeParameterProps,
} from "../../symbols/named-type.js";
import { LineComment } from "../doc/comment.js";
import { TypeParameters } from "../parameters/typeparameters.js";

export interface TypeDeclarationGroupProps {
  children: Children;
}

export interface TypeDeclarationGroupContext {
  active: boolean;
}

export const TypeDeclarationGroupContext: ComponentContext<TypeDeclarationGroupContext> =
  createContext<TypeDeclarationGroupContext>();

export function TypeDeclarationGroup(props: TypeDeclarationGroupProps) {
  return (
    <TypeDeclarationGroupContext.Provider value={{ active: true }}>
      type (
      <Indent trailingBreak>
        <List hardline>{props.children}</List>
      </Indent>
      )
    </TypeDeclarationGroupContext.Provider>
  );
}

export interface TypeDeclarationProps {
  /** Type name */
  name: string | Namekey;
  /** Type refkey */
  refkey?: Refkey;
  /** Type symbol */
  symbol?: NamedTypeSymbol;
  /** Documentation comment */
  doc?: Children;
  /** Whether the type is an alias */
  alias?: boolean;
  /** Type expression */
  children?: Children;
  /** Type parameters */
  typeParameters?: TypeParameterProps[];
}

export function TypeDeclaration(props: TypeDeclarationProps) {
  const typeGroup = useContext(TypeDeclarationGroupContext);

  const symbol =
    props.symbol ??
    createTypeSymbol(props.name, "type", {
      refkeys: props.refkey,
      typeParameters: props.typeParameters,
      // TODO: set aliasTarget when alias is true
    });
  const typeScope = createNamedTypeScope(symbol);

  return (
    <>
      <Show when={Boolean(props.doc)}>
        <LineComment children={props.doc} />
        <hbr />
      </Show>
      <Declaration symbol={symbol}>
        {typeGroup?.active ? "" : "type "}
        <Name />
        <Scope value={typeScope}>
          <TypeParameters parameters={props.typeParameters} />
          {props.alias ? " = " : " "}
          {props.children}
        </Scope>
      </Declaration>
    </>
  );
}
