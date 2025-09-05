import {
  Block,
  code,
  createSymbolSlot,
  For,
  Indent,
  onCleanup,
  Show,
  SymbolSlot,
  taggedComponent,
  type Children,
} from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import type {
  FunctionTypeParameterDescriptor,
  ParameterDescriptor,
} from "../parameter-descriptor.js";
import { TypeParameterDescriptor } from "../parameter-descriptor.js";
import {
  createValueSymbol,
  TSOutputSymbol,
  TSSymbolFlags,
} from "../symbols/index.js";
import { TypeRefContext } from "./TypeRefContext.jsx";

const functionParametersTag = Symbol();
const typeParametersTag = Symbol();
const functionBodyTag = Symbol();

export interface FunctionBodyProps {
  readonly children?: Children;
}

/** Props for function parameters */
export interface FunctionParametersProps {
  /** Parameters */
  readonly parameters?: ParameterDescriptor[] | string[];
  /** Jsx Children */
  readonly children?: Children;
}

/** Props for a function type(FunctionType or InterfaceMethod) */
export interface FunctionTypeParametersProps {
  /** Parameters */
  readonly parameters?: ParameterDescriptor[] | string[];
  /** Jsx Children */
  readonly children?: Children;
}

/** Props for type parameters */
export interface TypeParametersProps {
  /** Parameters */
  parameters?: TypeParameterDescriptor[] | string[];
  /** Jsx Children */
  children?: Children;
}

export const FunctionBody = taggedComponent(
  functionBodyTag,
  function Body(props: FunctionBodyProps) {
    return <Block>{props.children}</Block>;
  },
);

/**
 * Represent function parameters(FunctionDeclaration, FunctionExpression, ArrowFunction, etc.)
 *
 * @example
 * ```ts
 * a: string, b: string = "abc", c?: string,
 * ```
 */
export const FunctionParameters = taggedComponent(
  functionParametersTag,
  function Parameters(props: FunctionParametersProps) {
    if (props.children) {
      return props.children;
    }

    const parameters = normalizeAndDeclareParameters(
      props.parameters ?? [],
    ) as DeclaredParameterDescriptor[];
    if (parameters.length === 0) {
      return null;
    }

    return (
      <group>
        <Indent softline trailingBreak>
          <For each={parameters} comma line>
            {(param) => parameter(param)}
          </For>
          <ifBreak>,</ifBreak>
        </Indent>
      </group>
    );
  },
);

/**
 * Represent parameters for a function type(FunctionType or InterfaceMethod)
 * This differ from {@link FunctionParameters} in that it doesn't allow default values.
 *
 * @example
 * ```ts
 * a: string, b?: string
 * ```
 */
export const FunctionTypeParameters = taggedComponent(
  functionParametersTag,
  function Parameters(props: FunctionTypeParametersProps) {
    if (props.children) {
      return props.children;
    }

    const parameters = normalizeAndDeclareParameters(
      props.parameters ?? [],
    ) as DeclaredFunctionTypeParameterDescriptor[];
    if (parameters.length === 0) {
      return null;
    }

    return (
      <group>
        <Indent softline trailingBreak>
          <For each={parameters} comma line>
            {(param) => parameter(param)}
          </For>
          <ifBreak>,</ifBreak>
        </Indent>
      </group>
    );
  },
);

function parameter(
  param: DeclaredParameterDescriptor | DeclaredFunctionTypeParameterDescriptor,
) {
  return (
    <group>
      <Show when={param.rest}>...</Show>
      {param.symbol.name}
      <Show when={!!param.optional}>?</Show>
      <Show when={!!param.type}>
        <indent>
          :{" "}
          <param.TypeSlot>
            <TypeRefContext>{param.type}</TypeRefContext>
          </param.TypeSlot>
        </indent>
      </Show>
      <Show when={!!(param as any).default}>
        {" = "}
        <param.TypeSlot>{(param as any).default!}</param.TypeSlot>
      </Show>
    </group>
  );
}

