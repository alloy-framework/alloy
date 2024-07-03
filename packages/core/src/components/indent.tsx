import { createContext, useContext } from "../context.js";
import { Children } from "../jsx-runtime.js";

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
}

export function Indent({ indent, children }: IndentProps) {
  const previousIndent = useContext(IndentContext) ?? {
    level: 0,
    indent: indent ?? "  ",
  };

  const level = previousIndent.level + 1;

  const currentIndent = {
    level,
    indent: indent ?? previousIndent.indent,
    indentString: (indent ?? previousIndent.indent).repeat(level),
  };

  return <IndentContext.Provider value={currentIndent}>{children}</IndentContext.Provider>;
}
