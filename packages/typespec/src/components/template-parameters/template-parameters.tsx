import {
  Children,
  Declaration,
  For,
  Indent,
  Name,
  Namekey,
  Refkey,
} from "@alloy-js/core";
import { createTemplateParameterSymbol } from "../../symbols/factories.js";

export interface TemplateParameterDescriptor {
  name: string | Namekey;
  extends?: Children;
  default?: Children;
  refkey?: Refkey;
}

export interface TemplateParametersProps {
  parameters: (string | TemplateParameterDescriptor)[];
}

export function TemplateParameters(props: TemplateParametersProps) {
  const parameters = normalizeParameters(props.parameters);

  return (
    <>
      {"<"}
      <group>
        <Indent softline>
          <For each={parameters} comma line>
            {(param) => <TemplateParameter {...param} />}
          </For>
        </Indent>
      </group>
      {">"}
    </>
  );
}

function TemplateParameter(props: TemplateParameterDescriptor) {
  const sym = createTemplateParameterSymbol(props.name, {
    refkeys: props.refkey,
  });

  return (
    <Declaration symbol={sym}>
      <Name />
      {props.extends && <> extends {props.extends}</>}
      {props.default && <> = {props.default}</>}
    </Declaration>
  );
}

function normalizeParameters(
  parameters: (string | TemplateParameterDescriptor)[],
): TemplateParameterDescriptor[] {
  return parameters.map((param) => {
    if (typeof param === "string") {
      return { name: param };
    }
    return param;
  });
}
