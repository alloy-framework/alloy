import { memo, Refkey, resolve, untrack, useContext } from "@alloy-js/core";
import { SourceFileContext } from "../components/SourceFile.jsx";
import { PythonMemberScope } from "./python-member-scope.js";
import { PythonModuleScope } from "./python-module-scope.js";
import { PythonOutputSymbol } from "./python-output-symbol.js";
import { PythonOutputScope } from "./scopes.js";

export function ref(
  refkey: Refkey,
): () => [string, PythonOutputSymbol | undefined] {
  const sourceFile = useContext(SourceFileContext);
  const resolveResult = resolve<PythonOutputScope, PythonOutputSymbol>(
    refkey as Refkey,
  );
  return memo(() => {
    if (resolveResult.value === undefined) {
      return ["<Unresolved Symbol>", undefined];
    }

    const { targetDeclaration, pathDown, memberPath } = resolveResult.value;

    // Where the target declaration is relative to the referencing scope.
    // * module: target symbol is in a different module
    // * local: target symbol is within the current module
    const targetLocation = pathDown[0]?.kind ?? "local";
    let localSymbol: PythonOutputSymbol | undefined;

    if (targetLocation === "module") {
      // Handling of targets in other modules, either created with createModule()
      // or from other files.
      const symbolPath = [
        ...(pathDown.slice(1) as PythonMemberScope[]).map((s) => s.owner),
        targetDeclaration,
      ];

      const importSymbol = symbolPath[0];

      localSymbol = untrack(() =>
        sourceFile!.scope.addImport(
          importSymbol,
          pathDown[0] as PythonModuleScope,
        ),
      );
    }

    return [
      buildMemberExpression([localSymbol ?? targetDeclaration]),
      localSymbol ?? targetDeclaration,
    ];
  });
}

function buildMemberExpression(path: PythonOutputSymbol[]) {
  let memberExpr = "";

  const base: PythonOutputSymbol = path[0];
  memberExpr += base.name;
  path = path.slice(1);

  return memberExpr;
}
