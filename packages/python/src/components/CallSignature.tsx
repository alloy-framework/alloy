import {
  computed,
  createSymbolSlot,
  For,
  Show,
  SymbolSlot,
} from "@alloy-js/core";
import { ParameterDescriptor } from "../parameter-descriptor.js";
import { createPythonSymbol } from "../symbol-creation.js";
import { PythonOutputSymbol } from "../symbols/index.js";
import { Atom } from "./Atom.jsx";
import { type TypeExpressionProps } from "./index.js";

export interface CallSignatureParametersProps {
  readonly parameters?: ParameterDescriptor[] | string[];
  readonly args?: boolean;
  readonly kwargs?: boolean;
}

/**
 * A call signature parameters declaration, which can be used to define the
 * parameters of a function or other callables.
 *
 * @example
 * ```tsx
 * <py.CallSignatureParameters parameters={[ "a", "b" ]} />
 * ```
 * This will generate:
 * ```python
 * a, b
 * ```
 */
export function CallSignatureParameters(props: CallSignatureParametersProps) {
  const parameters = normalizeAndDeclareParameters(props.parameters ?? []);

  const parameterList = computed(() => {
    const params = [];
    // Add regular parameters
    parameters.forEach((param) => {
      params.push(parameter(param));
    });

    // Add *args if specified
    if (props.args) {
      params.push("*args");
    }

    // Add **kwargs if specified
    if (props.kwargs) {
      params.push("**kwargs");
    }

    return params;
  });

  return (
    <For each={parameterList} comma space>
      {(param) => param}
    </For>
  );
}

function parameter(param: DeclaredParameterDescriptor) {
  const TypeSlot = param.TypeSlot!; // TypeSlot will always be present when param.type is true.
  return (
    <group>
      {param.symbol.name}
      <Show when={!!param.type}>
        : <TypeSlot>{param.type}</TypeSlot>
      </Show>
      <Show when={param.default !== undefined}>
        <Show when={!param.type}>=</Show>
        <Show when={!!param.type}> = </Show>
        <>
          <Atom jsValue={param.default} />
        </>
      </Show>
    </group>
  );
}

interface DeclaredParameterDescriptor
  extends Omit<ParameterDescriptor, "name"> {
  symbol: PythonOutputSymbol;
  TypeSlot?: SymbolSlot;
}

function normalizeAndDeclareParameters(
  parameters: ParameterDescriptor[] | string[],
): DeclaredParameterDescriptor[] {
  if (parameters.length === 0) {
    return [];
  }
  if (typeof parameters[0] === "string") {
    return (parameters as string[]).map((paramName) => {
      const symbol = createPythonSymbol(paramName, {}, "parameter");

      return { refkeys: symbol.refkeys, symbol };
    });
  } else {
    return (parameters as ParameterDescriptor[]).map((param) => {
      const TypeSlot = createSymbolSlot();

      const symbol = createPythonSymbol(
        param.name,
        {
          refkeys: param.refkey,
          type: TypeSlot.firstSymbol,
        },
        "parameter",
      );

      return {
        ...param,
        symbol,
        TypeSlot,
      };
    });
  }
}

export interface CallSignatureProps {
  /**
   * The parameters to the call signature. Can be an array of strings for parameters
   * which don't have a type or a default value. Otherwise, it's an array of
   * {@link ParameterDescriptor}s.
   */
  parameters?: ParameterDescriptor[];

  /**
   * The type parameters of the call signature, e.g. for a generic function.
   * This is only supported in Python 3.12+.
   */
  typeParameters?: string[];

  /**
   * Indicates if there are positional arguments (`*args`) in the function
   */
  args?: boolean;

  /**
   * Indicates if there are keyword arguments (`**kwargs`) in the function
   */
  kwargs?: boolean;

  /**
   * The return type of the function.
   */
  returnType?: TypeExpressionProps;
}
/**
 * A Python call signature, e.g. the part after the `def` keyword and the name in a
 * function expression.
 *
 * @example
 * ```tsx
 * <CallSignature
 *   parameters={[{ name: "a", type: "int" }, { name: "b", type: "str" }]}
 *   returnType={"int"}
 * />
 * ```
 * renders to
 * ```py
 * (a: int, b: str) -> int
 * ```
 * @remarks
 *
 * Any parameters or type parameters declared in this signature will be placed
 * in the current scope. This component does not make a scope to hold its
 * parameters.
 */
export function CallSignature(props: CallSignatureProps) {
  const sParams = (
    <CallSignatureParameters
      parameters={props.parameters}
      args={props.args}
      kwargs={props.kwargs}
    />
  );
  const typeParams =
    props.typeParameters ? `[${props.typeParameters.join(", ")}]` : "";
  const sReturnType =
    props.returnType ?
      <>
        {" -> "}
        {props.returnType}
      </>
    : undefined;

  return (
    <>
      {typeParams}({sParams}){sReturnType}
    </>
  );
}
