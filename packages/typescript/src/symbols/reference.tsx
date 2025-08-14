import {
  Children,
  MemberContext,
  memo,
  Refkey,
  resolve,
  untrack,
  useContext,
  useMemberContext,
} from "@alloy-js/core";
import { MemberExpression } from "../components/MemberExpression.jsx";
import { usePackage } from "../components/PackageDirectory.jsx";
import { SourceFileContext } from "../components/SourceFile.jsx";
import { TSOutputScope } from "./scopes.js";
import { TSLexicalScope } from "./ts-lexical-scope.js";
import { TSModuleScope } from "./ts-module-scope.js";
import { TSOutputSymbol } from "./ts-output-symbol.js";
import { TSPackageScope } from "./ts-package-scope.js";

export interface RefOptions {
  type?: boolean;
}
export function ref(
  refkey: Refkey,
  options?: RefOptions,
): () => [Children, TSOutputSymbol | undefined] {
  const sourceFile = useContext(SourceFileContext);
  const resolveResult = resolve<TSOutputScope, TSOutputSymbol>(
    refkey as Refkey,
  );
  const currentScope = useMemberContext();

  return memo(() => {
    if (resolveResult.value === undefined) {
      return ["<Unresolved Symbol>", undefined];
    }

    const { symbol, pathDown, memberPath, lexicalDeclaration, commonScope } =
      resolveResult.value;

    // if we resolved a instance member, check if we should be able to access
    // it.
    if (symbol.isInstanceMemberSymbol) {
      if (!currentScope || currentScope.ownerSymbol !== symbol.ownerSymbol) {
        throw new Error(
          "Cannot resolve instance member symbols from a different scope",
        );
      }
    }

    validateSymbolReachable(pathDown, memberPath, currentScope);

    // Where the target declaration is relative to the referencing scope.
    // * package: target symbol is in a different package
    // * module: target symbol is in a different module
    // * local: target symbol is within the current module
    const targetLocation =
      pathDown[0] instanceof TSPackageScope ? "package"
      : pathDown[0] instanceof TSModuleScope ? "module"
      : "local";
    let localSymbol: TSOutputSymbol | undefined;

    if (targetLocation === "package") {
      // need package import
      const pkg = usePackage();
      const sourcePackage = pathDown[0] as TSPackageScope;

      if (pkg && !sourcePackage.builtin) {
        pkg.scope.addDependency(sourcePackage);
      }

      // find public dependency
      for (const module of sourcePackage.exportedSymbols.values()) {
        for (const refkey of lexicalDeclaration.refkeys) {
          if (module.exportedSymbols.has(refkey)) {
            localSymbol = untrack(() =>
              sourceFile!.scope.addImport(lexicalDeclaration, module, {
                type: options?.type,
              }),
            );
            break;
          }
        }
      }

      if (!localSymbol) {
        throw new Error(
          "The symbol " + symbol.name + " is not exported from package",
        );
      }
    } else if (targetLocation === "module") {
      localSymbol = untrack(() =>
        sourceFile!.scope.addImport(
          lexicalDeclaration,
          pathDown[0] as TSModuleScope,
          { type: options?.type },
        ),
      );
    }

    const parts = [];

    if (commonScope && commonScope.isMemberScope) {
      // we are referencing a member of a type we are inside
      if (lexicalDeclaration.isInstanceMemberSymbol) {
        parts.push(<MemberExpression.Part id="this" />);
      } else {
        parts.push(<MemberExpression.Part symbol={commonScope.ownerSymbol} />);
      }
      parts.push(<MemberExpression.Part symbol={lexicalDeclaration} />);
    } else {
      parts.push(
        <MemberExpression.Part symbol={localSymbol ?? lexicalDeclaration} />,
      );
    }
    for (const part of memberPath) {
      parts.push(<MemberExpression.Part symbol={part} />);
    }

    return [<MemberExpression children={parts} />, localSymbol ?? symbol];
  });
}

function validateSymbolReachable(
  path: TSOutputScope[],
  memberPath: TSOutputSymbol[] | undefined,
  currentPrivateScope: MemberContext | undefined,
) {
  for (const scope of path) {
    if (!(scope instanceof TSModuleScope) && scope instanceof TSLexicalScope) {
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
        sym.isPrivateMemberSymbol &&
        sym.isStaticMemberSymbol &&
        currentPrivateScope?.ownerSymbol !== sym.ownerSymbol
      ) {
        throw new Error(
          "Cannot resolve private static member symbols from a different scope",
        );
      }
    }
  }
}
