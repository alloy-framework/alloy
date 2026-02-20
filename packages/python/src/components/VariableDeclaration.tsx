import {
  Children,
  Declaration as CoreDeclaration,
  Name,
  Show,
  createSymbolSlot,
  memo,
} from "@alloy-js/core";
import { usePythonNamePolicy } from "../name-policy.js";
import { createPythonSymbol } from "../symbol-creation.js";
import { Atom } from "./Atom.jsx";
import { BaseDeclarationProps } from "./Declaration.jsx";
import { SimpleCommentBlock } from "./PyDoc.jsx";

export interface VariableDeclarationProps extends BaseDeclarationProps {
  /**
   * The initial value of the variable.
   */
  initializer?: Children;
  /**
   * The type of the variable. Used only for type annotation. Optional.
   */
  type?: Children;
  /**
   * Indicates if we should omit the None assignment. Optional.
   */
  omitNone?: boolean;
  /**
   * Indicates if this is a call statement variable. Optional.
   * This is used to handle cases where the variable is part of a call statement.
   */
  callStatementVar?: boolean;
  /**
   * Indicates if this variable is an instance variable. Optional.
   * This is used to handle cases where the variable is part of a class instance.
   */
  instanceVariable?: boolean;
}

/**
 * A variable declaration component for Python.
 *
 * @example
 * ```tsx
 * <VariableDeclaration
 *   name="myVar"
 *   type="int"
 *   initializer={42}  // Initial value
 * />
 * <VariableDeclaration
 *   name="myOtherVar"
 *   type="str"
 *   omitNone={true}
 * />
 * <VariableDeclaration
 *   name="myCallStmtVar"
 *   callStatementVar={true}
 *   initializer={12}
 * />
 * VariableDeclaration
 *   name=""
 *   callStatementVar={true}
 *   initializer={12}
 * />
 * ```
 * renders to
 * ```py
 * myVar: int = 42
 * myOtherVar: str
 * myCallStmtVar=12
 * 12
 * ```
 */
export function VariableDeclaration(props: VariableDeclarationProps) {
  const TypeSymbolSlot = createSymbolSlot();
  const ValueTypeSymbolSlot = createSymbolSlot();

  // For callStatementVar, don't create a symbol (keyword arguments aren't variables)
  const sym = props.callStatementVar
    ? undefined
    : createPythonSymbol(
        props.name,
        {
          instance: props.instanceVariable,
          refkeys: props.refkey,
          type: props.type ? TypeSymbolSlot.firstSymbol : undefined,
        },
        "variable",
      );

  if (!props.type && sym) {
    ValueTypeSymbolSlot.moveMembersTo(sym);
  }

  // Handle optional type annotation
  const type = memo(() => {
    if (!props.type || props.callStatementVar) return undefined;
    return (
      <>
        : <TypeSymbolSlot>{props.type}</TypeSymbolSlot>
      </>
    );
  });

  // If we receive a symbol, resolve it to a name
  const value =
    typeof props.initializer === "object" ?
      memo(() => props.initializer)
    : props.initializer;
  const assignmentOperator = props.callStatementVar ? "=" : " = ";
  const getRightSide = () => {
    // Early return for omitNone case
    if (props.omitNone && props.initializer === undefined) {
      return [false, ""];
    }

    // Handle null/undefined values
    if (value === null || value === undefined) {
      return [true, <>None</>];
    }

    let renderRightSideOperator = true;
    // Call statement with no name
    if (
      props.callStatementVar &&
      (props.name === undefined || props.name === "")
    ) {
      renderRightSideOperator = false;
    }

    // Standard assignment
    return [
      renderRightSideOperator,
      <ValueTypeSymbolSlot>
        <Atom jsValue={value} />
      </ValueTypeSymbolSlot>,
    ];
  };
  const [renderRightSideOperator, rightSide] = getRightSide();

  // For callStatementVar, render without symbol registration
  // We need to manually apply the name policy to the name
  // since that is normally handled by the symbol creation.
  if (props.callStatementVar) {
    const namePolicy = usePythonNamePolicy();
    const name =
      typeof props.name === "string" && props.name
        ? namePolicy.getName(props.name, "variable")
        : "";
    return (
      <>
        {name}
        {renderRightSideOperator && assignmentOperator}
        {rightSide}
      </>
    );
  }

  return (
    <>
      <Show when={Boolean(props.doc)}>
        <SimpleCommentBlock children={props.doc} />
        <hbr />
      </Show>
      <CoreDeclaration symbol={sym!}>
        {<Name />}
        {type}
        {renderRightSideOperator && assignmentOperator}
        {rightSide}
      </CoreDeclaration>
    </>
  );
}
