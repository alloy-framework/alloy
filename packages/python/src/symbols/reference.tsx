import {
  Children,
  memo,
  Refkey,
  resolve,
  untrack,
  useContext,
  useScope,
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
  const currentScope = useScope();
  console.log("Returning memo");
  return memo(() => {
    console.log("???");
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

    const base = localSymbol ?? lexicalDeclaration;
    if (memberPath.length === 0) {
      return [base.name, localSymbol ?? symbol];
    }
    const parts = [];
    const firstPart = memberPath[0];
    console.log("???");
    if (commonScope && firstPart.ownerSymbol === commonScope.ownerSymbol) {
      // we are referencing a member of the class we are inside
      if (firstPart.isInstanceMemberSymbol) {
        console.log("wtf?");
        parts.push(<MemberExpression.Part id="self" />);
      } else {
        console.log("Testing?");
        parts.push(<MemberExpression.Part symbol={commonScope.ownerSymbol} />);
      }
    } else {
      console.log("Pushing local symbol", localSymbol, lexicalDeclaration);
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
