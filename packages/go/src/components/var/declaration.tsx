import {
  Children,
  ComponentContext,
  computed,
  createContext,
  Declaration,
  Indent,
  List,
  memo,
  Name,
  Namekey,
  Refkey,
  Show,
  useContext,
} from "@alloy-js/core";
import { useGoScope } from "../../scopes/contexts.js";
import { GoSourceFileScope } from "../../scopes/source-file.js";
import { createVariableSymbol } from "../../symbols/factories.js";
import { LineComment } from "../doc/comment.jsx";

export interface VarDeclarationProps {
  /** Variable name */
  name: string | Namekey;
  /** Type of the variable declaration */
  type?: Children;
  /** Variable refkey */
  refkey?: Refkey;
  /** Documentation comment */
  doc?: Children;
  /** Whether the variable is exported */
  exported?: boolean;
  /** Whether this is a `const` declaration */
  const?: boolean;
  /** Initializer expression */
  children?: Children;
}

export interface VarDeclarationGroupProps {
  const?: boolean;
  children: Children;
}

export interface VarDeclarationGroupContext {
  const: boolean;
  active: boolean;
}

export const VarDeclarationGroupContext: ComponentContext<VarDeclarationGroupContext> =
  createContext<VarDeclarationGroupContext>();

export function VarDeclarationGroup(props: VarDeclarationGroupProps) {
  const keyword = computed(() => (props.const ? "const" : "var"));

  return (
    <VarDeclarationGroupContext.Provider
      value={{ active: true, const: !!props.const }}
    >
      {keyword} (
      <Indent trailingBreak>
        <List hardline>{props.children}</List>
      </Indent>
      )
    </VarDeclarationGroupContext.Provider>
  );
}

export function VarDeclaration(props: VarDeclarationProps) {
  const isFileScope = useGoScope() instanceof GoSourceFileScope;
  const declarationGroupContext = useContext(VarDeclarationGroupContext);
  const inDeclarationGroup = !!declarationGroupContext?.active;
  const symbol = createVariableSymbol(props.name, {
    refkeys: props.refkey,
    canExport: isFileScope,
    isExported: props.exported,
  });
  const content = memo(() => {
    const keyword = props.const ? "const" : "var";

    if (inDeclarationGroup) {
      if (!props.type && !props.children) {
        if (!props.const) {
          throw new Error(
            "Variable declaration must have a type or initializer.",
          );
        }
        return <Name />;
      } else if (props.type && props.children) {
        return (
          <>
            <Name /> {props.type} = {props.children}
          </>
        );
      } else if (props.type) {
        if (declarationGroupContext?.const) {
          throw new Error("Const declaration must have an initializer.");
        }
        return (
          <>
            <Name /> {props.type}
          </>
        );
      } else if (props.children) {
        return (
          <>
            <Name /> = {props.children}
          </>
        );
      }
    } else {
      if (!props.type && !props.children) {
        throw new Error(
          "Variable declaration must have a type or initializer.",
        );
      } else if (!props.children || props.const || props.type || isFileScope) {
        return (
          <>
            {keyword} <Name /> {props.type}
            {props.type ? " " : ""}
            {props.children ? "= " : ""}
            {props.children}
          </>
        );
      } else {
        return (
          <>
            <Name /> :{props.children ? "= " : ""}
            {props.children}
          </>
        );
      }
    }
  });

  return (
    <>
      <Show when={Boolean(props.doc)}>
        <LineComment children={props.doc} />
        <hbr />
      </Show>
      <Declaration symbol={symbol}>{content}</Declaration>
    </>
  );
}
