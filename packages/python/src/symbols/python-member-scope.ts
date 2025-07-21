import { CustomOutputScope } from "./custom-output-scope.js";
import { PythonOutputSymbol } from "./python-output-symbol.js";

export class PythonMemberScope extends CustomOutputScope {
  get kind() {
    return "member" as const;
  }

  get owner() {
    return super.owner as PythonOutputSymbol;
  }
}
