import { Binder, OutputScope } from "@alloy-js/core";
import { TSOutputSymbol } from "./ts-output-symbol.js";

export interface TSMemberScope extends OutputScope {
  kind: "member";
  owner: TSOutputSymbol;
  isStatic: boolean;
}

export function createTSMemberScope(
  binder: Binder,
  parent: OutputScope,
  owner: TSOutputSymbol,
  isStatic: boolean = false,
): TSMemberScope {
  return binder.createScope<TSMemberScope>({
    kind: "member",
    name: "members",
    owner,
    parent,
    isStatic,
  });
}
