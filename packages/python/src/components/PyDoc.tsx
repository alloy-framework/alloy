import { For, Indent, List, Prose, Show, childrenArray } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { ParameterDescriptor } from "../parameter-descriptor.js";
import { Atom } from "./index.js";

interface GoogleStyleDocParamTypeProps {
  type?: Children;
  optional?: boolean;
}

function GoogleStyleDocParamType(props: GoogleStyleDocParamTypeProps) {
  return (
    <>
      <Show when={Boolean(props.type)}>
        {" ("}
        {props.type}
        <Show when={props.optional}>{", optional"}</Show>
        {")"}
      </Show>
    </>
  );
}

interface GoogleStyleDocParamNameProps {
  name: Children;
}

function GoogleStyleDocParamName(props: GoogleStyleDocParamNameProps) {
  return <>{props.name}</>;
}

interface GoogleStyleDocParamDescriptionProps {
  children?: Children;
  defaultValue?: Children;
}

function GoogleStyleDocParamDescription(
  props: GoogleStyleDocParamDescriptionProps,
) {
  return (
    <Show when={Boolean(props.children)}>
      {": "}
      <align width={4}>
        <Prose>{props.children}</Prose>
        <Show when={Boolean(props.defaultValue)}>
          {" "}
          Defaults to <Atom jsValue={props.defaultValue}></Atom>.
        </Show>
      </align>
    </Show>
  );
}

export interface GoogleStyleDocParamProps {
  name: Children;
  type?: Children;
  children?: Children;
  optional?: boolean;
  defaultValue?: Children;
}

/**
 * Create a GoogleStyleDoc parameter.
 */
export function GoogleStyleDocParam(props: GoogleStyleDocParamProps) {
  return (
    <>
      <GoogleStyleDocParamName name={props.name} />
      <GoogleStyleDocParamType type={props.type} optional={props.optional} />
      <GoogleStyleDocParamDescription
        children={props.children}
        defaultValue={props.defaultValue}
      />
    </>
  );
}

export interface GoogleStyleDocParamsProps {
  parameters: ParameterDescriptor[] | string[];
}

/**
 * A component that creates a GoogleStyleDoc block for parameters.
 */
export function GoogleStyleDocParams(props: GoogleStyleDocParamsProps) {
  const parameters = normalizeParametersForDoc(props.parameters);
  return (
    <>
      {"Args:"}
      <Indent>
        <List doubleHardline>
          {parameters.map((param) => (
            <GoogleStyleDocParam
              name={param.name}
              type={param.type}
              optional={param.optional}
            >
              {param.doc}
            </GoogleStyleDocParam>
          ))}
        </List>
      </Indent>
    </>
  );
}

export interface GoogleStyleDocReturnProps {
  message: string;
}

/**
 * A component that creates a GoogleStyleDoc block for parameters.
 */
export function GoogleStyleDocReturn(props: GoogleStyleDocReturnProps) {
  return (
    <>
      {"Returns:"}
      <Indent>{props.message}</Indent>
    </>
  );
}

export interface GoogleStyleDocRaisesProps {
  message: string;
}

/**
 * A component that creates a GoogleStyleDoc block for parameters.
 */
export function GoogleStyleDocRaises(props: GoogleStyleDocRaisesProps) {
  return (
    <>
      {"Raises:"}
      <Indent>{props.message}</Indent>
    </>
  );
}

export interface GoogleStyleFunctionDocProps
  extends Omit<FunctionDocProps, "style"> {}

/**
 * A component that creates a GoogleStyleFunctionDoc block for parameters.
 */
