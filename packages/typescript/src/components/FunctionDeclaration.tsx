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
import { getCallSignatureProps } from "../utils.js";
import { CallSignature, CallSignatureProps } from "./CallSignature.jsx";
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
   * The default value of the parameter.
   */
  default?: Children;

  /**
   * The refkey for this parameter.
   */
  refkey?: Refkey | Refkey[];

  /**
   * Whether the parameter is optional.
   */
  optional?: boolean;

  /**
   * Arbitrary metadata for the parameter symbol.
   */
  metadata?: Record<string, unknown>;
}

/**
 * Information for a TypeScript generic type parameter.
 */
export interface TypeParameterDescriptor {
  /**
   * The name of the type parameter.
   */
  name: string;

  /**
   * The extends constraint for the type parameter.
   */
  extends?: Children;

  /**
   * The default type of the type parameter.
   */
  default?: Children;

  /**
   * A refkey or array of refkeys for this type parameter.
   */
  refkey?: Refkey | Refkey[];

  /**
   * Arbitrary metadata for the type parameter symbol.
   */
  metadata?: Record<string, unknown>;
}

export interface FunctionDeclarationProps
  extends BaseDeclarationProps,
    CallSignatureProps {
  async?: boolean;
  children?: Children;
}

export const functionParametersTag = Symbol();
export const functionTypeParametersTag = Symbol();
export const functionBodyTag = Symbol();

/**
 * A TypeScript function declaration.
 *
 * @remarks
 *
 * Providing parameters and type parameters can be accomplished in one of three
 * ways:
 *
 * 1. As an array of {@link ParameterDescriptor}s or
 *    {@link TypeParameterDescriptor}s.
 * 2. As raw content via the `parametersChildren` or `typeParametersChildren`
 *    props.
 * 3. As a child of this component via the
 *    {@link FunctionDeclaration.Parameters} or
 *    {@link FunctionDeclaration.TypeParameters} components.
 */
export function FunctionDeclaration(props: FunctionDeclarationProps) {
  const children = childrenArray(() => props.children);
  const typeParametersChildren =
    findKeyedChild(children, functionTypeParametersTag) ?? undefined;
  const parametersChildren =
    findKeyedChild(children, functionParametersTag) ?? undefined;
  const bodyChildren = findKeyedChild(children, functionBodyTag) ?? undefined;
  const filteredChildren = findUnkeyedChildren(children);
  const returnType = getReturnType(props.returnType, { async: props.async });

  const sBody = bodyChildren ?? (
    <FunctionDeclaration.Body>{filteredChildren}</FunctionDeclaration.Body>
  );

  const asyncKwd = props.async ? "async " : "";

  const callSignatureProps = getCallSignatureProps(props, {
    parametersChildren,
    typeParametersChildren,
  });

  return (
    <Declaration {...props} nameKind="function">
      {asyncKwd}function <Name />
      <Scope name={props.name} kind="function">
        <CallSignature {...callSignatureProps} returnType={returnType} />{" "}
        {sBody}
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
  parameters: ParameterDescriptor[] | string[],
  flags: TSSymbolFlags = TSSymbolFlags.ParameterSymbol,
): DeclaredParameterDescriptor[] {
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

export interface FunctionTypeParametersProps {
  parameters?: ParameterDescriptor[] | string[];
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
  parameters?: ParameterDescriptor[] | string[];
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

export interface FunctionBodyProps {
  children?: Children;
}

FunctionDeclaration.Body = taggedComponent(
  functionBodyTag,
  function Body(props: FunctionBodyProps) {
    return <Block>{props.children}</Block>;
  },
);
