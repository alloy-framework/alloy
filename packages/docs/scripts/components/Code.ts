import { code } from "@alloy-js/core";
import redent from "redent";

export interface CodeProps {
  code: string;
  language: string;
}
export function Code(props: CodeProps) {
  const indentedCode = "\n" + redent(props.code, 2);

  return code`
    <Code code={\`${indentedCode}\` } lang="${props.language}" />
  `;
}
