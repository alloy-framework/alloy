import { refkey, SourceFileContext, useContext } from "@alloy-js/core";
import { Declaration } from "@alloy-js/core/stc";
import type { ApiItem } from "@microsoft/api-extractor-model";
import { DocSymbol } from "../symbols/doc-symbol.js";

export interface DocDeclarationProps {
  name: string;
  apiItem: ApiItem;
}

export function DocDeclaration(props: DocDeclarationProps) {
  const sfContext = useContext(SourceFileContext);
  const sym = new DocSymbol(props.name, sfContext!.path, {
    refkeys: refkey(props.apiItem),
  });
  return Declaration({ symbol: sym });
}
