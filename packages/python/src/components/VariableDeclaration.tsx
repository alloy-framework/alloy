import {
  Children,
  Declaration as CoreDeclaration,
  Name,
  OutputScope,
  OutputSymbolFlags,
  Show,
  createSymbolSlot,
  effect,
  emitSymbol,
  memo,
  useMemberScope,
  useScope,
} from "@alloy-js/core";
import { createPythonSymbol } from "../symbol-creation.js";
import { Atom } from "./Atom.jsx";
import { BaseDeclarationProps } from "./Declaration.jsx";
import { SimpleCommentBlock } from "./index.js";

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
    },
    "variable",
    true,
  );
  emitSymbol(sym);
  // Handle optional type annotation
  const type = memo(() => {
    if (!props.type || props.callStatementVar) return undefined;
    return (
      <>
        : <TypeSymbolSlot>{props.type}</TypeSymbolSlot>
      </>
    );
  });

  effect(() => {
    if (TypeSymbolSlot.ref.value) {
      const takenSymbols = TypeSymbolSlot.ref.value;
      for (const symbol of takenSymbols) {
        // If the symbol is a type, instantiate it
        symbol.instantiateTo(sym);
      }
    } else if (ValueTypeSymbolSlot.ref.value) {
      const takenSymbols = ValueTypeSymbolSlot.ref.value;
      for (const symbol of takenSymbols) {
        // ignore non-transient symbols (likely not the result of an
        // expression).
        if (symbol.flags & OutputSymbolFlags.Transient) {
          symbol.moveTo(sym);
        }
      }
    }
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
  return (
    <>
      <Show when={Boolean(props.doc)}>
        <SimpleCommentBlock children={props.doc} />
        <hbr />
      </Show>
      <CoreDeclaration symbol={sym}>
        {<Name />}
        {type}
        {renderRightSideOperator && assignmentOperator}
        {rightSide}
      </CoreDeclaration>
    </>
  );
}
