import { OutputScope } from "@alloy-js/core";
import { PythonOutputSymbol } from "./python-output-symbol.js";

export class PythonMemberScope extends OutputScope {
  get ownerSymbol() {
    return super.ownerSymbol as PythonOutputSymbol;
  }
}
