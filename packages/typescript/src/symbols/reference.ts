import {
  memo,
  OutputSymbolFlags,
  Refkey,
  resolve,
  untrack,
  useContext,
  useMemberScope,
} from "@alloy-js/core";
import { usePackage } from "../components/PackageDirectory.jsx";
import { SourceFileContext } from "../components/SourceFile.jsx";
import {
  PrivateScopeContext,
  usePrivateScope,
} from "../context/private-scope.js";
import { isValidJSIdentifier } from "../utils.js";
import { TSOutputScope } from "./scopes.js";
import { TSMemberScope } from "./ts-member-scope.js";
import { TSModuleScope } from "./ts-module-scope.js";
import { TSOutputSymbol, TSSymbolFlags } from "./ts-output-symbol.js";
import { TSPackageScope } from "./ts-package-scope.js";

export interface RefOptions {
  type?: boolean;
}
export function ref(refkey: Refkey, options?: RefOptions): () => string {
  const sourceFile = useContext(SourceFileContext);
  const resolveResult = resolve<TSOutputScope, TSOutputSymbol>(
    refkey as Refkey,
  );
  const currentScope = useMemberScope();
  const currentPrivateScope = usePrivateScope();

  return memo(() => {
    if (resolveResult.value === undefined) {
      return "<Unresolved Symbol>";
    }

    const { targetDeclaration, pathDown, memberPath } = resolveResult.value;

    // if we resolved a instance member, check if we should be able to access
    // it.
    if (targetDeclaration.flags & OutputSymbolFlags.InstanceMember) {
      if (targetDeclaration.tsFlags & TSSymbolFlags.PrivateMember) {
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
    let localSymbol: TSOutputSymbol | undefined;

    if (targetLocation === "package") {
      // need package import
      const pkg = usePackage();
      const sourcePackage = pathDown[0] as TSPackageScope;

      if (pkg && !sourcePackage.builtin) {
        pkg.scope.addDependency(sourcePackage);
      }
      const symbolPath = [
        ...(pathDown.slice(2) as TSMemberScope[]).map((s) => s.owner),
        targetDeclaration,
      ];

      const importSymbol = symbolPath[0];

      // find public dependency
      for (const module of sourcePackage.exportedSymbols.values()) {
        for (const refkey of importSymbol.refkeys) {
          if (module.exportedSymbols.has(refkey)) {
            localSymbol = untrack(() =>
              sourceFile!.scope.addImport(importSymbol, module, {
                type: options?.type,
              }),
            );
            break;
          }
        }
      }

      if (!localSymbol) {
        throw new Error(
          "The symbol " +
            targetDeclaration.name +
            " is not exported from package",
        );
      }
    } else if (targetLocation === "module") {
      const symbolPath = [
        ...(pathDown.slice(1) as TSMemberScope[]).map((s) => s.owner),
        targetDeclaration,
      ];

      const importSymbol = symbolPath[0];

      localSymbol = untrack(() =>
        sourceFile!.scope.addImport(
          importSymbol,
          pathDown[0] as TSModuleScope,
          { type: options?.type },
        ),
      );
    }

    if (memberPath && memberPath.length > 0) {
      if (localSymbol) {
        memberPath[0] = localSymbol;
      }

      return buildMemberExpression(memberPath);
    } else {
      return buildMemberExpression([localSymbol ?? targetDeclaration]);
    }
  });
}

function buildMemberExpression(path: TSOutputSymbol[]) {
  let memberExpr = "";

  const base = path[0];
  if (base.flags & OutputSymbolFlags.InstanceMember) {
    memberExpr += "this";
  } else {
    memberExpr += base.name;
    path = path.slice(1);
  }

  let prevNullish = base.tsFlags & TSSymbolFlags.Nullish;
  for (const sym of path) {
    const optional = prevNullish ? "?" : "";
    if (sym.tsFlags & TSSymbolFlags.PrivateMember) {
      memberExpr += `${optional}.#${sym.name}`;
    } else if (
      isValidJSIdentifier(sym.name) &&
      !(sym.tsFlags & TSSymbolFlags.TypeSymbol)
    ) {
      memberExpr += `${optional}.${sym.name}`;
    } else {
      const joiner = sym.tsFlags & TSSymbolFlags.Nullish ? "?." : "";
      memberExpr += `${joiner}[${JSON.stringify(sym.name)}]`;
    }
    prevNullish = sym.tsFlags & TSSymbolFlags.Nullish;
  }

  return memberExpr;
}

function validateSymbolReachable(
  path: TSOutputScope[],
  memberPath: TSOutputSymbol[] | undefined,
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
        sym.tsFlags & TSSymbolFlags.PrivateMember &&
        currentPrivateScope?.staticMembers !== sym.scope
      ) {
        throw new Error(
          "Cannot resolve private static member symbols from a different scope",
        );
      }
    }
  }
}
