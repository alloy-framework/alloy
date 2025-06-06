import { OutputScope } from "@alloy-js/core";
import { PythonOutputSymbol } from "./python-output-symbol.js";

export class PythonMemberScope extends OutputScope {
  get kind() {
    return "member" as const;
  }

  get owner() {
    return super.owner as PythonOutputSymbol;
  }
}
