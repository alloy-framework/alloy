import {
  emitSymbol,
  Name,
  OutputScope,
  OutputSymbolFlags,
  Scope,
  Show,
  useMemberScope,
  useScope,
} from "@alloy-js/core";
import { createPythonSymbol } from "../symbol-creation.js";
import { getCallSignatureProps } from "../utils.js";
import { CallSignature, CallSignatureProps } from "./CallSignature.jsx";
import { BaseDeclarationProps, Declaration } from "./Declaration.js";
import { PythonBlock } from "./PythonBlock.jsx";
import { NoNamePolicy } from "./index.js";

export interface FunctionDeclarationProps
  extends BaseDeclarationProps,
    CallSignatureProps {
  async?: boolean;
}

/**
 * A Python function declaration.
 *
 * @example
 * ```tsx
 * <FunctionDeclaration
 *  name="my_function"
 *  returnType="int"
 *  parameters=[{name: "a", type: "int"},{name: "b", type: "str"}]>
 *   return a + b
 * </FunctionDeclaration>
 * ```
 * This will generate:
 * ```python
 * def my_function(a: int, b: str) -> int:
 *   return a + b
 * ```
 */
export function FunctionDeclaration(props: FunctionDeclarationProps) {
  const asyncKwd = props.async ? "async " : "";
  const callSignatureProps = getCallSignatureProps(props, {});
  const memberScope = useMemberScope();
  let scope: OutputScope | undefined = undefined;
  if (memberScope !== undefined) {
    scope = memberScope.instanceMembers!;
  } else {
    scope = useScope();
  }

  const sym = createPythonSymbol(
    props.name,
    {
      scope: scope,
      refkeys: props.refkey,
      flags: props.flags ?? OutputSymbolFlags.None,
    },
    "function",
    false,
  );
  emitSymbol(sym);

  return (
    <>
      <Declaration {...props} nameKind="function" symbol={sym}>
        {asyncKwd}def <Name />
        <Scope name={sym.name} kind="function">
          <CallSignature
            {...callSignatureProps}
            returnType={props.returnType}
          />
          <PythonBlock opener=":">
            <Show when={Boolean(props.doc)}>{props.doc}</Show>
            {props.children ?? "pass"}
          </PythonBlock>
        </Scope>
      </Declaration>
    </>
  );
}

/**
 * A Python `__init__` function declaration.
 *
 * @example
 * ```tsx
 * <InitFunctionDeclaration>
 *   self.attribute = "value"
 * </InitFunctionDeclaration>
 * ```
 * This will generate:
 * ```python
 * def __init__(self: MyClass) -> None:
 *     self.attribute = "value"
 * ```
 *
 * @remarks
 *
 * This is a convenience component that sets the name to `__init__`, marks it as
 * an instance function, and forces the name to be `__init__` without applying
 * the name policy.
 */
export function InitFunctionDeclaration(
  props: Omit<
    FunctionDeclarationProps,
    "name" | "instanceFunction" | "classFunction"
  >,
) {
  return (
    <NoNamePolicy>
      <FunctionDeclaration
        {...props}
        name="__init__"
        instanceFunction={true}
        classFunction={false}
      />
    </NoNamePolicy>
  );
}
