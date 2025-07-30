import {
  Children,
  computed,
  createSymbolSlot,
  For,
  Show,
  useContext,
} from "@alloy-js/core";
import { ParameterDescriptor } from "../parameter-descriptor.js";
import { createPythonSymbol } from "../symbol-creation.js";
import { PythonOutputSymbol } from "../symbols/index.js";
import { Atom } from "./Atom.jsx";
import { PythonSourceFileContext } from "./SourceFile.jsx";

export interface CallSignatureParametersProps {
  readonly parameters?: ParameterDescriptor[] | string[];
  readonly args?: boolean;
  readonly kwargs?: boolean;
  readonly instanceFunction?: boolean;
  readonly classFunction?: boolean;
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
  // Validate that only one of instanceFunction or classFunction is true
  if (props.instanceFunction && props.classFunction) {
    throw new Error("Cannot be both an instance function and a class function");
  }

  const sfContext = useContext(PythonSourceFileContext);
  const module = sfContext?.module;
  const parameters = normalizeAndDeclareParameters(props.parameters ?? []);

  const parameterList = computed(() => {
    const params = [];

    // Add self/cls parameter if instance or class function
    if (props.instanceFunction) {
      params.push(
        parameter({
          symbol: createPythonSymbol("self", { module: module }),
        }),
      );
    } else if (props.classFunction) {
      params.push(
        parameter({
          symbol: createPythonSymbol("cls", { module: module }),
        }),
      );
    }

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
  const SymbolSlot = createSymbolSlot();

  SymbolSlot.instantiateInto(param.symbol);

  return (
    <group>
      {param.symbol.name}
      <Show when={!!param.type}>
        : <SymbolSlot>{param.type}</SymbolSlot>
      </Show>
      <Show when={!!param.optional}>
        <Show when={!param.type}>=</Show>
        <Show when={!!param.type}> = </Show>
        <>
          {param.default ?
            <Atom jsValue={param.default} />
          : "None"}
        </>
      </Show>
      <Show when={!param.optional && param.default !== undefined}>
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
}

function normalizeAndDeclareParameters(
  parameters: ParameterDescriptor[] | string[],
): DeclaredParameterDescriptor[] {
  const sfContext = useContext(PythonSourceFileContext);
  const module = sfContext?.module;
  if (parameters.length === 0) {
    return [];
  }
  if (typeof parameters[0] === "string") {
    return (parameters as string[]).map((paramName) => {
      const symbol = createPythonSymbol(
        paramName,
        {
          module: module,
        },
        "parameter",
        false,
      );

      return { refkeys: symbol.refkeys, symbol };
    });
  } else {
    return (parameters as ParameterDescriptor[]).map((param) => {
      const symbol = createPythonSymbol(
        param.name,
        {
          refkeys: param.refkey,
          module: module,
        },
        "parameter",
        false,
      );

      return {
        ...param,
        symbol,
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
  parameters?: ParameterDescriptor[] | string[];

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
   * Indicates that this is an instance function.
   */
  instanceFunction?: boolean; // true if this is an instance function

  /**
   * Indicates that this is a class function.
   */
  classFunction?: boolean; // true if this is a class function

  /**
   * The return type of the function.
   */
  returnType?: Children;
}
/**
 * A Python call signature, e.g. the part after the `def` keyword and the name in a
 * function expression.
 *
 * @example
 * ```tsx
 * <CallSignature
 *   parameters={[{ name: "a", type: "int" }, { name: "b", type: "str" }]}
 *   returnType="int"
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
      instanceFunction={props.instanceFunction}
      classFunction={props.classFunction}
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
