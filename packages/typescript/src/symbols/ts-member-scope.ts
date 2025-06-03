import { OutputScope } from "@alloy-js/core";
import { TSOutputSymbol } from "./ts-output-symbol.js";

export class TSMemberScope extends OutputScope {
  get kind() {
    return "member" as const;
  }

  get owner() {
    return super.owner as TSOutputSymbol;
  }
}
