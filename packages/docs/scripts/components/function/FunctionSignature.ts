import { code } from "@alloy-js/core";
import type { ApiFunction } from "@microsoft/api-extractor-model";
import { cleanExcerpt } from "../../utils.js";
import { Code, MdxParagraph } from "../stc/index.js";

export interface FunctionSignatureProps {
  fn: ApiFunction;
}

export function FunctionSignature(props: FunctionSignatureProps) {
  const c = code`
    import { ${props.fn.name} } from "${props.fn.getAssociatedPackage()?.name}";

    ${cleanExcerpt(props.fn.excerpt.text)}
  `;

  return MdxParagraph().children(Code({ language: "ts" }).children(c));
}
