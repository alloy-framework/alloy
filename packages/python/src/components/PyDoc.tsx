import { For, Indent, List, Prose, Show, childrenArray } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { ParameterDescriptor } from "../parameter-descriptor.js";
import { resolveTypeExpression } from "../utils.js";
import { Atom, type TypeExpressionProps } from "./index.js";

export interface FunctionDocProps {
  description: Children[];
  parameters?: ParameterDescriptor[];
  returns?: string;
  yields?: string;
  raises?: string[];
  examples?: Children[];
  seeAlso?: string[];
  warning?: string;
  deprecated?: string;
  note?: string;
  style?: "google";
}

/**
 * A component that creates a FunctionDoc block for functions.
 */
export function FunctionDoc(props: FunctionDocProps) {
  const {
    style = "google",
    ...rest
  }: { style?: "google" } & GoogleStyleFunctionDocProps = props;
  switch (style) {
    case "google":
      return <GoogleStyleFunctionDoc {...rest} />;
    default:
      return undefined;
  }
}

export interface ClassDocProps {
  description: Children[];
  parameters?: ParameterDescriptor[];
  attributes?: GoogleStyleDocAttributeProps[];
  examples?: Children[];
  seeAlso?: string[];
  warning?: string;
  deprecated?: string;
  note?: string;
  style?: "google";
}

/**
 * A component that creates a ClassDoc block for classes.
 */
export function ClassDoc(props: ClassDocProps) {
  const {
    style = "google",
    ...rest
  }: { style?: "google" } & GoogleStyleClassDocProps = props;
  switch (style) {
    case "google":
      return <GoogleStyleClassDoc {...rest} />;
    default:
      return undefined;
  }
}

export interface ModuleDocProps {
  description: Children[];
  attributes?: GoogleStyleDocAttributeProps[];
  examples?: Children[];
  seeAlso?: string[];
  warning?: string;
  deprecated?: string;
  todo?: string[];
  style?: "google";
}

/**
 * A component that creates a ModuleDoc block for module-level documentation.
 */
export function ModuleDoc(props: ModuleDocProps) {
  const {
    style = "google",
    ...rest
  }: { style?: "google" } & GoogleStyleModuleDocProps = props;
  switch (style) {
    case "google":
      return <GoogleStyleModuleDoc {...rest} />;
    default:
      return undefined;
  }
}

export interface PropertyDocProps {
  description: Children[];
  returns?: string;
  examples?: Children[];
  seeAlso?: string[];
  warning?: string;
  deprecated?: string;
  note?: string;
  style?: "google";
}

/**
 * A component that creates a PropertyDoc block for `@property` decorated methods.
 */
export function PropertyDoc(props: PropertyDocProps) {
  const {
    style = "google",
    ...rest
  }: { style?: "google" } & GoogleStylePropertyDocProps = props;
  switch (style) {
    case "google":
      return <GoogleStylePropertyDoc {...rest} />;
    default:
      return undefined;
  }
}

export interface GeneratorDocProps {
  description: Children[];
  parameters?: ParameterDescriptor[];
  yields?: string;
  raises?: string[];
  examples?: Children[];
  seeAlso?: string[];
  warning?: string;
  deprecated?: string;
  note?: string;
  style?: "google";
}

/**
 * A component that creates a GeneratorDoc block for generator functions.
 */
export function GeneratorDoc(props: GeneratorDocProps) {
  const {
    style = "google",
    ...rest
  }: { style?: "google" } & GoogleStyleGeneratorDocProps = props;
  switch (style) {
    case "google":
      return <GoogleStyleGeneratorDoc {...rest} />;
    default:
      return undefined;
  }
}

export interface ExceptionDocProps {
  description: Children[];
  parameters?: ParameterDescriptor[];
  attributes?: GoogleStyleDocAttributeProps[];
  examples?: Children[];
  seeAlso?: string[];
  warning?: string;
  deprecated?: string;
  note?: string;
  style?: "google";
}

