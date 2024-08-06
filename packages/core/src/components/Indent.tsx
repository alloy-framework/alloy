import { createContext, useContext } from "../context.js";
import { Children, getContext } from "@alloy-js/core/jsx-runtime";
if ((globalThis as any).alloyIndent) {
  throw "FAIL";
}
(globalThis as any).alloyIndent = true;
export const IndentContext = createContext<IndentState>({
  level: 0,
  indent: "  ",
  indentString: ""
});

export interface IndentProps {
  children?: Children;
  indent?: string;
}

export interface IndentState {
  level: number;
  indent: string;
  indentString: string; // awful name
  noLeading?: boolean;
}

export function Indent(props: IndentProps) {
  console.log("Indent component!");
  const previousIndent = useContext(IndentContext) ?? {
    level: 0,
    indent: props.indent ?? "  ",
    indentString: ""
  };

  const level = previousIndent.level + 1;

  const currentIndent = {
    level,
    indent: props.indent ?? previousIndent.indent,
    indentString: (props.indent ?? previousIndent.indent).repeat(level),
  };

  return <IndentContext.Provider value={currentIndent}>{props.children}</IndentContext.Provider>;
}