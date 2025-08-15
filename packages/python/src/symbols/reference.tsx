import {
  Children,
  memo,
  Refkey,
  resolve,
  untrack,
  useContext,
} from "@alloy-js/core";
import { MemberExpression } from "../components/MemberExpression.jsx";
import { PythonSourceFileContext } from "../components/SourceFile.jsx";
import {
  PythonModuleScope,
  PythonOutputScope,
  PythonOutputSymbol,
} from "./index.js";

export function ref(
  refkey: Refkey,
): () => [Children, PythonOutputSymbol | undefined] {
  const sourceFile = useContext(PythonSourceFileContext);
  const resolveResult = resolve<PythonOutputScope, PythonOutputSymbol>(
    refkey as Refkey,
  );

  return memo(() => {
    if (resolveResult.value === undefined) {
      return ["<Unresolved Symbol>", undefined];
    }

    const {
      commonScope,
      lexicalDeclaration,
      symbol,
      pathDown,
      memberPath,
      fullReferencePath,
    } = resolveResult.value;

    // if we resolved a instance member, check if we should be able to access
    if (symbol.isInstanceMemberSymbol) {
      // the reference path must include a member scope whose owner is the
      // instance symbol's owner

      const common = fullReferencePath.some(
        (referenceScope) =>
          referenceScope.isMemberScope &&
          referenceScope.ownerSymbol === symbol.ownerSymbol,
      );
      if (!common) {
        throw new Error(
          `Cannot resolve instance member symbol ${symbol.name} from outside its member scope.`,
        );
      }
    }

    // Where the target declaration is relative to the referencing scope.
    // * module: target symbol is in a different module
    // * local: target symbol is within the current module
    const targetLocation =
      pathDown[0] instanceof PythonModuleScope ? "module" : "local";
    let localSymbol: PythonOutputSymbol | undefined;

    if (targetLocation === "module") {
      localSymbol = untrack(() =>
        sourceFile!.scope.addImport(
          lexicalDeclaration,
          pathDown[0] as PythonModuleScope,
        ),
      );
    }

    const parts = [];

    if (commonScope && commonScope.isMemberScope) {
      // we are referencing a member of a type we are inside
      if (lexicalDeclaration.isInstanceMemberSymbol) {
        parts.push(<MemberExpression.Part id="self" />);
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
