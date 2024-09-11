import { Children } from "@alloy-js/core/jsx-runtime";
import { useContext } from "../context.js";
import { IndentContext } from "../context/indent.js";

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
  const previousIndent = useContext(IndentContext) ?? {
    level: 0,
    indent: props.indent ?? "  ",
    indentString: "",
  };

  const level = previousIndent.level + 1;

  const currentIndent = {
    level,
    indent: props.indent ?? previousIndent.indent,
    indentString: (props.indent ?? previousIndent.indent).repeat(level),
  };

  return <IndentContext.Provider value={currentIndent}>{props.children}</IndentContext.Provider>;
}
