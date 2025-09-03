import { LineComment } from "#components/doc/comment.jsx";
import {
  Block,
  Children,
  Declaration,
  DeclarationContext,
  effect,
  Name,
  Refkey,
  Scope,
  Show,
  takeSymbols,
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
import { ParameterProps, Parameters } from "../parameters/parameters.jsx";

// properties for creating a function
export interface FunctionProps {
  name: string;
  parameters?: Array<ParameterProps>;
  returns?: Children;

  refkey?: Refkey;

  /**
   * If true, the function will be exported.
   */
  exported?: boolean;

  /** Doc comment */
  doc?: Children;

  /** Go receiver (for methods) */
  receiver?: Children;

  // TODO: implement type parameters
  // typeParameters?: (TypeParameterProps | string)[];

  /**
   * Whether to render the function in a single line.
   * This will only compile if `children` is a single line as well.
   * This is not common in Go, so use with caution.
   */
  singleLine?: boolean;

  children?: Children;
}

// a Go function
export function Function(props: FunctionProps) {
  const isFileScope = useGoScope() instanceof GoSourceFileScope;

  if (props.receiver && !isFileScope) {
    throw new Error("Methods can only be declared in file scope.");
  }

  const functionSymbol = createFunctionSymbol(props.name, !!props.receiver, {
    refkeys: props.refkey,
    canExport: isFileScope,
    exported: props.exported,
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
        <Parameters parameters={props.parameters} />{" "}
        {props.returns ?
          <>{props.returns} </>
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
  name: string;
  type: Children;
  refkey?: Refkey;
}

export function FuncReceiver(props: FuncReceiverProps) {
  // TODO: type parameters

  const receiverSymbol = createParameterSymbol(props.name, {
    refkeys: props.refkey,
  });

  const functionSymbol = useContext(DeclarationContext);
  if (!(functionSymbol instanceof FunctionSymbol)) {
    throw new Error("FuncReceiver must be used inside a function.");
  }

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
  });

  return (
    <Declaration symbol={receiverSymbol}>
      <Name /> {props.type}
    </Declaration>
  );
}
