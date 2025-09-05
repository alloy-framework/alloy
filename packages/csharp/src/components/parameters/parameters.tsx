import {
  Children,
  code,
  createSymbolSlot,
  Declaration,
  For,
  Indent,
  Namekey,
  Refkey,
} from "@alloy-js/core";
import { createParameterSymbol } from "../../symbols/factories.js";
import { Name } from "../Name.jsx";

export interface ParameterProps {
  name: string | Namekey;
  type: Children;
  /** If the parmaeter is optional(without default value) */
  optional?: boolean;
  /** Default value for the parameter */
  default?: Children;

  refkey?: Refkey;
}

/** Define a parameter to be used in class or interface method. */
export function Parameter(props: ParameterProps) {
  const TypeSlot = createSymbolSlot();

  const memberSymbol = createParameterSymbol(props.name, {
    refkeys: props.refkey,
    type: TypeSlot.firstSymbol,
    isNullable: props.optional,
  });

  return (
    <Declaration symbol={memberSymbol}>
      <TypeSlot>{props.type}</TypeSlot>
      {props.optional ? "?" : ""} <Name />
      {props.default ? code` = ${props.default}` : ""}
    </Declaration>
  );
}

export interface ParametersProps {
  parameters: ParameterProps[] | undefined;
}

/** Render a collection of parameters */
export function Parameters(props: ParametersProps) {
  return (
    <group>
      {"("}
      {props.parameters && (
        <Indent nobreak>
          <For each={props.parameters} joiner={", "}>
            {(param) => (
              <>
                <softline />
                <Parameter {...param} />
              </>
            )}
          </For>
        </Indent>
      )}
      <softline />
      {")"}
    </group>
  );
}
