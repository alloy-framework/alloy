import {
  Children,
  createSymbolSlot,
  Declaration,
  DeclarationProps,
  Name,
  Namekey,
  Refkey,
} from "@alloy-js/core";
import { makeModifiers } from "../../modifiers.js";
import { createVariableSymbol } from "../../symbols/factories.js";

/** Props for {@link VarDeclaration} component */
export interface VarDeclarationProps
  extends Omit<DeclarationProps, "nameKind">,
    VarModifiers {
  /** Variable name */
  name: string | Namekey;
  /** Type of the variable declaration. If not specified, defaults to "var" */
  type?: Children;
  /** Variable refkey */
  refkey?: Refkey;
  /** Variable value */
  children?: Children;
}

export interface VarModifiers {
  /** Constant variable. Add the const modifier. */
  readonly const?: boolean;

  /** Disposable variable. Add the using modifier. */
  readonly using?: boolean;
}

const getModifiers = makeModifiers<VarModifiers>(["const", "using"]);

/**
 * Render a variable declaration
 *
 * @example with var
 * ```tsx
 * <VarDeclaration name="myVar">42</VarDeclaration>
 * ```
 * This will render:
 * ```csharp
 * var myVar = 42;
 * ```
 *
 * @example with type
 * ```tsx
 * <VarDeclaration name="myVar" type="int">42</VarDeclaration>
 * ```
 * This will render:
 * ```csharp
 * int myVar = 42;
 * ```
 */
export function VarDeclaration(props: VarDeclarationProps) {
  const TypeSlot = createSymbolSlot();
  const ValueSlot = createSymbolSlot();

  const sym = createVariableSymbol(props.name, {
    refkeys: props.refkey,
    type: props.type ? TypeSlot.firstSymbol : ValueSlot.firstSymbol,
  });

  if (props.const && !props.type) {
    throw new Error("Implicitly-typed variables cannot be constant");
  }
  return (
    <Declaration symbol={sym}>
      {getModifiers(props)} <TypeSlot>{props.type ?? "var"}</TypeSlot> <Name />{" "}
      = <ValueSlot>{props.children}</ValueSlot>;
    </Declaration>
  );
}
