import { code, join, type Children } from "@alloy-js/core";
import {
  ApiCallSignature,
  ApiConstructor,
  ApiFunction,
  ApiIndexSignature,
  ApiItem,
  ApiItemKind,
  ApiMethod,
  ApiProperty,
  ApiPropertySignature,
  ApiProtectedMixin,
  type ApiInterface,
} from "@microsoft/api-extractor-model";
import { flattenedMembers, mdxEscape } from "../utils.js";
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
      case ApiItemKind.PropertySignature:
      case ApiItemKind.Property: {
        const prop = member as ApiPropertySignature | ApiProperty;
        const isProtected =
          ApiProtectedMixin.isBaseClassOf(prop) && prop.isProtected;
        const summary: Children =
          prop.tsdocComment?.summarySection ?
            TsDoc({
              node: prop.tsdocComment.summarySection,
              context: prop,
              inline: true,
            })
          : "";
        const remarks: Children =
          prop.tsdocComment?.remarksBlock ?
            TsDoc({
              node: prop.tsdocComment.remarksBlock,
              context: prop,
              inline: true,
            })
          : "";
        const sep: Children = summary && remarks ? " " : "";
        return code`
          <tr>
            <td class="api-name">${isProtected ? `<Badge text="protected" variant="caution" size="small" /> ` : ""}${prop.name}</td>
            <td class="api-type">${prop.isOptional ? `<Badge text="optional" variant="note" size="small" /> ` : ""}${Excerpt({ excerpt: prop.propertyTypeExcerpt, context: member })}</td>
            <td>${summary}${sep}${remarks}</td>
          </tr>
        `;
      }
      case ApiItemKind.MethodSignature:
      case ApiItemKind.Method: {
        const method = member as ApiFunction | ApiMethod;
        const isProtected =
          ApiProtectedMixin.isBaseClassOf(method) && method.isProtected;
        const sig = mdxEscape(
          `(${method.parameters
            .map((param) => `${param.name}: ${param.parameterTypeExcerpt.text}`)
            .join(", ")}) => ${method.returnTypeExcerpt.text}`,
        );
        const summary: Children =
          method.tsdocComment?.summarySection ?
            TsDoc({
              node: method.tsdocComment.summarySection,
              context: method,
              inline: true,
            })
          : "";
        return code`
          <tr>
            <td class="api-name">${isProtected ? `<Badge text="protected" variant="caution" size="small" /> ` : ""}${method.name}</td>
            <td class="api-type">${sig}</td>
            <td>${summary}</td>
          </tr>
        `;
      }
      case ApiItemKind.CallSignature: {
        const callSig = member as ApiCallSignature;
        const sig = mdxEscape(
          `(${callSig.parameters
            .map((param) => `${param.name}: ${param.parameterTypeExcerpt.text}`)
            .join(", ")}) => ${callSig.returnTypeExcerpt.text}`,
        );
        const summary: Children =
          callSig.tsdocComment?.summarySection ?
            TsDoc({
              node: callSig.tsdocComment.summarySection,
              context: callSig,
              inline: true,
            })
          : "";
        return code`
          <tr>
            <td class="api-name">Call signature</td>
            <td class="api-type">${sig}</td>
            <td>${summary}</td>
          </tr>
        `;
      }
      case ApiItemKind.Constructor: {
        const ctor = member as ApiConstructor;
        const sig = mdxEscape(
          `(${ctor.parameters.map((p) => `${p.name}: ${p.parameterTypeExcerpt.text}`).join(", ")})`,
        );
        const summary: Children =
          ctor.tsdocComment?.summarySection ?
            TsDoc({
              node: ctor.tsdocComment.summarySection,
              context: ctor,
              inline: true,
            })
          : "";
        return code`
          <tr>
            <td class="api-name">constructor</td>
            <td class="api-type">${sig}</td>
            <td>${summary}</td>
          </tr>
        `;
      }
      case ApiItemKind.IndexSignature: {
        const indexer = member as ApiIndexSignature;
        const summary: Children =
          indexer.tsdocComment?.summarySection ?
            TsDoc({
              node: indexer.tsdocComment.summarySection,
              context: indexer,
              inline: true,
            })
          : "";
        return code`
          <tr>
            <td class="api-name">Indexer</td>
            <td class="api-type">${Excerpt({ excerpt: indexer.excerpt, context: indexer })}</td>
            <td>${summary}</td>
          </tr>
        `;
      }
    }
  });

  return code`
    <table class="api-members">
      ${join(rows)}
    </table>
  `;
}
