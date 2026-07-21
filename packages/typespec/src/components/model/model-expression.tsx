import type { Children } from "@alloy-js/core";
import { Block, Scope, useScope } from "@alloy-js/core";

import { NamedTypeScope } from "../../scopes/named-type.js";
import { createAnonymousModelSymbol } from "../../symbols/factories.js";

export interface ModelExpressionProps {
  children?: Children;
}

export function ModelExpression(props: ModelExpressionProps) {
  const parentScope = useScope();
  const sym = createAnonymousModelSymbol();
  const scope = new NamedTypeScope(sym, parentScope);

  return (
    <Scope value={scope}>
      <Block>{props.children}</Block>
    </Scope>
  );
}
