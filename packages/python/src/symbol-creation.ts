import {
  OutputScopeOptions,
  OutputSpace,
  useBinder,
  useContext,
} from "@alloy-js/core";
import { PythonSourceFileContext } from "./components/SourceFile.js";
import { PythonElements, usePythonNamePolicy } from "./name-policy.js";
import {
  PythonOutputSymbol,
  PythonOutputSymbolOptions,
  usePythonScope,
} from "./symbols/index.js";
import { PythonLexicalScope } from "./symbols/python-lexical-scope.js";

interface CreatePythonSymbolOptions extends PythonOutputSymbolOptions {
  space?: OutputSpace;
  instance?: boolean;
}
/**
 * Creates a symbol for a python declaration in the current scope.
 */
export function createPythonSymbol(
  name: string,
  options: CreatePythonSymbolOptions = {},
  kind?: PythonElements,
): PythonOutputSymbol {
  let processedName = name;
  const sfContext = useContext(PythonSourceFileContext);
  // Only apply the name policy if a kind is provided and name policy context is available
  if (kind) {
    const namePolicy = usePythonNamePolicy();
    if (namePolicy) {
      processedName = namePolicy.getName(name, kind);
    }
  }
  const currentScope = usePythonScope();
  let targetSpace = options.space ?? undefined;
  if (!options.space && currentScope) {
    if (currentScope.isMemberScope) {
      if (options.instance) {
        targetSpace = currentScope.ownerSymbol!.instanceMembers;
      } else {
        targetSpace = currentScope.ownerSymbol!.staticMembers;
      }
    } else {
      if (options.instance) {
        throw new Error(
          `Cannot declare instance variable ${name} outside of a member scope`,
        );
      }
      targetSpace = (currentScope as PythonLexicalScope).symbols;
    }
  }

  const binder = options.binder ?? currentScope?.binder ?? useBinder();

  return new PythonOutputSymbol(processedName, targetSpace, {
    binder: binder,
    aliasTarget: options.aliasTarget,
    refkeys: options.refkeys,
    metadata: options.metadata,
    module: sfContext?.module,
    type: options.type,
  });
}

export function createLexicalScope(
  name: string,
  options: OutputScopeOptions = {},
) {
  const parent = usePythonScope();

  return new PythonLexicalScope(name, parent, options);
}
