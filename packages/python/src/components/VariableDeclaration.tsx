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
import { SimpleCommentBlock, UnionTypeExpression } from "./index.js";

export interface VariableDeclarationProps extends BaseDeclarationProps {
  /**
   * The initial value of the variable.
   */
  initializer?: Children;
  /**
   * The type of the variable. Used only for type annotation. Optional.
   * Can either be a UnionTypeExpression, which will be taken as is;
   * or a single type.
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
  const instanceVariable = props.instanceVariable ?? false;
  const TypeSymbolSlot = createSymbolSlot();
  const ValueTypeSymbolSlot = createSymbolSlot();
  const memberScope = useMemberScope();
  let scope: OutputScope | undefined = undefined;
  // Only consider the member scope if this is an instance variable
  if (memberScope !== undefined && instanceVariable) {
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
    let type;
    if (
      props.type &&
      typeof props.type === "object" &&
      (props.type as any).type === UnionTypeExpression
    ) {
      type = props.type;
    } else {
      // If the type is not a UnionTypeExpression, we create one
      // This is useful for cases where the type is a single type
      type = UnionTypeExpression({ children: [props.type] });
    }
    return (
      <>
        : <TypeSymbolSlot>{type}</TypeSymbolSlot>
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