/**
 * A component that creates an ExceptionDoc block for custom exception classes.
 */
export function ExceptionDoc(props: ExceptionDocProps) {
  const {
    style = "google",
    ...rest
  }: { style?: "google" } & GoogleStyleExceptionDocProps = props;
  switch (style) {
    case "google":
      return <GoogleStyleExceptionDoc {...rest} />;
    default:
      return undefined;
  }
}

export interface AttributeDocProps {
  name: Children;
  type?: TypeExpressionProps;
  children?: Children;
  style?: "google";
}

/**
 * A component that creates documentation for a single attribute.
 * This can be used for both inline and block attribute documentation.
 */
export function AttributeDoc(props: AttributeDocProps) {
  const {
    style = "google",
    ...rest
  }: { style?: "google" } & GoogleStyleAttributeDocProps = props;
  switch (style) {
    case "google":
      return <GoogleStyleAttributeDoc {...rest} />;
    default:
      return undefined;
  }
}

export interface MethodDocProps {
  description: Children[];
  parameters?: ParameterDescriptor[];
  returns?: string;
  raises?: string[];
  examples?: Children[];
  seeAlso?: string[];
  warning?: string;
  deprecated?: string;
  note?: string;
  overrides?: string;
  style?: "google";
}

/**
 * A component that creates a MethodDoc block for class methods.
 * Automatically adds a note about not including 'self' parameter if no custom note is provided.
 */
export function MethodDoc(props: MethodDocProps) {
  const {
    style = "google",
    ...rest
  }: { style?: "google" } & GoogleStyleMethodDocProps = props;
  switch (style) {
    case "google": {
      return <GoogleStyleMethodDoc {...rest} />;
    }
    default:
      return undefined;
  }
}

export interface PyDocProps {
  children: Children;
}

/**
 * A PyDoc comment. The children of this component are joined with two hard
 * linebreaks. This is useful for creating PyDoc comments with multiple paragraphs.
 */
