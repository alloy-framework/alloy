import {
  Children,
  createSymbolSlot,
  Declaration,
  For,
  Indent,
  Namekey,
  Refkey,
} from "@alloy-js/core";
import { createParameterSymbol } from "../../symbols/factories.js";
import { Name } from "../Name.jsx";

export interface FunctionParameterProps {
  name: string | Namekey;
  type: Children;
  variadic?: boolean;
  refkey?: Refkey;
}

/** Define a parameter to be used in functions. */
export function FunctionParameter(props: FunctionParameterProps) {
  const TypeSlot = createSymbolSlot();

  const memberSymbol = createParameterSymbol(props.name, {
    refkeys: props.refkey,
    type: TypeSlot.firstSymbol,
  });

  return (
    <Declaration symbol={memberSymbol}>
      <Name /> {props.variadic ? "..." : null}
      <TypeSlot>{props.type}</TypeSlot>
    </Declaration>
  );
}

export interface FunctionParametersProps {
  parameters: FunctionParameterProps[] | undefined;
}

/** Render a collection of parameters */
export function FunctionParameters(props: FunctionParametersProps) {
  const params = props.parameters ?? [];
  for (let i = 0; i < (params.length ?? 0); i++) {
    if (i < params.length - 1 && params[i].variadic) {
      throw new Error("Variadic parameter must be the last parameter.");
    }
  }
  return (
    <group>
      {"("}
      {props.parameters && (
        <Indent softline>
          <For
            each={params}
            joiner={
              <>
                {","}
                <ifBreak flatContents=" ">
                  <sbr />
                </ifBreak>
              </>
            }
            ender={<ifBreak>,</ifBreak>}
          >
            {(param) => <FunctionParameter {...param} />}
          </For>
        </Indent>
      )}
      <sbr />
      {")"}
    </group>
  );
}
