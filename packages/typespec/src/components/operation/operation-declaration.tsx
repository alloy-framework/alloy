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
import {
  TemplateParameterDescriptor,
  TemplateParameters,
} from "../template-parameters/template-parameters.jsx";
import { type ParameterDescriptor, Parameters } from "./parameters.jsx";

export type { ParameterDescriptor } from "./parameters.jsx";

export interface OperationDeclarationProps {
  name: string | Namekey;
  refkey?: Refkey;
  templateParameters?: (string | TemplateParameterDescriptor)[];
  parameters?: ParameterDescriptor[];
  returnType?: Children;
  is?: Children;
  decorators?: Children;
}

export function OperationDeclaration(props: OperationDeclarationProps) {
  if (props.is && (props.parameters || props.returnType)) {
    throw new Error(
      "An operation declaration cannot have both 'is' and 'parameters'/'returnType' properties.",
    );
  }

  const sym = createNamedTypeSymbol(props.name, "operation", {
    refkeys: props.refkey,
    namePolicy: useTypeSpecNamePolicy().for("operation"),
  });

  const parentScope = useScope();
  const namedTypeScope = new NamedTypeScope(sym, parentScope);
  const isInsideInterface =
    parentScope instanceof NamedTypeScope &&
    parentScope.ownerSymbol.kind === "interface";

  return (
    <Declaration symbol={sym}>
      {props.decorators}
      <Scope value={namedTypeScope}>
        {!isInsideInterface && <>op </>}
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
