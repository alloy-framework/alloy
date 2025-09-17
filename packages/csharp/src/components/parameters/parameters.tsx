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
import { AttributeList, AttributesProp } from "../attributes/attributes.jsx";
import { Name } from "../Name.jsx";

export interface ParameterProps {
  name: string | Namekey;
  type: Children;
  /** If the parmaeter is optional(without default value) */
  optional?: boolean;
  /** Default value for the parameter */
  default?: Children;

  refkey?: Refkey;

  /**
   * Parameter modifier: The argument must be initialized before calling the method. The method can't assign a new value to the parameter. The compiler might create a temporary variable to hold a copy of the argument to in parameters.
   * @see https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/method-parameters#in-parameter-modifier
   * */
  in?: boolean;
  /**
   * Parameter modifier: The calling method isn't required to initialize the argument before calling the method. The method must assign a value to the parameter.
   * @see https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/method-parameters#out-parameter-modifier
   * */
  out?: boolean;
  /**
   * Parameter modifier: The argument must be initialized before calling the method. The method can assign a new value to the parameter, but isn't required to do so.
   * @see https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/method-parameters#ref-parameter-modifier
   */
  ref?: boolean;
  /**
   * Parameter modifier: The argument must be initialized before calling the method. The method can't assign a new value to the parameter.
   * @see https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/method-parameters#ref-readonly-modifier
   */
  refReadonly?: boolean;

  /**
   * Define attributes to attach
   * @example
   * ```tsx
   * <Parameter name="foo" type="string" attributes={[
   *  <Attribute name="Test" />
   * ]}>
   * ```
   * This will produce:
   * ```csharp
   * [Test] string foo
   * ```
   */
  attributes?: AttributesProp;
}

/** Define a parameter to be used in class or interface method. */
export function Parameter(props: ParameterProps) {
  const TypeSlot = createSymbolSlot();

  const memberSymbol = createParameterSymbol(props.name, {
    refkeys: props.refkey,
    type: TypeSlot.firstSymbol,
    isNullable: props.optional,
  });

  // Only one of in, out, ref, ref readonly can be specified
  const modifiers: (keyof ParameterProps)[] = (
    ["in", "out", "ref", "refReadonly"] as (keyof ParameterProps)[]
  ).filter((k) => props[k]);

  if (modifiers.length > 1) {
    throw new Error(
      `Only one of 'in', 'out', 'ref', 'ref readonly' can be specified for parameter '${
        typeof props.name === "string" ? props.name : props.name.name
      }'`,
    );
  }
  const modifier = modifiers.length === 1 ? modifiers[0] + " " : "";
  return (
    <Declaration symbol={memberSymbol}>
      <AttributeList attributes={props.attributes} endline />
      <>{modifier}</>
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
