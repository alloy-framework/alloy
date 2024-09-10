import { IndentContext, stc, useContext } from "@alloy-js/core";
import type { ApiFunction } from "@microsoft/api-extractor-model";
import { cleanExcerpt } from "../../utils.js";

export interface FunctionSignatureProps {
  fn: ApiFunction;
}

export function FunctionSignature(props: FunctionSignatureProps) {
  const currentIndent = useContext(IndentContext)!;
  return stc(IndentContext.Provider)({
    value: { ...currentIndent, indent: "    " },
  }).code`
    <Code code={\`import { ${props.fn.name} } from "@alloy-js/core";
  
    ${cleanExcerpt(props.fn.excerpt.text)}\`} lang="ts" />
  `;
}
