import {
  memo,
  OutputSymbolFlags,
  Refkey,
  resolve,
  untrack,
  useContext,
  useMemberScope,
} from "@alloy-js/core";
import { SourceFileContext } from "../components/SourceFile.jsx";
import {
  PrivateScopeContext,
  usePrivateScope,
} from "../context/private-scope.js";
import { PythonOutputScope } from "./scopes.js";
import { PythonMemberScope } from "./python-member-scope.js";
import { PythonModuleScope } from "./python-module-scope.js";
import { PythonOutputSymbol, PythonSymbolFlags } from "./python-output-symbol.js";

export function ref(
  refkey: Refkey,
): () => [string, PythonOutputSymbol | undefined] {
  const sourceFile = useContext(SourceFileContext);
  const resolveResult = resolve<PythonOutputScope, PythonOutputSymbol>(
    refkey as Refkey,
  );
  const currentScope = useMemberScope();
  const currentPrivateScope = usePrivateScope();

  return memo(() => {
    if (resolveResult.value === undefined) {
      return ["<Unresolved Symbol>", undefined];
    }

    const { targetDeclaration, pathDown, memberPath } = resolveResult.value;
    // if we resolved a instance member, check if we should be able to access
    // it.
    if (targetDeclaration.flags & OutputSymbolFlags.InstanceMember) {
      if (targetDeclaration.pythonFlags & PythonSymbolFlags.Private) {
        if (currentPrivateScope?.instanceMembers !== targetDeclaration.scope) {
          throw new Error(
            "Cannot resolve private member symbols from a different scope",
          );
        }
      } else {
        if (currentScope?.instanceMembers !== targetDeclaration.scope) {
          throw new Error(
            "Cannot resolve member symbols from a different member scope",
          );
        }
      }
    }

    validateSymbolReachable(pathDown, memberPath, currentPrivateScope);

    // Where the target declaration is relative to the referencing scope.
    // * package: target symbol is in a different package
    // * module: target symbol is in a different module
    // * local: target symbol is within the current module
    const targetLocation = pathDown[0]?.kind ?? "local";
    let localSymbol: PythonOutputSymbol | undefined;

    if (targetLocation === "package") {
      // Do nothing, we will handle package imports later.
    } else if (targetLocation === "module") {
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

  const base = path[0];
  if (base.flags & OutputSymbolFlags.InstanceMember) {
    memberExpr += "this";
  } else {
    memberExpr += base.name;
    path = path.slice(1);
  }

  let prevNullish = base.pythonFlags & PythonSymbolFlags.Nullish;
  for (const sym of path) {
    const optional = prevNullish ? "?" : "";
    if (sym.pythonFlags & PythonSymbolFlags.Private) {
      memberExpr += `${optional}.#${sym.name}`;
    } else {
      const joiner = sym.pythonFlags & PythonSymbolFlags.Nullish ? "?." : "";
      memberExpr += `${joiner}[${JSON.stringify(sym.name)}]`;
    }
    prevNullish = sym.pythonFlags & PythonSymbolFlags.Nullish;
  }

  return memberExpr;
}

function validateSymbolReachable(
  path: PythonOutputScope[],
  memberPath: PythonOutputSymbol[] | undefined,
  currentPrivateScope: PrivateScopeContext | undefined,
) {
  for (const scope of path) {
    if (scope.kind === "function") {
      throw new Error(
        "Cannot reference a symbol inside a function from outside a function",
      );
    }
  }

  if (memberPath) {
    for (const sym of memberPath) {
      // make sure we're not trying to access a static private from outside
      // the static member scope.
      if (
        sym.flags & OutputSymbolFlags.StaticMember &&
        sym.pythonFlags & PythonSymbolFlags.Private &&
        currentPrivateScope?.staticMembers !== sym.scope
      ) {
        throw new Error(
          "Cannot resolve private static member symbols from a different scope",
        );
      }
    }
  }
}

// /**
//  * Resolve reference to symbol reference, and handle dependency management
//  *
//  * @param refkey - Reference key to symbol
//  */
// export function ref(refkey: Refkey) {
//   const sourceFile = useContext(SourceFileContext);
//   const result = resolve<PythonOutputScope, PythonOutputSymbol>(
//     refkey as Refkey,
//   );

//   return memo(() => {
//     if (result.value === undefined) {
//       return "<Unresolved Symbol>";
//     }

//     const { targetDeclaration } = result.value;

//     // For Python, you may want to add an import if the symbol is from another module
//     return untrack(() => sourceFile!.addImport(targetDeclaration));
//   });
// }
