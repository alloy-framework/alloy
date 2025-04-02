import { For, Show } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { JSDocParagraph } from "./JSDocParagraph.jsx";
import { ParameterDescriptor } from "./ParameterDescriptor.js";

export interface JSDocParametersProps {
  parameters: ParameterDescriptor[];
}

/**
 * A component that creates a JSDoc block with `@param` tags for each parameter.
 */
export function JSDocParameters(props: JSDocParametersProps) {
  return (
    <For each={props.parameters}>
      {(param) => (
        <JSDocParam
          name={param.name}
          type={param.type}
          optional={param.optional}
          hyphen
        >
          {param.doc}
        </JSDocParam>
      )}
    </For>
  );
}

export interface JSDocParamProps {
  name: Children;
  type?: Children;
  children?: Children;
  hyphen?: boolean;
  optional?: boolean;
  defaultValue?: Children;
}

/**
 * Create a JSDoc parameter set off with `@param`.
 */
export function JSDocParam(props: JSDocParamProps) {
  return (
    <>
      {"@param "}
      <JSDocParamType type={props.type} />
      <JSDocParamName
        name={props.name}
        optional={props.optional}
        defaultValue={props.defaultValue}
      />
      <JSDocParamDescription hyphen={props.hyphen} children={props.children} />
    </>
  );
}

interface JSDocParamTypeProps {
  type?: Children;
}

function JSDocParamType(props: JSDocParamTypeProps) {
  return (
    <>
      <Show when={Boolean(props.type)}>
        {"{"}
        {props.type}
        {"} "}
      </Show>
    </>
  );
}

interface JSDocParamNameProps {
  name: Children;
  optional?: boolean;
  defaultValue?: Children;
}

function JSDocParamName(props: JSDocParamNameProps) {
  return (
    <>
      <Show when={props.optional}>{"["}</Show>
      {props.name}
      <Show when={Boolean(props.defaultValue)}>={props.defaultValue}</Show>
      <Show when={props.optional}>{"]"}</Show>
    </>
  );
}

interface JSDocParamDescriptionProps {
  children?: Children;
  hyphen?: boolean;
}

function JSDocParamDescription(props: JSDocParamDescriptionProps) {
  return (
    <Show when={Boolean(props.children)}>
      <Show when={props.hyphen} children={" - "} />
      <Show when={!props.hyphen} children={" "} />
      <align width={2}>
        <JSDocParagraph>{props.children}</JSDocParagraph>
      </align>
    </Show>
  );
}
