import {
  emitSymbol,
  instantiateTakenMembersTo as instantiateTakenSymbolsTo,
  OutputSymbolFlags,
} from "@alloy-js/core";
import { TSOutputSymbol } from "../symbols/ts-output-symbol.js";
import {
  FunctionCallExpression,
  FunctionCallExpressionProps,
} from "./FunctionCallExpression.jsx";

export interface NewExpressionProps extends FunctionCallExpressionProps {}

export function NewExpression(props: NewExpressionProps) {
  const sym = new TSOutputSymbol("", {
    flags: OutputSymbolFlags.Transient,
  });
  instantiateTakenSymbolsTo(sym);
  emitSymbol(sym);
  return (
    <>
      new <FunctionCallExpression {...props} />
    </>
  );
}
