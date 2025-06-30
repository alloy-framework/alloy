import {
  Children,
  Declaration as CoreDeclaration,
  Name,
  OutputSymbolFlags,
  Refkey,
  createSymbolSlot,
  effect,
  memo,
  refkey,
  useContext,
} from "@alloy-js/core";
import { usePythonNamePolicy } from "../name-policy.js";
import { PythonOutputSymbol, PythonSymbolFlags } from "../symbols/index.js";
import { BaseDeclarationProps } from "./Declaration.jsx";
import { SourceFileContext } from "./SourceFile.jsx";
import { TypeRefContext } from "./TypeRefContext.jsx";
import { Value } from "./Value.jsx";
import { CallSignature } from "./CallSignature.jsx";

export interface VariableDeclarationProps extends BaseDeclarationProps {
  initializer?: Children;
  type?: Children; // Optional, only for type annotation
  omitNone?: boolean; // Optional, to omit None assignment
  callStatementVar?: boolean; // Optional, to indicate if this is a call statement variable
}

export function VariableDeclaration(props: VariableDeclarationProps) {
  const TypeSymbolSlot = createSymbolSlot();
  const ValueTypeSymbolSlot = createSymbolSlot();
  const sfContext = useContext(SourceFileContext);
  const module = sfContext?.module;
  const name = usePythonNamePolicy().getName(props.name, "variable");
  const sym = new PythonOutputSymbol(name, {
    refkeys: props.refkey ?? refkey(name!),
    metadata: props.metadata,
    module: module,
    pythonFlags: PythonSymbolFlags.None,
  });
  // Handle optional type annotation
  const type =
    props.type && !props.callStatementVar ?
      <TypeRefContext>
        : <TypeSymbolSlot>{props.type}</TypeSymbolSlot>
      </TypeRefContext>
    : undefined;

  effect(() => {
    // Force tracking
    void TypeSymbolSlot.ref.value;
    void ValueTypeSymbolSlot.ref.value;
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
    typeof props.initializer === "object" ? memo(() => props.initializer) : props.initializer;
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
    return [renderRightSideOperator, (
      <ValueTypeSymbolSlot><Value jsValue={value ?? props.children} /></ValueTypeSymbolSlot>
    )];
  };
  const [renderRightSideOperator, rightSide] = getRightSide();
  return (
    <>
      <CoreDeclaration symbol={sym}>
        {<Name />}
        {type}
        {renderRightSideOperator && assignmentOperator}
        {rightSide}
      </CoreDeclaration>
    </>
  );
}
