import {
  Block,
  Children,
  computed,
  Declaration,
  DeclarationContext,
  effect,
  For,
  Indent,
  Name,
  Namekey,
  Refkey,
  Scope,
  shallowRef,
  Show,
  takeSymbols,
  useContext,
  watch,
} from "@alloy-js/core";
import { useGoScope } from "../../scopes/contexts.js";
import { createFunctionScope } from "../../scopes/factories.js";
import { GoSourceFileScope } from "../../scopes/source-file.js";
import {
  createFunctionSymbol,
  createParameterSymbol,
} from "../../symbols/factories.js";
import { FunctionSymbol } from "../../symbols/function.js";
import { GoSymbol } from "../../symbols/go.js";
import { NamedTypeSymbol } from "../../symbols/named-type.js";
import { LineComment } from "../doc/comment.jsx";
import {
  FunctionParameterProps,
  FunctionParameters,
} from "../parameters/parameters.jsx";
import {
  TypeParameterProps,
  TypeParameters,
} from "../parameters/typeparameters.jsx";

// properties for creating a function
export interface FunctionProps {
  name: string | Namekey;
  parameters?: FunctionParameterProps[];
  returns?: Children;

  refkey?: Refkey;

  /** Doc comment */
  doc?: Children;

  /** Go receiver (for methods) */
  receiver?: Children;

  /** Type parameters for generic functions */
  typeParameters?: TypeParameterProps[];

  /**
   * Whether to render the function in a single line.
   * This will only compile if `children` is a single line as well.
   * This is not common in Go, so use with caution.
   */
  singleLine?: boolean;

  children?: Children;
}

// a Go function
export function FunctionDeclaration(props: FunctionProps) {
  const isFileScope = useGoScope() instanceof GoSourceFileScope;

  if (props.receiver && !isFileScope) {
    throw new Error("Methods can only be declared in file scope.");
  }

  const functionSymbol = createFunctionSymbol(props.name, !!props.receiver, {
    refkeys: props.refkey,
  });

  // scope for function declaration
  const functionScope = createFunctionScope();

  // note that scope wraps the function declaration so that the params get the correct scope
  return (
    <Declaration symbol={functionSymbol}>
      <Scope value={functionScope}>
        <Show when={Boolean(props.doc)}>
          <LineComment children={props.doc} />
          <hbr />
        </Show>
        func{" "}
        {props.receiver ?
          <>({props.receiver}) </>
        : null}
        <Name />
        <TypeParameters parameters={props.typeParameters} />
        <FunctionParameters parameters={props.parameters} />{" "}
        {props.returns ?
          Array.isArray(props.returns) && props.returns.length > 1 ?
            <>
              <group>
                {"("}
                <Indent softline>
                  <For
                    each={props.returns}
                    joiner={
                      <>
                        {","}
                        <ifBreak flatContents=" ">
                          <sbr />
                        </ifBreak>
                      </>
                    }
                    ender={<ifBreak>,</ifBreak>}
                  >
                    {(ret) => ret}
                  </For>
                </Indent>
                <sbr />
                {")"}
              </group>{" "}
            </>
          : <>{props.returns} </>
        : null}
        {!props.children ?
          "{}"
        : props.singleLine ?
          <>
            {"{"} {props.children} {"}"}
          </>
        : <Block>{props.children}</Block>}
      </Scope>
    </Declaration>
  );
}

export interface FuncReceiverProps {
  name: string | Namekey;
  type: Children;
  refkey?: Refkey;
  typeParameters?: TypeParameterProps[];
}

export function FunctionReceiver(props: FuncReceiverProps) {
  const receiverSymbol = createParameterSymbol(props.name, {
    refkeys: props.refkey,
  });

  const functionSymbol = useContext(DeclarationContext);
  if (!(functionSymbol instanceof FunctionSymbol)) {
    throw new Error("FuncReceiver must be used inside a function.");
  }

  const typeParams = shallowRef(props.typeParameters ?? []);

  const taken = takeSymbols();
  effect(() => {
    if (taken.size !== 1) return;
    const symbol = Array.from(taken)[0] as GoSymbol;
    if (symbol.enclosingPackage !== receiverSymbol.enclosingPackage) {
      throw new Error(
        `Receiver symbol ${receiverSymbol.name} must be in the same package as the type ${symbol.name}.`,
      );
    }
    if (!(symbol instanceof NamedTypeSymbol)) {
      throw new Error(
        `Receiver type must be a named type, got ${symbol.constructor.name}.`,
      );
    }

    functionSymbol.spaces = symbol.members;
    if (!props.typeParameters) {
      typeParams.value = symbol.typeParameters ?? [];
    }
    watch(
      () => symbol.typeParameters,
      (newParams) => {
        if (props.typeParameters) return;
        typeParams.value = newParams ?? [];
      },
    );
  });

  const typeParamsComponent = computed(() => {
    if (typeParams.value.length === 0) return null;
    return <TypeParameters parameters={typeParams.value} />;
  });

  return (
    <Declaration symbol={receiverSymbol}>
      <Name /> {props.type}
      {typeParamsComponent.value}
    </Declaration>
  );
}
