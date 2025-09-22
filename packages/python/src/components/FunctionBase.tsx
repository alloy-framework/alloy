import { Name, Show } from "@alloy-js/core";
import { PythonOutputSymbol } from "../index.js";
import { createPythonSymbol } from "../symbol-creation.js";
import { usePythonScope } from "../symbols/scopes.js";
import { getCallSignatureProps } from "../utils.js";
import { CallSignature, CallSignatureProps } from "./CallSignature.jsx";
import { BaseDeclarationProps, Declaration } from "./Declaration.js";
import { LexicalScope } from "./LexicalScope.jsx";
import { PythonBlock } from "./PythonBlock.jsx";

export interface CommonFunctionProps
  extends BaseDeclarationProps,
    CallSignatureProps {
  /** Indicates that the function is async. */
  async?: boolean;
}

export interface BaseFunctionDeclarationProps extends CommonFunctionProps {
  /** Indicates the type of function. */
  functionType?: "instance" | "class" | "static";
  /** Optional existing symbol to use instead of creating a new one. */
  sym?: PythonOutputSymbol;
}

/**
 * Base function declaration that handles instance/class/static parameter injection
 * and symbol creation. Exported for internal reuse by method-like components.
 */
export function BaseFunctionDeclaration(props: BaseFunctionDeclarationProps) {
  const asyncKwd = props.async ? "async " : "";
  let parameters;
  switch (props.functionType) {
    case "instance":
      parameters = [{ name: "self" }, ...(props.parameters || [])];
      break;
    case "class":
      parameters = [{ name: "cls" }, ...(props.parameters || [])];
      break;
    default:
      parameters = props.parameters;
  }
  const currentScope = usePythonScope();
  const sym: PythonOutputSymbol =
    props.sym ??
    createPythonSymbol(
      props.name,
      {
        instance:
          props.functionType !== undefined && currentScope?.isMemberScope,
        refkeys: props.refkey,
      },
      "function",
    );

  return (
    <>
      <Declaration {...props} nameKind="function" symbol={sym}>
        {asyncKwd}def <Name />
        <LexicalScope name={sym.name}>
          <CallSignature
            {...getCallSignatureProps(props, {})}
            parameters={parameters}
          />
          <PythonBlock opener=":">
            <Show when={Boolean(props.doc)}>{props.doc}</Show>
            {props.children ?? "pass"}
          </PythonBlock>
        </LexicalScope>
      </Declaration>
    </>
  );
}