export function GoogleStyleFunctionDoc(props: GoogleStyleFunctionDocProps) {
  return (
    <>
      <PyDoc>
        <Show when={props.description !== undefined}>
          <List doubleHardline>{props.description.map((param) => param)}</List>
        </Show>
        <Show when={props.parameters.length > 0}>
          <GoogleStyleDocParams parameters={props.parameters} />
        </Show>
        <Show when={props.returns !== undefined}>
          <GoogleStyleDocReturn message={props.returns!} />
        </Show>
        <Show when={props.raises.length > 0}>
          {props.raises.map((param) => (
            <GoogleStyleDocRaises message={param} />
          ))}
        </Show>
      </PyDoc>
      <hbr />
    </>
  );
}

export interface FunctionDocProps {
  description: Children[];
  parameters: ParameterDescriptor[] | string[];
  returns?: string;
  raises: string[];
  style?: "google";
}

/**
 * A component that creates a FunctionDoc block for parameters.
 */
export function FunctionDoc(props: FunctionDocProps) {
  const style = props.style ?? "google";
  if (style === "google") {
    return (
      <GoogleStyleFunctionDoc
        description={props.description}
        parameters={props.parameters}
        returns={props.returns}
        raises={props.raises}
      />
    );
  }
}

export interface ClassDocProps {
  description: Children[];
  parameters: ParameterDescriptor[] | string[];
  style?: "google";
}

/**
 * A component that creates a ClassDoc block for parameters.
 */
export function ClassDoc(props: ClassDocProps) {
  const style = props.style ?? "google";
  if (style === "google") {
    return (
      <GoogleStyleClassDoc
        description={props.description}
        parameters={props.parameters}
      />
    );
  }
}

export interface GoogleStyleClassDocProps
  extends Omit<ClassDocProps, "style"> {}

/**
 * A component that creates a GoogleStyleClassDoc block for parameters.
 */
export function GoogleStyleClassDoc(props: GoogleStyleClassDocProps) {
  return (
    <>
      <PyDoc>
        <Show when={props.description !== undefined}>
          <List doubleHardline>{props.description.map((param) => param)}</List>
        </Show>
        <Show when={props.parameters.length > 0}>
          <GoogleStyleDocParams parameters={props.parameters} />
        </Show>
      </PyDoc>
      <hbr />
    </>
  );
}

export interface PyDocExampleProps {
  children: Children;
}

/**
 * Create a PyDoc example, which is prepended by \>\>.
 */
export function PyDocExample(props: PyDocExampleProps) {
  const children = childrenArray(() => props.children);
  let lines: string[] = [];

  if (children.length === 1 && typeof children[0] === "string") {
    // Split, trim each line, and filter out empty lines
    lines = children[0]
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  } else {
    // For non-string children, filter out empty/whitespace-only strings
    lines = children
      .map((child) => (typeof child === "string" ? child : ""))
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }

  return (
    <>
      <For each={lines}>
        {(line) => (
          <>
            {">> "}
            {line}
          </>
        )}
      </For>
    </>
  );
}

function normalizeParametersForDoc(
  parameters: ParameterDescriptor[] | string[],
): ParameterDescriptor[] {
  if (parameters.some((p) => typeof p === "string")) {
    return [];
  }

  return parameters as ParameterDescriptor[];
}

export interface PyDocProps {
  children: Children;
}

/**
 * A PyDoc comment. The children of this component are joined with two hard
 * linebreaks. This is useful for creating PyDoc comments with multiple paragraphs.
 */
export function PyDoc(props: PyDocProps) {
  return (
    <>
      {'"""'}
      <hbr />
      <List doubleHardline>{childrenArray(() => props.children)}</List>
      <hbr />
      {'"""'}
    </>
  );
}

export interface SimpleCommentBlockProps {
  children: Children;
}

export function SimpleCommentBlock(props: SimpleCommentBlockProps) {
  return (
    <>
      #{" "}
      <align string="# ">
        <Prose>{props.children}</Prose>
      </align>
    </>
  );
}

export interface SimpleInlineCommentProps {
  children: Children;
}

export function SimpleInlineComment(props: SimpleInlineCommentProps) {
  return (
    <>
      {"  "}# <Prose>{props.children}</Prose>
    </>
  );
}
