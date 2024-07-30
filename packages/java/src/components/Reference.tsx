import { memo, Refkey, resolve, untrack, useContext } from "@alloy-js/core";
import { SourceFileContext } from "./SourceFile.js";
import { JavaOutputScope, JavaOutputSymbol } from "../symbols.js";

export interface ReferenceProps {
  refkey: Refkey;
}

export function Reference(props: ReferenceProps) {
  const sourceFile = useContext(SourceFileContext);
  const result = resolve<JavaOutputScope, JavaOutputSymbol>(props.refkey as Refkey);

  return memo(() => {
    if (result.value === undefined) {
      return;
    }

    const { targetDeclaration, pathDown, pathUp, commonScope } = result.value;

    // TODO: Handle importing to file
    return untrack(() => sourceFile!.addImport(targetDeclaration));

    return targetDeclaration.name;
  })
}