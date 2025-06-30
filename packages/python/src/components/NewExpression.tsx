import {
  emitSymbol,
  instantiateTakenMembersTo as instantiateTakenSymbolsTo,
  OutputSymbolFlags,
} from "@alloy-js/core";
import { PythonOutputSymbol } from "../symbols/python-output-symbol.js";
import {
  FunctionCallExpression,
  FunctionCallExpressionProps,
} from "./FunctionCallExpression.jsx";
// TODO: Implement support for named parameters
export interface NewExpressionProps extends FunctionCallExpressionProps {}

export function NewExpression(props: NewExpressionProps) {
  const sym = new PythonOutputSymbol("", {
    flags: OutputSymbolFlags.Transient,
  });
  instantiateTakenSymbolsTo(sym);
  emitSymbol(sym);
  return (
    <>
      <FunctionCallExpression {...props} />
    </>
  );
}
