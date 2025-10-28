import { createContentSlot, Name, Show } from "@alloy-js/core";
import { PythonOutputSymbol } from "../index.js";
import { getCallSignatureProps } from "../utils.js";
import { CallSignature, CallSignatureProps } from "./CallSignature.jsx";
import { BaseDeclarationProps, Declaration } from "./Declaration.js";
import { LexicalScope } from "./LexicalScope.jsx";
import { PythonBlock } from "./PythonBlock.jsx";

/**
 * Shared base interface for function-like components.
 *
 * @remarks
 * This interface is consumed by public components like `FunctionDeclaration`,
 * `MethodDeclaration`, and property method helpers. It combines declaration
 * metadata with call signature shape.
 */
export interface CommonFunctionProps
  extends BaseDeclarationProps,
    CallSignatureProps {
  /** Indicates that the function is async. */
  async?: boolean;
}

/**
 * Props for `BaseFunctionDeclaration`.
 *
 * @remarks
 * This low-level component powers function/method-like declarations by
 * handling symbol creation, parameter injection for instance/class methods,
 * and common rendering concerns. Intended primarily for internal reuse.
 */
export interface BaseFunctionDeclarationProps extends CommonFunctionProps {
  /** Indicates the type of function. */
  functionType?: "instance" | "class" | "static";
  /** Pre-created symbol to render. Must be provided by caller. */
  sym: PythonOutputSymbol;
}

/**
 * Base function declaration that handles instance/class/static parameter injection
 * and symbol creation. Exported for internal reuse by method-like components.
 *
 * @example
 * ```tsx
 * // Not typically used directly. Prefer higher-level components.
 * <BaseFunctionDeclaration name="helper" parameters={[{ name: "x" }]}>
 *   return x
 * </BaseFunctionDeclaration>
 * ```
 * Generates:
 * ```python
 * def helper(x):
 *     return x
 * ```
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
  const sym: PythonOutputSymbol = props.sym;
  const ContentSlot = createContentSlot();
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
            <ContentSlot.WhenEmpty>pass</ContentSlot.WhenEmpty>
            <ContentSlot>{props.children}</ContentSlot>
          </PythonBlock>
        </LexicalScope>
      </Declaration>
    </>
  );
}
