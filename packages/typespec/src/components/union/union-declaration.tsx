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
import {
  TemplateParameterDescriptor,
  TemplateParameters,
} from "../template-parameters/template-parameters.jsx";

export interface UnionDeclarationProps {
  name: string | Namekey;
  refkey?: Refkey;
  templateParameters?: (string | TemplateParameterDescriptor)[];
  children?: Children;
}

export function UnionDeclaration(props: UnionDeclarationProps) {
  const sym = createNamedTypeSymbol(props.name, "union", {
    refkeys: props.refkey,
    namePolicy: useTypeSpecNamePolicy().for("union"),
  });

  const parentScope = useScope() as NamespaceScope;
  const namedTypeScope = new NamedTypeScope(sym, parentScope);

  return (
    <Declaration symbol={sym}>
      <Scope value={namedTypeScope}>
        union <Name />
        {props.templateParameters && (
          <TemplateParameters parameters={props.templateParameters} />
        )}{" "}
        <Block>{props.children}</Block>
      </Scope>
    </Declaration>
  );
}
