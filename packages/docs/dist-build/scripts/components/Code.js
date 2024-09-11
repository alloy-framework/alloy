import { code } from "@alloy-js/core";
import redent from "redent";
export function Code(props) {
    const indentedCode = "\n" + redent(props.code, 2);
    return code `
    <Code code={\`${indentedCode}\` } lang="${props.language}" />
  `;
}
//# sourceMappingURL=Code.js.map