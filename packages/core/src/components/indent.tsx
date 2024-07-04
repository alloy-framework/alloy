import { createContext, useContext } from "../context.js";
import { Children, getContext } from "../jsx-runtime.js";

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

export function Indent({ indent, children }: IndentProps) {
  const previousIndent = useContext(IndentContext) ?? {
    level: 0,
    indent: indent ?? "  ",
    indentString: ""
  };

  const level = previousIndent.level + 1;

  const currentIndent = {
    level,
    indent: indent ?? previousIndent.indent,
    indentString: (indent ?? previousIndent.indent).repeat(level),
  };

  return <IndentContext.Provider value={currentIndent}>{children}</IndentContext.Provider>;
}

interface NoLeadingIndentProps {
  children?: Children
}

export function NoLeadingIndent(props: NoLeadingIndentProps) {
  const previousIndent: IndentState = useContext(IndentContext) ?? {
    level: 0,
    indent: "  ",
    indentString: ""
  }

  const currentIndent: IndentState = {
    ... previousIndent,
    noLeading: true
  }
  return <IndentContext.Provider value={currentIndent}>{props.children}</IndentContext.Provider>
}

export function shouldIndentComponent() {
  let current = getContext()?.owner;
  if ((current as any)?.context![IndentContext.id]?.noLeading) {
    throw new Error("Shoul dindent uhoh");
    return false;
  }

  return true;
}