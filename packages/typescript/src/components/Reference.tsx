import { ResolutionResult, ScopeContext, useContext } from "@alloyjs/core";
import { SourceFileContext } from "./SourceFile.js";
import { effect, memo } from "@alloyjs/core/jsx-runtime";

export interface ReferenceProps {
  refkey?: unknown;
}

export function Reference({ refkey }: ReferenceProps) {
  console.log("REFERENCE");
  const sourceFile = useContext(SourceFileContext);
  const scope = useContext(ScopeContext);
  if (!scope) {
    throw new Error("Need scope context to form references");
  }
  const binder = scope.binder;

  const result = binder.resolveDeclarationByKey(scope, refkey);
  if (result.value !== undefined) {
    return handleResolution(result.value);
  } else {
    return memo(() => {
      if (result.value === undefined) {
        return;
      }

      return handleResolution(result.value);
    })
  }


  function handleResolution(result: ResolutionResult) {
    const { targetDeclaration, pathDown } = result;
    if (pathDown.length > 0 && pathDown[0].kind === "module") {
      sourceFile!.addImport(pathDown[0].name, targetDeclaration.name);
    }
    
    return targetDeclaration.name;
  }
}

