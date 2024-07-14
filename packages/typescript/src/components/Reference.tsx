import {
  ResolutionResult,
  ScopeContext,
  SourceDirectoryContext,
  useContext,
  useScope,
} from "@alloyjs/core";
import { SourceFileContext } from "./SourceFile.js";
import { effect, memo } from "@alloyjs/core/jsx-runtime";

export interface ReferenceProps {
  refkey?: unknown;
}

export function Reference({ refkey }: ReferenceProps) {
  const sourceFile = useContext(SourceFileContext);
  const scope = useScope();
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
    });
  }

  function handleResolution(result: ResolutionResult) {
    const { targetDeclaration, pathDown } = result;
    if (pathDown.length > 0 && pathDown[0].kind === "module") {
      // todo: it may be faster to pull this out of pathUp
      const currentPath = useContext(SourceDirectoryContext)!.path;
      return sourceFile!.addImport(targetDeclaration, currentPath);
    }

    return targetDeclaration.name;
  }
}
