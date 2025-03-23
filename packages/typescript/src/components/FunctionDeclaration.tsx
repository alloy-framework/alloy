import {
  Block,
  childrenArray,
  code,
  findKeyedChild,
  findUnkeyedChildren,
  For,
  Indent,
  Name,
  Refkey,
  refkey,
  Scope,
  Show,
  taggedComponent,
} from "@alloy-js/core";
import { Children, onCleanup } from "@alloy-js/core/jsx-runtime";
import { useTSNamePolicy } from "../name-policy.js";
import {
  createTSSymbol,
  TSOutputSymbol,
  TSSymbolFlags,
} from "../symbols/index.js";
import { BaseDeclarationProps, Declaration } from "./Declaration.js";

/**
 * Information for a TypeScript function parameter.
 */
export interface ParameterDescriptor {
  /**
   * The name of the parameter.
   */
  name: string;

  /**
   * The type of the parameter.
   */
  type?: Children;

  /**
   * The refkey for this parameter.
   */
  refkey?: Refkey;

  /**
   * The refkeys for this parameter.
   */
  refkeys?: Refkey[];

  /**
   * Whether the parameter is optional.
   */
  optional?: boolean;

  /**
   * Arbitrary metadata for the parameter symbol.
   */
  metadata?: Record<string, unknown>;
}

export interface FunctionDeclarationProps extends BaseDeclarationProps {
  async?: boolean;
  parameters?: Record<string, Children> | ParameterDescriptor[];
  typeParameters?: Record<string, Children> | ParameterDescriptor[] | string[];
  returnType?: Children;
  children?: Children;
}

export const functionParametersTag = Symbol();
export const functionTypeParametersTag = Symbol();
export const functionBodyTag = Symbol();

export function FunctionDeclaration(props: FunctionDeclarationProps) {
  const children = childrenArray(() => props.children);
  const typeParametersChild = findKeyedChild(
    children,
    functionTypeParametersTag,
  );
  const parametersChild = findKeyedChild(children, functionParametersTag);
  const bodyChild = findKeyedChild(children, functionBodyTag);
  const filteredChildren = findUnkeyedChildren(children);
  const returnType = getReturnType(props.returnType, { async: props.async });
  const sReturnType = returnType ? <>: {returnType}</> : undefined;

  const sTypeParameters =
    typeParametersChild ?
      <>
        {"<"}
        {typeParametersChild}
        {">"}
      </>
    : <FunctionDeclaration.TypeParameters parameters={props.typeParameters} />;

  const sParams = parametersChild ?? (
    <FunctionDeclaration.Parameters parameters={props.parameters} />
  );

  const sBody = bodyChild ?? (
    <FunctionDeclaration.Body>{filteredChildren}</FunctionDeclaration.Body>
  );

  const asyncKwd = props.async ? "async " : "";

  return (
    <Declaration {...props} nameKind="function">
      {asyncKwd}function <Name />
      <Scope name={props.name} kind="function">
        {sTypeParameters}({sParams}){sReturnType} {sBody}
      </Scope>
    </Declaration>
  );
}

function getReturnType(
  returnType: Children | undefined,
  options: { async?: boolean } = { async: false },
) {
  if (returnType) {
    return options.async ? code`Promise<${returnType}>` : returnType;
  }
}

interface DeclaredParameterDescriptor
  extends Omit<ParameterDescriptor, "name"> {
  symbol: TSOutputSymbol;
}

function normalizeAndDeclareParameters(
  parameters: Record<string, Children> | ParameterDescriptor[] | string[],
  flags: TSSymbolFlags = TSSymbolFlags.ParameterSymbol,
): DeclaredParameterDescriptor[] {
  const namePolicy = useTSNamePolicy();
  if (Array.isArray(parameters)) {
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
          refkey: refkey(),
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
          refkey: param.refkey ?? refkey(),
          tsFlags: flags,
          metadata: param.metadata,
        });

        return {
          ...param,
          symbol,
        };
      });
    }
  } else {
    return Object.entries(parameters).map(([paramName, value]) => {
      const descriptor: DeclaredParameterDescriptor = {
        type: value,
        symbol: undefined as any,
      };

      descriptor.symbol = createTSSymbol({
        name: namePolicy.getName(
          paramName,
          flags & TSSymbolFlags.TypeSymbol ? "type" : "parameter",
        ),
        tsFlags: flags,
      });

      return descriptor;
    });
  }
}

export interface FunctionTypeParametersProps {
  parameters?: Record<string, Children> | ParameterDescriptor[] | string[];
  children?: Children;
}

FunctionDeclaration.TypeParameters = taggedComponent(
  functionTypeParametersTag,
  function TypeParameters(props: FunctionTypeParametersProps) {
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
          <Indent break="soft">
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

function typeParameter(param: DeclaredParameterDescriptor) {
  return (
    <group>
      {param.symbol.name}
      <Show when={!!param.type}>
        {" "}
        extends
        <indent> {param.type}</indent>
      </Show>
    </group>
  );
}

export interface FunctionParametersProps {
  parameters?: Record<string, Children> | ParameterDescriptor[];
  children?: Children;
}

FunctionDeclaration.Parameters = taggedComponent(
  functionParametersTag,
  function Parameters(props: FunctionParametersProps) {
    if (props.children) {
      return props.children;
    }

    const parameters = normalizeAndDeclareParameters(props.parameters ?? []);
    return (
      <group>
        <Indent break="soft" trailingBreak>
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

export interface FunctionBodyProps {
  children?: Children;
}

FunctionDeclaration.Body = taggedComponent(
  functionBodyTag,
  function Body(props: FunctionBodyProps) {
    return <Block>{props.children}</Block>;
  },
);
