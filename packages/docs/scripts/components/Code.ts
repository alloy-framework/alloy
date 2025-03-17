import { text, type Children } from "@alloy-js/core";
import { dedentToRoot, hbr, indent } from "@alloy-js/core/stc";

export interface CodeProps {
  language: string;
  children: Children;
}
export function Code(props: CodeProps) {
  return text`
    <Code
      code={\`${dedentToRoot().children(
        indent().children(props.children),
        hbr(),
      )}\`}
      lang="${props.language}"
    />
  `;
}
