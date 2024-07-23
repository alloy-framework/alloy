import {
  Refkey,
  ResolutionResult,
  resolve,
  ScopeContext,
  SourceDirectoryContext,
  useContext,
  useScope,
} from "@alloy-js/core";
import { SourceFileContext } from "./SourceFile.js";
import { memo, untrack } from "@alloy-js/core/jsx-runtime";

export interface ReferenceProps {
  refkey: Refkey;
}

export function Reference({ refkey }: ReferenceProps) {
  const sourceFile = useContext(SourceFileContext);
  const result = resolve(refkey as Refkey);

  return memo(() => {
    if (result.value === undefined) {
      return;
    }

    const { targetDeclaration, pathDown, pathUp, commonScope } = result.value;
    if (pathDown.length > 0 && pathDown[0].kind === "module") {
      // todo: it may be faster to pull this out of pathUp
      const currentPath = useContext(SourceDirectoryContext)!.path;
      return untrack(() => sourceFile!.addImport(targetDeclaration, currentPath));
    }

    return targetDeclaration.name;
  });
}
