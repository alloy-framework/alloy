import {
  Children,
  Declaration,
  For,
  Indent,
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

export interface ParameterDescriptor {
  name: string;
  type: Children;
  optional?: boolean;
}

export interface OperationDeclarationProps {
  name: string | Namekey;
  refkey?: Refkey;
  templateParameters?: (string | TemplateParameterDescriptor)[];
  parameters?: ParameterDescriptor[];
  returnType?: Children;
  is?: Children;
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

  const parentScope = useScope() as NamespaceScope;
  const namedTypeScope = new NamedTypeScope(sym, parentScope);

  return (
    <Declaration symbol={sym}>
      <Scope value={namedTypeScope}>
        op <Name />
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

function Parameters(props: { parameters?: ParameterDescriptor[] }) {
  return (
    <group>
      (
      {props.parameters && props.parameters.length > 0 && (
        <Indent nobreak>
          <For each={props.parameters} joiner={", "}>
            {(param) => (
              <>
                <softline />
                {param.name}
                {param.optional ? "?" : ""}: {param.type}
              </>
            )}
          </For>
        </Indent>
      )}
      <softline />)
    </group>
  );
}
