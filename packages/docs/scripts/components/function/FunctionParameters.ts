import { code, mapJoin } from "@alloy-js/core";
import type { ApiFunction, Parameter } from "@microsoft/api-extractor-model";
import { MdxSection, TsDoc } from "../stc/index.js";

export interface FunctionParametersProps {
  fn: ApiFunction;
}

export function FunctionParameters(props: FunctionParametersProps) {
  const params = mapJoin(
    props.fn.parameters as Parameter[],
    (param) => code`
      <tr>
        <td style="text-align: right;font-weight: bold;">${param.name}</td>
        <td>
        
          \`${param.parameterTypeExcerpt.text}\`
          
          ${param.tsdocParamBlock && TsDoc({ node: param.tsdocParamBlock, context: props.fn })}
        </td>
      </tr>
    `,
  );

  return MdxSection({ title: "Parameters", level: 3 }).code`
    <table>
      ${params}
    </table>
  `;
}
