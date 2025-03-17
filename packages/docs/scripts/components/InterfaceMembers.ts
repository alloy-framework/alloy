import { code, join } from "@alloy-js/core";
import {
  ApiFunction,
  ApiIndexSignature,
  ApiItem,
  ApiItemKind,
  ApiPropertySignature,
  type ApiInterface,
} from "@microsoft/api-extractor-model";
import { flattenedMembers } from "../utils.js";
import { Excerpt, TsDoc } from "./stc/index.js";

export interface InterfaceMembersProps {
  iface: ApiInterface;
  flatten?: boolean;
}
export function InterfaceMembers(props: InterfaceMembersProps) {
  let members;
  if (props.flatten) {
    members = flattenedMembers(props.iface);
  } else {
    members = props.iface.members as ApiItem[];
  }

  const rows = members.map((member) => {
    switch (member.kind) {
      case ApiItemKind.PropertySignature: {
        const prop = member as ApiPropertySignature;
        return code`
          <tr>
            <td style="text-align: right;font-weight: bold;">${prop.name}</td>
            <td>
              ${prop.isOptional && `<Badge text="optional" variant="note" size="small" />`} ${Excerpt(
                { excerpt: prop.propertyTypeExcerpt, context: member },
              )}

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
            <td>
              ${
                method.tsdocComment?.summarySection &&
                TsDoc({
                  node: method.tsdocComment.summarySection,
                  context: method,
                })
              }
            </td>
          </tr>
        `;
      }
      case ApiItemKind.IndexSignature: {
        const indexer = member as ApiIndexSignature;
        return code`
          <tr>
            <td style="text-align: right;">Indexer</td>
            <td>${Excerpt({
              excerpt: indexer.excerpt,
              context: indexer,
            })}</td>
            <td>${
              indexer.tsdocComment?.summarySection &&
              TsDoc({
                node: indexer.tsdocComment.summarySection,
                context: indexer,
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