interface DeclaredParameterDescriptor
  extends Omit<ParameterDescriptor, "name"> {
  symbol: TSOutputSymbol;
  TypeSlot: SymbolSlot;
}
interface DeclaredFunctionTypeParameterDescriptor
  extends Omit<FunctionTypeParameterDescriptor, "name"> {
  symbol: TSOutputSymbol;
  TypeSlot: SymbolSlot;
}

interface DeclaredTypeParameterDescriptor
  extends Omit<TypeParameterDescriptor, "name"> {
  symbol: TSOutputSymbol;
}

function normalizeAndDeclareParameters(
  parameters: FunctionTypeParameterDescriptor[] | string[],
  flags?: TSSymbolFlags,
): DeclaredTypeParameterDescriptor[];
function normalizeAndDeclareParameters(
  parameters: TypeParameterDescriptor[] | string[],
  flags?: TSSymbolFlags,
): DeclaredFunctionTypeParameterDescriptor[];
function normalizeAndDeclareParameters(
  parameters: ParameterDescriptor[] | string[],
  flags?: TSSymbolFlags,
): DeclaredParameterDescriptor[];
function normalizeAndDeclareParameters(
  parameters: string[],
  flags?: TSSymbolFlags,
): DeclaredParameterDescriptor[] | DeclaredTypeParameterDescriptor[];
function normalizeAndDeclareParameters(
  parameters:
    | ParameterDescriptor[]
    | FunctionTypeParameterDescriptor[]
    | TypeParameterDescriptor[]
    | string[],
  flags: TSSymbolFlags = TSSymbolFlags.ParameterSymbol,
): DeclaredParameterDescriptor[] | DeclaredTypeParameterDescriptor[] {
  const namePolicy = useTSNamePolicy();
  if (parameters.length === 0) {
    return [];
  }
  if (typeof parameters[0] === "string") {
    return (parameters as string[]).map((paramName) => {
      const name = namePolicy.getName(paramName, "parameter");
      const TypeSlot = createSymbolSlot();
      const symbol = createValueSymbol(name, { type: TypeSlot.firstSymbol });

      return { refkeys: symbol.refkeys, symbol, TypeSlot };
    });
  } else {
    return (parameters as ParameterDescriptor[]).map((param) => {
      const nullishFlag =
        (param.nullish ?? param.optional) ?
          TSSymbolFlags.Nullish
        : TSSymbolFlags.None;
      const TypeSlot = createSymbolSlot();
      const symbol = createValueSymbol(param.name, {
        refkeys: param.refkey,
        tsFlags: flags | nullishFlag,
        metadata: param.metadata,
        type: TypeSlot.firstSymbol,
        namePolicy: namePolicy.for("parameter"),
      });

      return {
        ...param,
        symbol,
        TypeSlot,
      };
    });
  }
}

/**
 * Represent type parameters
 *
 * @example
 * ```ts
 * <A, B extends string>
 * ```
 */
export const TypeParameters = taggedComponent(
  typeParametersTag,
  function TypeParameters(props: TypeParametersProps) {
    if (props.children) {
      return props.children;
    }

    if (!props.parameters) {
      return undefined;
    }

    const typeParameters = normalizeAndDeclareParameters(props.parameters);

    onCleanup(() => {
      for (const param of typeParameters) {
        param.symbol.delete();
      }
    });

    return (
      <>
        {"<"}
        <group>
          <Indent softline>
            <For each={typeParameters} comma line>
              {(param) =>
                typeParameter(param as DeclaredTypeParameterDescriptor)
              }
            </For>
            <ifBreak>,</ifBreak>
          </Indent>
        </group>
        {">"}
      </>
    );
  },
);

function typeParameter(param: DeclaredTypeParameterDescriptor) {
  return (
    <group>
      {param.symbol.name}
      <Show when={!!param.extends}>
        {" "}
        extends
        <indent>
          {" "}
          <TypeRefContext>{param.extends}</TypeRefContext>
        </indent>
      </Show>
      <Show when={!!param.default}>
        {" = "}
        <TypeRefContext>{param.default}</TypeRefContext>
      </Show>
    </group>
  );
}

export function getReturnType(
  returnType: Children | undefined,
  options: { async?: boolean } = { async: false },
) {
  if (returnType) {
    return options.async ? code`Promise<${returnType}>` : returnType;
  }
}
