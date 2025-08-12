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
 * Args should be a list arguments that can be either simple js values or py.Atoms, which will render as positional arguments,
 * or py.VariableDeclarations, which will render as named arguments in the call statement. This component will
 * not check for the correctness of the python grammar and will just work with any children you provide.
 * It is up to you to ensure that the arguments you provide are valid in the context of a class instantiation.
 */
export function ClassInstantiation(props: ClassInstantiationProps) {
  const sfContext = useContext(PythonSourceFileContext);
  const module = sfContext?.module;
  const sym = createPythonSymbol("", {
    flags: OutputSymbolFlags.Transient,
    module: module,
  });
  instantiateTakenSymbolsTo(sym, "static", "instance");
  emitSymbol(sym);
  return (
    <>
      <FunctionCallExpression {...props} />
    </>
  );
}
