import { code, join } from "@alloy-js/core";
import { ApiItemKind, } from "@microsoft/api-extractor-model";
import { resolveExcerptReference } from "../utils.js";
import { Excerpt, TsDoc } from "./stc/index.js";
export function InterfaceMembers(props) {
    let members = props.iface.members;
    if (props.flatten) {
        for (const extendsType of props.iface.extendsTypes) {
            const refType = resolveExcerptReference(extendsType.excerpt.spannedTokens[0], props.iface);
            if (!refType)
                continue;
            if (refType.kind !== ApiItemKind.Interface)
                continue;
            members.push(...refType.members);
        }
        members = members.sort((a, b) => {
            if (a.displayName < b.displayName) {
                return -1;
            }
            if (a.displayName > b.displayName) {
                return 1;
            }
            return 0;
        });
    }
    const rows = members.map((member) => {
        switch (member.kind) {
            case ApiItemKind.PropertySignature: {
                const prop = member;
                return code `
          <tr>
            <td style="text-align: right;font-weight: bold;">${prop.name}</td>
            <td>
              ${prop.isOptional && `<Badge text="optional" variant="note" size="small" />`} ${Excerpt({ excerpt: prop.propertyTypeExcerpt, context: member })}

              ${prop.tsdocComment?.summarySection &&
                    TsDoc({
                        node: prop.tsdocComment.summarySection,
                        context: prop,
                    })}


            </td>
          </tr>
        `;
            }
            case ApiItemKind.MethodSignature: {
                const method = member;
                return code `
          <tr>
            <td style="text-align: right;font-weight: bold;">${method.name}</td>
            <td>\`(${method.parameters
                    .map((param) => param.parameterTypeExcerpt.text)
                    .join(", ")}) => ${method.returnTypeExcerpt.text}\`</td>
            <td>${method.tsdocComment?.summarySection &&
                    TsDoc({
                        node: method.tsdocComment.summarySection,
                        context: method,
                    })}</td>
          </tr>
        `;
            }
            case ApiItemKind.IndexSignature: {
                const indexer = member;
                return code `
          <tr>
            <td style="text-align: right;">Indexer</td>
            <td>${Excerpt({
                    excerpt: indexer.excerpt,
                    context: indexer,
                })}</td>
            <td>${indexer.tsdocComment?.summarySection &&
                    TsDoc({
                        node: indexer.tsdocComment.summarySection,
                        context: indexer,
                    })}</td>
          </tr>
        `;
            }
        }
    });
    return code `
    <table>
      ${join(rows)}
    </table>
  `;
}
//# sourceMappingURL=InterfaceMembers.js.map