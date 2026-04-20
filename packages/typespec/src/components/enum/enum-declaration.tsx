import {
  Block,
  Children,
  Declaration,
  Name,
  Namekey,
  Refkey,
  Scope,
  useScope,
} from "@alloy-js/core";
import { useTypeSpecNamePolicy } from "../../name-policy.js";
import { NamedTypeScope } from "../../scopes/named-type.js";
import { NamespaceScope } from "../../scopes/namespace.js";
import { createNamedTypeSymbol } from "../../symbols/factories.js";

export interface EnumDeclarationProps {
  name: string | Namekey;
  refkey?: Refkey;
  children?: Children;
}

export function EnumDeclaration(props: EnumDeclarationProps) {
  const sym = createNamedTypeSymbol(props.name, "enum", {
    refkeys: props.refkey,
    namePolicy: useTypeSpecNamePolicy().for("enum"),
  });

  const parentScope = useScope() as NamespaceScope;
  const namedTypeScope = new NamedTypeScope(sym, parentScope);

  return (
    <Declaration symbol={sym}>
      <Scope value={namedTypeScope}>
        enum <Name /> <Block>{props.children}</Block>
      </Scope>
    </Declaration>
  );
}
