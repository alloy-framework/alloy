import { code, mapJoin } from "@alloy-js/core";
import { TsDoc } from "../stc/index.js";
export function FunctionParameters(props) {
    const params = mapJoin(props.fn.parameters, (param) => code `
      <tr>
        <td style="text-align: right;font-weight: bold;">${param.name}</td>
        <td>
        
          \`${param.parameterTypeExcerpt.text}\`
          
          ${param.tsdocParamBlock && TsDoc({ node: param.tsdocParamBlock, context: props.fn })}
        </td>
      </tr>
    `);
    return code `
    ### Parameters

    <table>
      ${params}
    </table>
  `;
}
//# sourceMappingURL=FunctionParameters.js.map