import {
  Declaration,
  refkey,
  SourceFileContext,
  useBinder,
  useContext,
} from "@alloy-js/core";
import type { ApiItem } from "@microsoft/api-extractor-model";
import type { DocSymbol } from "../symbols/doc-symbol.js";

export interface DocDeclarationProps {
  name: string;
  apiItem: ApiItem;
}

export function DocDeclaration(props: DocDeclarationProps) {
  const sfContext = useContext(SourceFileContext);
  const binder = useBinder();
  const sym = binder.createSymbol<DocSymbol>({
    name: props.name,
    refkey: refkey(props.apiItem),
    path: sfContext!.path,
  });
  return Declaration({ symbol: sym });
}
