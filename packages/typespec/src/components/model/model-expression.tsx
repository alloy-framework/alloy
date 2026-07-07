import { Block, Children, onCleanup, Scope, useScope } from "@alloy-js/core";
import { NamedTypeScope } from "../../scopes/named-type.js";
import { NamedTypeSymbol } from "../../symbols/named-type.js";

export interface ModelExpressionProps {
  children?: Children;
}

export function ModelExpression(props: ModelExpressionProps) {
  const parentScope = useScope();
  const sym = new NamedTypeSymbol("{anonymous}", undefined, "model");
  onCleanup(() => sym.delete());
  const scope = new NamedTypeScope(sym, parentScope);

  return (
    <Scope value={scope}>
      <Block>{props.children}</Block>
    </Scope>
  );
}
