import {
  emitSymbol,
  instantiateTakenMembersTo as instantiateTakenSymbolsTo,
  OutputSymbolFlags,
} from "@alloy-js/core";
import { createValueSymbol } from "../symbols/index.js";
import {
  FunctionCallExpression,
  FunctionCallExpressionProps,
} from "./FunctionCallExpression.jsx";

export interface NewExpressionProps extends FunctionCallExpressionProps {}

export function NewExpression(props: NewExpressionProps) {
  const sym = createValueSymbol("", {
    flags: OutputSymbolFlags.Transient,
  });
  instantiateTakenSymbolsTo(sym, "static", "instance");
  emitSymbol(sym);
  return (
    <>
      new <FunctionCallExpression {...props} />
    </>
  );
}
