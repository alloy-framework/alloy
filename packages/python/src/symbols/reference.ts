import { memo, OutputSymbolFlags, Refkey, resolve, untrack, useContext, useMemberScope } from "@alloy-js/core";
import { SourceFileContext } from "../components/SourceFile.jsx";
import { PythonMemberScope } from "./python-member-scope.js";
import { PythonModuleScope } from "./python-module-scope.js";
import { PythonOutputSymbol, PythonSymbolFlags } from "./python-output-symbol.js";
import { PythonOutputScope } from "./scopes.js";

export function ref(
  refkey: Refkey,
): () => [string, PythonOutputSymbol | undefined] {
  const sourceFile = useContext(SourceFileContext);
  const resolveResult = resolve<PythonOutputScope, PythonOutputSymbol>(
    refkey as Refkey,
  );
  const currentScope = useMemberScope();

  return memo(() => {
    if (resolveResult.value === undefined) {
      return ["<Unresolved Symbol>", undefined];
    }

    const { targetDeclaration, pathDown, memberPath } = resolveResult.value;

    // if we resolved a instance member, check if we should be able to access
    // it.
    if (targetDeclaration.flags & OutputSymbolFlags.InstanceMember) {
      if (currentScope?.instanceMembers !== targetDeclaration.scope) {
        throw new Error(
          "Cannot resolve member symbols from a different member scope",
        );
      }
    }

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

    if (memberPath && memberPath.length > 0) {
      if (localSymbol) {
        memberPath[0] = localSymbol;
      }

      return [buildMemberExpression(memberPath), memberPath.at(-1)];
    } else {
      return [
        buildMemberExpression([localSymbol ?? targetDeclaration]),
        localSymbol ?? targetDeclaration,
      ];
    }
  });
}

function buildMemberExpression(path: PythonOutputSymbol[]) {
  let memberExpr = "";

  const base: PythonOutputSymbol = path[0];
  if (base.flags & OutputSymbolFlags.InstanceMember) {
    memberExpr += "self";
  } else {
    memberExpr += base.name;
    path = path.slice(1);
  }

  for (const sym of path) {
    memberExpr += `.${sym.name}`;
  }

  return memberExpr;
}
