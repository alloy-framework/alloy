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
import { createNamedTypeSymbol } from "../../symbols/factories.js";
import { ParameterDescriptor, Parameters } from "../operation/parameters.jsx";
import {
  TemplateParameterDescriptor,
  TemplateParameters,
} from "../template-parameters/template-parameters.jsx";

export interface InterfaceOperationDeclarationProps {
  name: string | Namekey;
  refkey?: Refkey;
  templateParameters?: (string | TemplateParameterDescriptor)[];
  parameters?: ParameterDescriptor[];
  returnType?: Children;
  is?: Children;
}

export function InterfaceOperationDeclaration(
  props: InterfaceOperationDeclarationProps,
) {
  if (props.is && (props.parameters || props.returnType)) {
    throw new Error(
      "An operation declaration cannot have both 'is' and 'parameters'/'returnType' properties.",
    );
  }

  const sym = createNamedTypeSymbol(props.name, "operation", {
    refkeys: props.refkey,
    namePolicy: useTypeSpecNamePolicy().for("operation"),
  });

  const parentScope = useScope() as NamedTypeScope;
  const operationScope = new NamedTypeScope(sym, parentScope);

  return (
    <Declaration symbol={sym}>
      <Scope value={operationScope}>
        <Name />
        {props.templateParameters && (
          <TemplateParameters parameters={props.templateParameters} />
        )}
        {props.is && <> is {props.is}</>}
        {!props.is && (
          <>
            <Parameters parameters={props.parameters} />:{" "}
            {props.returnType ?? "void"}
          </>
        )}
      </Scope>
    </Declaration>
  );
}
