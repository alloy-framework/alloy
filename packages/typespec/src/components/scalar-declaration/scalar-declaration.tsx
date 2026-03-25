import {
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

export interface ScalarDeclarationProps {
  name: string | Namekey;
  refkey?: Refkey;
  templateParameters?: (string | TemplateParameterDescriptor)[];
  is?: Children;
  extends?: Children;
}

export function ScalarDeclaration(props: ScalarDeclarationProps) {
  const sym = createNamedTypeSymbol(props.name, "scalar", {
    refkeys: props.refkey,
    namePolicy: useTypeSpecNamePolicy().for("scalar"),
  });
  if (props.is && props.extends) {
    throw new Error(
      "A scalar declaration cannot have both 'is' and 'extends' properties.",
    );
  }

  const parentScope = useScope() as NamespaceScope;
  const namedTypeScope = new NamedTypeScope(sym, parentScope);

  return (
    <>
      <Declaration symbol={sym}>
        <Scope value={namedTypeScope}>
          scalar <Name />
          {props.templateParameters && (
            <TemplateParameters parameters={props.templateParameters} />
          )}
          {props.is && <> is {props.is}</>}
          {props.extends && <> extends {props.extends}</>}
        </Scope>
      </Declaration>
    </>
  );
}
