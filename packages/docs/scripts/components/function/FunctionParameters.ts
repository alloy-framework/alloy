import { code, mapJoin, type Children } from "@alloy-js/core";
import type { ApiFunction, Parameter } from "@microsoft/api-extractor-model";
import { mdxEscape } from "../../utils.js";
import { MdxSection, TsDoc } from "../stc/index.js";

export interface FunctionParametersProps {
  fn: ApiFunction;
}

export function FunctionParameters(props: FunctionParametersProps) {
  const params = mapJoin(
    () => props.fn.parameters as Parameter[],
    (param) => {
      const summary: Children =
        param.tsdocParamBlock ?
          TsDoc({
            node: param.tsdocParamBlock,
            context: props.fn,
            inline: true,
          })
        : "";
      return code`
        <tr>
          <td class="api-name">${param.name}</td>
          <td class="api-type">${param.isOptional ? `<Badge text="optional" variant="note" size="small" /> ` : ""}${mdxEscape(param.parameterTypeExcerpt.text)}</td>
          <td>${summary}</td>
        </tr>
      `;
    },
  );

  return MdxSection({ title: "Parameters" }).code`
    <table class="api-members">
      ${params}
    </table>
  `;
}
