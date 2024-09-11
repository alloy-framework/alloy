import { IndentState } from "../components/Indent.jsx";
import { ComponentContext, createContext } from "../context.js";

export const IndentContext: ComponentContext<IndentState> = createContext({
  level: 0,
  indent: "  ",
  indentString: "",
});

export const TestContext: ComponentContext<string> = createContext("test");
