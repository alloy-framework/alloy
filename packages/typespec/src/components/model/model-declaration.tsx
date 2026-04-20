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

export interface ModelDeclarationProps {
  name: string | Namekey;
  refkey?: Refkey;
  templateParameters?: (string | TemplateParameterDescriptor)[];
  extends?: Children;
  is?: Children;
  children?: Children;
}

export function ModelDeclaration(props: ModelDeclarationProps) {
  if (props.is && (props.extends || props.children)) {
    throw new Error(
      "A model declaration cannot have both 'is' and 'extends'/'children' properties.",
    );
  }

  const sym = createNamedTypeSymbol(props.name, "model", {
    refkeys: props.refkey,
    namePolicy: useTypeSpecNamePolicy().for("model"),
  });

  const parentScope = useScope() as NamespaceScope;
  const namedTypeScope = new NamedTypeScope(sym, parentScope);

  return (
    <Declaration symbol={sym}>
      <Scope value={namedTypeScope}>
        model <Name />
        {props.templateParameters && (
          <TemplateParameters parameters={props.templateParameters} />
        )}
        {props.is && <> is {props.is}</>}
        {!props.is && (
          <>
            {props.extends && <> extends {props.extends}</>}{" "}
            <Block>{props.children}</Block>
          </>
        )}
      </Scope>
    </Declaration>
  );
}
