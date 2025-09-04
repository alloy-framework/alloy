import {
  Children,
  getRefkeyString,
  MemberResolutionContext,
  MemberResolver,
  memo,
  Refkey,
  resolve,
  untrack,
  useContext,
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
    { memberResolver },
  );

  return memo(() => {
    if (resolveResult.value === undefined) {
      return [`<Unresolved Symbol: ${getRefkeyString(refkey)}>`, undefined];
    }

    const { symbol, pathDown, memberPath, lexicalDeclaration, commonScope } =
      resolveResult.value;

    validateSymbolReachable(pathDown);

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

function validateSymbolReachable(path: TSOutputScope[]) {
  for (const scope of path) {
    if (!(scope instanceof TSModuleScope) && scope instanceof TSLexicalScope) {
      throw new Error(
        "Cannot reference a symbol inside a function from outside a function",
      );
    }
  }
}

const memberResolver: MemberResolver<TSOutputScope, TSOutputSymbol> = function (
  owner: TSOutputSymbol,
  member: TSOutputSymbol,
  context: MemberResolutionContext<TSOutputScope>,
) {
  if (context.isMemberAccess) {
    if (!member.isMemberSymbol) {
      throw new Error(`${member.name} is not a member symbol.`);
    }

    const memberOwner = owner.hasTypeSymbol ? owner.type : owner.dealias();
    if (member.ownerSymbol !== memberOwner) {
      throw new Error(`${member.name} is not a member of ${owner.name}.`);
    }
  } else {
    if (member.isInstanceMemberSymbol) {
      if (
        !context.referencePath.some(
          (s) => s.isMemberScope && s.ownerSymbol === owner,
        )
      ) {
        throw new Error(
          `Cannot reference instance member '${member.name}' without an instance of '${owner.name}' in scope`,
        );
      }
    }

    if (member.isPrivateMemberSymbol) {
      if (
        !context.referencePath.some(
          (s) => s.isMemberScope && s.ownerSymbol === owner,
        )
      ) {
        throw new Error(
          `Cannot reference private member '${member.name}' outside an instance of '${owner.name} in scope'`,
        );
      }
    }
  }
};
