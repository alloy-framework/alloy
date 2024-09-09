import { code, join } from "@alloy-js/core";
import {
  ApiFunction,
  ApiItemKind,
  ApiPropertySignature,
  type ApiInterface,
} from "@microsoft/api-extractor-model";
import { TsDoc } from "./stc/index.js";

export interface InterfaceMembersProps {
  iface: ApiInterface;
}
export function InterfaceMembers(props: InterfaceMembersProps) {
  const rows = props.iface.members.map((member) => {
    switch (member.kind) {
      case ApiItemKind.PropertySignature: {
        const prop = member as ApiPropertySignature;
        return code`
          <tr>
            <td style="text-align: right;font-weight: bold;">${prop.name}</td>
            <td style="white-space: nowrap">
              ${prop.isOptional && `<Badge text="optional" variant="note" size="small" />`} \`${prop.propertyTypeExcerpt.text}\`

              ${
                prop.tsdocComment?.summarySection &&
                TsDoc({
                  node: prop.tsdocComment.summarySection,
                  context: prop,
                })
              }


            </td>
          </tr>
        `;
      }
      case ApiItemKind.MethodSignature: {
        const method = member as ApiFunction;
        return code`
          <tr>
            <td style="text-align: right;font-weight: bold;">${method.name}</td>
            <td>\`(${method.parameters
              .map((param) => param.parameterTypeExcerpt.text)
              .join(", ")}) => ${method.returnTypeExcerpt.text}\`</td>
            <td>${
              method.tsdocComment?.summarySection &&
              TsDoc({
                node: method.tsdocComment.summarySection,
                context: method,
              })
            }</td>
          </tr>
        `;
      }
    }
  });

  return code`
    <table>
      ${join(rows)}
    </table>
  `;
}