export function PyDoc(props: PyDocProps) {
  const children = childrenArray(() => props.children);
  return (
    <>
      {'"""'}
      <hbr />
      <List doubleHardline>{children}</List>
      <hbr />
      {'"""'}
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

export interface SimpleInlineCommentProps {
  children: Children;
}

export function SimpleInlineMemberComment(props: SimpleInlineCommentProps) {
  return (
    <>
      {"  "}#: <Prose>{props.children}</Prose>
    </>
  );
}

interface GoogleStyleFunctionDocProps extends Omit<FunctionDocProps, "style"> {}

/**
 * A component that creates a GoogleStyleFunctionDoc block for functions.
 */
function GoogleStyleFunctionDoc(props: GoogleStyleFunctionDocProps) {
  // We are creating a list instead of relying on <Show> because otherwise
  // <List> would render spaces between the elements even if <Show> evaluates to false.
  const children = [];
  if (props.description !== undefined) {
    children.push(<List doubleHardline>{props.description}</List>);
  }
  if (props.parameters?.length) {
    children.push(<GoogleStyleDocParams parameters={props.parameters} />);
  }
  if (props.returns) {
    children.push(<GoogleStyleDocReturn message={props.returns} />);
  }
  if (props.yields) {
    children.push(<GoogleStyleDocYields message={props.yields} />);
  }
  if (props.raises?.length) {
    children.push(
      props.raises!.map((param) => <GoogleStyleDocRaises message={param} />),
    );
  }
  if (props.examples?.length) {
    children.push(<GoogleStyleDocExamples items={props.examples} />);
  }
  if (props.seeAlso?.length) {
    children.push(<GoogleStyleDocSeeAlso items={props.seeAlso} />);
  }
  if (props.warning) {
    children.push(<GoogleStyleDocWarning message={props.warning} />);
  }
  if (props.deprecated) {
    children.push(<GoogleStyleDocDeprecated message={props.deprecated} />);
  }
  if (props.note) {
    children.push(<GoogleStyleDocNote message={props.note} />);
  }
  return <PyDoc>{children}</PyDoc>;
}

interface GoogleStyleClassDocProps extends Omit<ClassDocProps, "style"> {}

/**
 * A component that creates a GoogleStyleClassDoc block for classes.
 */
function GoogleStyleClassDoc(props: GoogleStyleClassDocProps) {
  // We are creating a list instead of relying on <Show> because otherwise
  // <List> would render spaces between the elements even if <Show> evaluates to false.
  const children = [];
  if (props.description !== undefined) {
    children.push(<List doubleHardline>{props.description}</List>);
  }
  if (props.attributes?.length) {
    children.push(<GoogleStyleDocAttributes attributes={props.attributes} />);
  }
  if (props.parameters?.length) {
    children.push(<GoogleStyleDocParams parameters={props.parameters} />);
  }
  if (props.examples?.length) {
    children.push(<GoogleStyleDocExamples items={props.examples} />);
  }
  if (props.seeAlso?.length) {
    children.push(<GoogleStyleDocSeeAlso items={props.seeAlso} />);
  }
  if (props.warning) {
    children.push(<GoogleStyleDocWarning message={props.warning} />);
  }
  if (props.deprecated) {
    children.push(<GoogleStyleDocDeprecated message={props.deprecated} />);
  }
  if (props.note) {
    children.push(<GoogleStyleDocNote message={props.note} />);
  }
  return <PyDoc>{children}</PyDoc>;
}

interface GoogleStyleModuleDocProps extends Omit<ModuleDocProps, "style"> {}

/**
 * A component that creates a GoogleStyleModuleDoc block for modules.
 */
function GoogleStyleModuleDoc(props: GoogleStyleModuleDocProps) {
  const children = [];
  if (props.description !== undefined) {
    children.push(<List doubleHardline>{props.description}</List>);
  }
  if (props.attributes?.length) {
    children.push(<GoogleStyleDocAttributes attributes={props.attributes} />);
  }
  if (props.examples?.length) {
    children.push(<GoogleStyleDocExamples items={props.examples} />);
  }
  if (props.seeAlso?.length) {
    children.push(<GoogleStyleDocSeeAlso items={props.seeAlso} />);
  }
  if (props.warning) {
    children.push(<GoogleStyleDocWarning message={props.warning} />);
  }
  if (props.deprecated) {
    children.push(<GoogleStyleDocDeprecated message={props.deprecated} />);
  }
  if (props.todo?.length) {
    children.push(<GoogleStyleDocTodo items={props.todo} />);
  }
  return <PyDoc>{children}</PyDoc>;
}

interface GoogleStylePropertyDocProps extends Omit<PropertyDocProps, "style"> {}

/**
 * A component that creates a GoogleStylePropertyDoc block for properties.
 */
function GoogleStylePropertyDoc(props: GoogleStylePropertyDocProps) {
  const children = [];
  if (props.description !== undefined) {
    children.push(<List doubleHardline>{props.description}</List>);
  }
  if (props.returns) {
    children.push(<GoogleStyleDocReturn message={props.returns} />);
  }
  if (props.examples?.length) {
    children.push(<GoogleStyleDocExamples items={props.examples} />);
  }
  if (props.seeAlso?.length) {
    children.push(<GoogleStyleDocSeeAlso items={props.seeAlso} />);
  }
  if (props.warning) {
    children.push(<GoogleStyleDocWarning message={props.warning} />);
  }
  if (props.deprecated) {
    children.push(<GoogleStyleDocDeprecated message={props.deprecated} />);
  }
  if (props.note) {
    children.push(<GoogleStyleDocNote message={props.note} />);
  }
  return <PyDoc>{children}</PyDoc>;
}

interface GoogleStyleGeneratorDocProps
  extends Omit<GeneratorDocProps, "style"> {}

/**
 * A component that creates a GoogleStyleGeneratorDoc block for generators.
 */
function GoogleStyleGeneratorDoc(props: GoogleStyleGeneratorDocProps) {
  const children = [];
  if (props.description !== undefined) {
    children.push(<List doubleHardline>{props.description}</List>);
  }
  if (props.parameters?.length) {
    children.push(<GoogleStyleDocParams parameters={props.parameters} />);
  }
  if (props.yields) {
    children.push(<GoogleStyleDocYields message={props.yields} />);
  }
  if (props.raises?.length) {
    children.push(
      props.raises!.map((param) => <GoogleStyleDocRaises message={param} />),
    );
  }
  if (props.examples?.length) {
    children.push(<GoogleStyleDocExamples items={props.examples} />);
  }
  if (props.seeAlso?.length) {
    children.push(<GoogleStyleDocSeeAlso items={props.seeAlso} />);
  }
  if (props.warning) {
    children.push(<GoogleStyleDocWarning message={props.warning} />);
  }
  if (props.deprecated) {
    children.push(<GoogleStyleDocDeprecated message={props.deprecated} />);
  }
  if (props.note) {
    children.push(<GoogleStyleDocNote message={props.note} />);
  }
  return <PyDoc>{children}</PyDoc>;
}

interface GoogleStyleExceptionDocProps
  extends Omit<ExceptionDocProps, "style"> {}

/**
 * A component that creates a GoogleStyleExceptionDoc block for exceptions.
 */
function GoogleStyleExceptionDoc(props: GoogleStyleExceptionDocProps) {
  const children = [];
  if (props.description !== undefined) {
    children.push(<List doubleHardline>{props.description}</List>);
  }
  if (props.parameters?.length) {
    children.push(<GoogleStyleDocParams parameters={props.parameters} />);
  }
  if (props.attributes?.length) {
    children.push(<GoogleStyleDocAttributes attributes={props.attributes} />);
  }
  if (props.examples?.length) {
    children.push(<GoogleStyleDocExamples items={props.examples} />);
  }
  if (props.seeAlso?.length) {
    children.push(<GoogleStyleDocSeeAlso items={props.seeAlso} />);
  }
  if (props.warning) {
    children.push(<GoogleStyleDocWarning message={props.warning} />);
  }
  if (props.deprecated) {
    children.push(<GoogleStyleDocDeprecated message={props.deprecated} />);
  }
  if (props.note) {
    children.push(<GoogleStyleDocNote message={props.note} />);
  }
  return <PyDoc>{children}</PyDoc>;
}

interface GoogleStyleAttributeDocProps
  extends Omit<AttributeDocProps, "style"> {}

/**
 * A component that creates a GoogleStyleAttributeDoc block for attributes.
 */
function GoogleStyleAttributeDoc(props: GoogleStyleAttributeDocProps) {
  return (
    <GoogleStyleDocAttribute name={props.name} type={props.type}>
      {props.children}
    </GoogleStyleDocAttribute>
  );
}

interface GoogleStyleMethodDocProps extends Omit<MethodDocProps, "style"> {}

/**
 * A component that creates a GoogleStyleMethodDoc block for methods.
 */
function GoogleStyleMethodDoc(props: GoogleStyleMethodDocProps) {
  const children = [];
  if (props.description !== undefined) {
    children.push(<List doubleHardline>{props.description}</List>);
  }
  if (props.parameters?.length) {
    children.push(<GoogleStyleDocParams parameters={props.parameters} />);
  }
  if (props.returns) {
    children.push(<GoogleStyleDocReturn message={props.returns} />);
  }
  if (props.raises?.length) {
    children.push(
      props.raises!.map((param) => <GoogleStyleDocRaises message={param} />),
    );
  }
  if (props.examples?.length) {
    children.push(<GoogleStyleDocExamples items={props.examples} />);
  }
  if (props.seeAlso?.length) {
    children.push(<GoogleStyleDocSeeAlso items={props.seeAlso} />);
  }
  if (props.warning) {
    children.push(<GoogleStyleDocWarning message={props.warning} />);
  }
  if (props.deprecated) {
    children.push(<GoogleStyleDocDeprecated message={props.deprecated} />);
  }
  if (props.overrides) {
    children.push(<GoogleStyleDocOverrides parentClass={props.overrides} />);
  }
  if (props.note) {
    children.push(<GoogleStyleDocNote message={props.note} />);
  }
  return <PyDoc>{children}</PyDoc>;
}

interface GoogleStyleDocParamsProps {
  parameters: ParameterDescriptor[];
}

/**
 * A component that creates a GoogleStyleDoc block for parameters.
 */
function GoogleStyleDocParams(props: GoogleStyleDocParamsProps) {
  const parameters = props.parameters;

  // Don't render anything if there are no parameters
  if (!parameters || parameters.length === 0) {
    return null;
  }

  return (
    <>
      {"Args:"}
      <Indent>
        <List doubleHardline>
          {parameters.map((param) => (
            <GoogleStyleDocParam
              name={param.name}
              type={param.type}
              default={param.default}
            >
              {param.doc}
            </GoogleStyleDocParam>
          ))}
        </List>
      </Indent>
    </>
  );
}

interface GoogleStyleDocParamProps {
  name: Children;
  type?: TypeExpressionProps;
  children?: Children;
  default?: Children;
}

/**
 * Create a GoogleStyleDoc parameter.
 */
function GoogleStyleDocParam(props: GoogleStyleDocParamProps) {
  return (
    <>
      <GoogleStyleDocParamName name={props.name} />
      <GoogleStyleDocParamType
        type={props.type}
        default={Boolean(props.default)}
      />
      <GoogleStyleDocParamDescription
        children={props.children}
        default={props.default}
      />
    </>
  );
}

interface GoogleStyleDocReturnProps {
  message: string;
}

/**
 * A component that creates a GoogleStyleDoc block for parameters.
 */
function GoogleStyleDocReturn(props: GoogleStyleDocReturnProps) {
  return (
    <>
      {"Returns:"}
      <Indent>{props.message}</Indent>
    </>
  );
}

interface GoogleStyleDocRaisesProps {
  message: string;
}

/**
 * A component that creates a GoogleStyleDoc block for exceptions.
 */
function GoogleStyleDocRaises(props: GoogleStyleDocRaisesProps) {
  return (
    <>
      {"Raises:"}
      <Indent>{props.message}</Indent>
    </>
  );
}

interface GoogleStyleDocYieldsProps {
  message: string;
}

/**
 * A component that creates a GoogleStyleDoc block for generator yields.
 */
function GoogleStyleDocYields(props: GoogleStyleDocYieldsProps) {
  return (
    <>
      {"Yields:"}
      <Indent>{props.message}</Indent>
    </>
  );
}

export interface GoogleStyleDocAttributeProps {
  name: Children;
  type?: TypeExpressionProps;
  children?: Children;
}

/**
 * Create a GoogleStyleDoc attribute entry.
 */
function GoogleStyleDocAttribute(props: GoogleStyleDocAttributeProps) {
  return (
    <>
      <GoogleStyleDocParamName name={props.name} />
      <GoogleStyleDocParamType type={props.type} />
      <GoogleStyleDocParamDescription children={props.children} />
    </>
  );
}

interface GoogleStyleDocAttributesProps {
  attributes: GoogleStyleDocAttributeProps[];
}

/**
 * A component that creates a GoogleStyleDoc block for attributes.
 */
function GoogleStyleDocAttributes(props: GoogleStyleDocAttributesProps) {
  return (
    <>
      {"Attributes:"}
      <Indent>
        <List doubleHardline>
          {props.attributes.map((attr) => (
            <GoogleStyleDocAttribute name={attr.name} type={attr.type}>
              {attr.children}
            </GoogleStyleDocAttribute>
          ))}
        </List>
      </Indent>
    </>
  );
}

interface GoogleStyleDocNoteProps {
  message: string;
}

/**
 * A component that creates a GoogleStyleDoc block for notes.
 */
function GoogleStyleDocNote(props: GoogleStyleDocNoteProps) {
  return (
    <>
      {"Note:"}
      <Indent>{props.message}</Indent>
    </>
  );
}

interface GoogleStyleDocTodoProps {
  items: string[];
}

/**
 * A component that creates a GoogleStyleDoc block for todo items.
 */
function GoogleStyleDocTodo(props: GoogleStyleDocTodoProps) {
  return (
    <>
      {"Todo:"}
      <Indent>
        <List hardline>
          {props.items.map((item) => (
            <>* {item}</>
          ))}
        </List>
      </Indent>
    </>
  );
}

interface GoogleStyleDocExamplesProps {
  items: Children[];
}

/**
 * A component that creates a GoogleStyleDoc block for examples.
 */
function GoogleStyleDocExamples(props: GoogleStyleDocExamplesProps) {
  return (
    <>
      {"Examples:"}
      <Indent>
        <List doubleHardline>{props.items.map((item) => item)}</List>
      </Indent>
    </>
  );
}

interface GoogleStyleDocSeeAlsoProps {
  items: string[];
}

/**
 * A component that creates a GoogleStyleDoc block for see also references.
 */
function GoogleStyleDocSeeAlso(props: GoogleStyleDocSeeAlsoProps) {
  return (
    <>
      {"See Also:"}
      <Indent>
        <List hardline>
          {props.items.map((item) => (
            <>{item}</>
          ))}
        </List>
      </Indent>
    </>
  );
}

interface GoogleStyleDocWarningProps {
  message: string;
}

/**
 * A component that creates a GoogleStyleDoc block for warnings.
 */
function GoogleStyleDocWarning(props: GoogleStyleDocWarningProps) {
  return (
    <>
      {"Warning:"}
      <Indent>{props.message}</Indent>
    </>
  );
}

interface GoogleStyleDocDeprecatedProps {
  message: string;
}

/**
 * A component that creates a GoogleStyleDoc block for deprecation notices.
 */
function GoogleStyleDocDeprecated(props: GoogleStyleDocDeprecatedProps) {
  return (
    <>
      {"Deprecated:"}
      <Indent>{props.message}</Indent>
    </>
  );
}

interface GoogleStyleDocOverridesProps {
  parentClass: string;
}

/**
 * A component that creates a GoogleStyleDoc block for overridden methods.
 * This indicates that the method overrides a parent class method.
 */
function GoogleStyleDocOverrides(props: GoogleStyleDocOverridesProps) {
  return (
    <>
      {"Overrides:"}
      <Indent>{props.parentClass}</Indent>
    </>
  );
}

interface GoogleStyleDocParamTypeProps {
  type?: TypeExpressionProps;
  default?: boolean;
}

function GoogleStyleDocParamType(props: GoogleStyleDocParamTypeProps) {
  const resolvedType =
    props.type ? resolveTypeExpression(props.type) : undefined;
  return (
    <>
      <Show when={Boolean(props.type)}>
        {" ("}
        {resolvedType}
        <Show when={props.default}>{", optional"}</Show>
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
  default?: Children;
}

function GoogleStyleDocParamDescription(
  props: GoogleStyleDocParamDescriptionProps,
) {
  return (
    <Show when={Boolean(props.children)}>
      {": "}
      <align width={4}>
        <Prose>
          {props.children}
          <Show when={Boolean(props.default)}>
            <br />
            Defaults to <Atom jsValue={props.default} />.
          </Show>
        </Prose>
      </align>
    </Show>
  );
}
