import {
  emitSymbol,
  instantiateTakenMembersTo as instantiateTakenSymbolsTo,
  OutputSymbolFlags,
  useContext,
} from "@alloy-js/core";
import { createPythonSymbol } from "../symbol-creation.js";
import {
  FunctionCallExpression,
  FunctionCallExpressionProps,
} from "./FunctionCallExpression.jsx";
import { PythonSourceFileContext } from "./SourceFile.jsx";

export interface ClassInstantiationProps extends FunctionCallExpressionProps {}

/**
 * Used to create new instances of classes in Python.
 *
 * @example
 * ```tsx
 * <ClassInstantiation target="MyClass" args={["arg1", "arg2"]} />
 * ```
 * This will generate:
 * ```python
 * MyClass(arg1, arg2)
 * ```
 * @remarks
 *
 * It is similar to FunctionCallExpression but specifically for class instantiation.
 * Args is a list arguments that can be either Values, which will render as positional arguments,
 * or VariableDeclarations, which will render as named arguments in the call statement.
 */
export function ClassInstantiation(props: ClassInstantiationProps) {
  const sfContext = useContext(PythonSourceFileContext);
  const module = sfContext?.module;
  const sym = createPythonSymbol(
    "",
    {
      flags: OutputSymbolFlags.Transient,
      module: module,
    },
    undefined,
    false,
  );
  instantiateTakenSymbolsTo(sym);
  emitSymbol(sym);
  return (
    <>
      <FunctionCallExpression {...props} />
    </>
  );
}
