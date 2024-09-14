import type { ContextApi } from "../../build-json.js";
import { Code, MdxParagraph } from "../stc/index.js";

export interface ContextSignatureProps {
  context: ContextApi;
}

export function ContextSignature(props: ContextSignatureProps) {
  const code = `const ${props.context.contextVariable.excerpt.text}`;
  return MdxParagraph().children(Code({ code, language: "ts" }));
}
