import { IndentState } from "../components/Indent.jsx";
import {
  ComponentContext,
  createContext,
  createNamedContext,
} from "../context.js";

export const IndentContext: ComponentContext<IndentState> = createNamedContext(
  "Indent",
  {
    level: 0,
    indent: "  ",
    indentString: "",
  },
);

export const TestContext: ComponentContext<string> = createContext("test");
