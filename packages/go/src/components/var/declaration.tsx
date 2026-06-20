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

export interface VariableDeclarationProps {
  /** Variable name */
  name: string | Namekey;
  /** Type of the variable declaration */
  type?: Children;
  /** Variable refkey */
  refkey?: Refkey;
  /** Documentation comment */
  doc?: Children;
  /** Whether this is a `const` declaration */
  const?: boolean;
  /** Whether variable should be public (exported) or private (unexported) */
  public?: boolean;
  /** Initializer expression */
  children?: Children;
}

export interface VariableDeclarationGroupProps {
  const?: boolean;
  children: Children;
}

export interface VariableDeclarationGroupContext {
  const: boolean;
  active: boolean;
}

export const VariableDeclarationGroupContext: ComponentContext<VariableDeclarationGroupContext> =
  createContext<VariableDeclarationGroupContext>();

export function VariableDeclarationGroup(props: VariableDeclarationGroupProps) {
  const keyword = computed(() => (props.const ? "const" : "var"));

  return (
    <VariableDeclarationGroupContext.Provider
      value={{ active: true, const: !!props.const }}
    >
      {keyword} (
      <Indent trailingBreak>
        <List hardline>{props.children}</List>
      </Indent>
      )
    </VariableDeclarationGroupContext.Provider>
  );
}

export function VariableDeclaration(props: VariableDeclarationProps) {
  const isFileScope = useGoScope() instanceof GoSourceFileScope;
  const declarationGroupContext = useContext(VariableDeclarationGroupContext);
  const inDeclarationGroup = !!declarationGroupContext?.active;
  const isConst = declarationGroupContext?.const ?? props.const;
  const symbol = createVariableSymbol(props.name, { refkeys: props.refkey, public: props.public });
  const content = memo(() => {
    const keyword = isConst ? "const" : "var";

    if (inDeclarationGroup) {
      if (!props.type && !props.children) {
        if (!isConst) {
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
      } else if (!props.children || isConst || props.type || isFileScope) {
        return (
          <>
            {keyword} <Name /> {props.type}
            {props.type && props.children ? " " : ""}
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
