import { Declaration as CoreDeclaration, For } from "@alloy-js/core";
import { ParameterDescriptor } from "../parameter-descriptor.js";
import { createParameterSymbol } from "../symbols/factories.js";

export interface ParametersProps {
  parameters?: readonly ParameterDescriptor[];
  wrap?: boolean;
}

function Parameter(props: { parameter: ParameterDescriptor }) {
  const parameterSymbol = createParameterSymbol(props.parameter.name);
  const typePrefix =
    props.parameter.refType ? `${props.parameter.refType} ` : "";

  return (
    <CoreDeclaration symbol={parameterSymbol}>
      {props.parameter.mutable ? "mut " : ""}
      {parameterSymbol.name}
      {props.parameter.type !== undefined ?
        <>
          {": "}
          {typePrefix}
          {props.parameter.type}
        </>
      : null}
    </CoreDeclaration>
  );
}

export function Parameters(props: ParametersProps) {
  const shouldWrap = props.wrap ?? true;

  return (
    <>
      {shouldWrap ? "(" : null}
      {props.parameters && props.parameters.length > 0 ?
        <For each={props.parameters} joiner={", "}>
          {(parameter) => <Parameter parameter={parameter} />}
        </For>
      : null}
      {shouldWrap ? ")" : null}
    </>
  );
}
