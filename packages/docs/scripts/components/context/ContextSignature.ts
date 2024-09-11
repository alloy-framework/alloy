import { IndentContext, stc, useContext } from "@alloy-js/core";
import type { ContextApi } from "../../build-json.js";

export interface ContextSignatureProps {
  context: ContextApi;
}

export function ContextSignature(props: ContextSignatureProps) {
  const currentIndent = useContext(IndentContext)!;
  return stc(IndentContext.Provider)({
    value: { ...currentIndent, indent: "    " },
  }).code`
    <Code code={\`const ${props.context.contextVariable.excerpt.text}\`} lang="ts" />
  `;
}
