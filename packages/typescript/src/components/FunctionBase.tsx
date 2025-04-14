import {
  Block,
  code,
  For,
  Indent,
  onCleanup,
  Show,
  taggedComponent,
} from "@alloy-js/core";
import type { Children } from "@alloy-js/core/jsx-runtime";
import { useTSNamePolicy } from "../name-policy.js";
import type {
  FunctionTypeParameterDescriptor,
  ParameterDescriptor,
} from "../parameter-descriptor.js";
import { TypeParameterDescriptor } from "../parameter-descriptor.js";
import {
  createTSSymbol,
  TSOutputSymbol,
  TSSymbolFlags,
} from "../symbols/index.js";

const functionParametersTag = Symbol();
const typeParametersTag = Symbol();
const functionBodyTag = Symbol();

export interface FunctionBodyProps {
  readonly children?: Children;
}

export interface FunctionParametersProps {
  readonly parameters?: ParameterDescriptor[] | string[];
  readonly children?: Children;
}
export interface FunctionTypeParametersProps {
  readonly parameters?: ParameterDescriptor[] | string[];
  readonly children?: Children;
}

export const FunctionBody = taggedComponent(
  functionBodyTag,
  function Body(props: FunctionBodyProps) {
    return <Block>{props.children}</Block>;
  },
);

export interface TypeParametersProps {
  parameters?: TypeParameterDescriptor[] | string[];
  children?: Children;
}

export const FunctionParameters = taggedComponent(
  functionParametersTag,
  function Parameters(props: FunctionParametersProps) {
    if (props.children) {
      return props.children;
    }

    const parameters = normalizeAndDeclareParameters(props.parameters ?? []);
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

export const FunctionTypeParameters = taggedComponent(
  functionParametersTag,
  function Parameters(props: FunctionTypeParametersProps) {
    if (props.children) {
      return props.children;
    }

    const parameters = normalizeAndDeclareParameters(props.parameters ?? []);
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

function parameter(param: DeclaredParameterDescriptor) {
  return (
    <group>
      {param.symbol.name}
      <Show when={!!param.optional}>?</Show>
      <Show when={!!param.type}>
        <indent>: {param.type}</indent>
      </Show>
    </group>
  );
}

interface DeclaredParameterDescriptor
  extends Omit<ParameterDescriptor, "name"> {
  symbol: TSOutputSymbol;
}
interface DeclaredFunctionTypeParameterDescriptor
  extends Omit<FunctionTypeParameterDescriptor, "name"> {
  symbol: TSOutputSymbol;
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
      const symbol = createTSSymbol({
        name: namePolicy.getName(
          paramName,
          flags & TSSymbolFlags.TypeSymbol ? "type" : "parameter",
        ),
        tsFlags: flags,
      });

      return { refkeys: symbol.refkeys, symbol };
    });
  } else {
    return (parameters as ParameterDescriptor[]).map((param) => {
      const symbol = createTSSymbol({
        name: namePolicy.getName(
          param.name,
          flags & TSSymbolFlags.TypeSymbol ? "type" : "parameter",
        ),
        refkey: param.refkey,
        tsFlags: flags,
        metadata: param.metadata,
      });

      return {
        ...param,
        symbol,
      };
    });
  }
}

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
        param.symbol.binder.deleteSymbol(param.symbol);
      }
    });

    return (
      <>
        {"<"}
        <group>
          <Indent softline>
            <For each={typeParameters} comma line>
              {(param) => typeParameter(param)}
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
        <indent> {param.extends}</indent>
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
