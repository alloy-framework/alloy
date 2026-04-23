import { code, useContext } from "@alloy-js/core";
import type { ApiFunction } from "@microsoft/api-extractor-model";
import { ImportPathContext } from "../../contexts/import-path.js";
import { cleanExcerpt } from "../../utils.js";
import { Code, MdxParagraph } from "../stc/index.js";

export interface FunctionSignatureProps {
  fn: ApiFunction;
}

export function FunctionSignature(props: FunctionSignatureProps) {
  const importPath =
    useContext(ImportPathContext) ?? props.fn.getAssociatedPackage()?.name;
  const c = code`
    import { ${props.fn.name} } from "${importPath}";

    ${cleanExcerpt(props.fn.excerpt.text)}
  `;

  return MdxParagraph().children(Code({ language: "ts" }).children(c));
}
