import { LineComment } from "#components/doc/comment.jsx";
import {
  Children,
  ComponentContext,
  createContext,
  Declaration,
  Indent,
  List,
  Name,
  Refkey,
  Scope,
  Show,
  useContext,
} from "@alloy-js/core";
import { useGoScope } from "../../scopes/contexts.js";
import { createNamedTypeScope } from "../../scopes/factories.js";
import { GoSourceFileScope } from "../../scopes/source-file.js";
import { createTypeSymbol } from "../../symbols/factories.js";
import { NamedTypeSymbol } from "../../symbols/named-type.js";

export interface TypeDeclarationGroupProps {
  children: Children;
}

interface TypeDeclarationGroupContext {
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
  name: string;
  /** Type refkey */
  refkey?: Refkey;
  /** Type symbol */
  symbol?: NamedTypeSymbol;
  /** Documentation comment */
  doc?: Children;
  /** Whether the type is exported */
  exported?: boolean;
  /** Whether the type is an alias */
  alias?: boolean;
  /** Type expression */
  children?: Children;
  // TODO: implement type parameters only on alias
  // typeParameters?: (TypeParameterProps | string)[];
}

export function TypeDeclaration(props: TypeDeclarationProps) {
  const isFileScope = useGoScope() instanceof GoSourceFileScope;

  const typeGroup = useContext(TypeDeclarationGroupContext);

  const symbol =
    props.symbol ??
    createTypeSymbol(props.name, "type", {
      refkeys: props.refkey,
      canExport: isFileScope,
      exported: props.exported,
      // TODO: set aliasTarget when alias is true
    });
  const pointerSymbol = symbol.copy();
  pointerSymbol.pointer = true;
  symbol.pointerSymbol = pointerSymbol;
  const typeScope = createNamedTypeScope(symbol);

  return (
    <>
      <Show when={Boolean(props.doc)}>
        <LineComment children={props.doc} />
        <hbr />
      </Show>
      <Declaration symbol={symbol}>
        {typeGroup?.active ? "" : "type "}
        {props.alias ? "= " : ""}
        <Name /> <Scope value={typeScope}>{props.children}</Scope>
      </Declaration>
    </>
  );
}
