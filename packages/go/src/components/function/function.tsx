import {
  Block,
  Children,
  createSymbolSlot,
  Declaration,
  DeclarationContext,
  effect,
  For,
  Indent,
  Name,
  Namekey,
  onCleanup,
  Refkey,
  Scope,
  Show,
  useContext,
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
import { TypeParameterSymbol } from "../../symbols/type-parameter.js";
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

  /** Whether the function should be public (exported) or private (unexported) */
  public?: boolean;

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
    public: props.public,
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

  const FunctionTypeSlot = createSymbolSlot();

  // Add the function symbol to the receiver type's members
  effect(() => {
    const typeSymbol = FunctionTypeSlot.firstSymbol.value as
      | GoSymbol
      | undefined;
    if (!typeSymbol) {
      return;
    }
    if (typeSymbol.enclosingPackage !== receiverSymbol.enclosingPackage) {
      throw new Error(
        `Receiver symbol ${receiverSymbol.name} must be in the same package as the type ${typeSymbol.name}.`,
      );
    }
    if (!(typeSymbol instanceof NamedTypeSymbol)) {
      throw new Error(
        `Receiver type must be a named type, got ${typeSymbol.constructor.name}.`,
      );
    }

    functionSymbol.receiverSymbol = typeSymbol;

    typeSymbol.members.add(functionSymbol);

    onCleanup(() => {
      functionSymbol.receiverSymbol = undefined;
      typeSymbol.members.delete(functionSymbol);
    });
  });

  return (
    <Declaration symbol={receiverSymbol}>
      <Name /> <FunctionTypeSlot>{props.type}</FunctionTypeSlot>
      <Show when={!!props.typeParameters}>
        <TypeParameters parameters={props.typeParameters} />
      </Show>
      <Show when={!props.typeParameters && !!functionSymbol.receiverSymbol}>
        <TypeParameters
          parameters={[...functionSymbol.receiverSymbol!.typeParameters].map(
            (s) => {
              return {
                name: s.name,
                constraint: (s as TypeParameterSymbol).constraint,
              };
            },
          )}
        />
      </Show>
    </Declaration>
  );
}
