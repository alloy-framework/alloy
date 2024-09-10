import { stc as makeStc, mapJoin, refkey, useContext, } from "@alloy-js/core";
import { DocNodeKind, DocNodeTransforms, } from "@microsoft/tsdoc";
import { ApiModelContext } from "../contexts/api-model.js";
import { TsDocContext, useTsDoccontext } from "../contexts/ts-doc.js";
import * as stc from "./stc/index.js";
export function TsDoc(props) {
    let content;
    switch (props.node.kind) {
        case DocNodeKind.Paragraph:
            content = stc.TsDocParagraph({ node: props.node });
            break;
        case DocNodeKind.CodeSpan:
            content = stc.TsDocCodeSpan({ node: props.node });
            break;
        case DocNodeKind.LinkTag:
            content = stc.TsDocLinkTag({ node: props.node });
            break;
        case DocNodeKind.PlainText:
            content = stc.TsDocPlainText({ node: props.node });
            break;
        case DocNodeKind.Section:
            content = stc.TsDocSection({ node: props.node });
            break;
        case DocNodeKind.Block:
            content = stc.TsDocSection({
                node: props.node.content,
            });
            break;
        case DocNodeKind.ParamBlock:
            // ignore?
            break;
        case DocNodeKind.BlockTag:
            // ignore?
            break;
        case DocNodeKind.FencedCode:
            content = stc.Code({
                code: props.node.code,
                language: props.node.language,
            });
            break;
        default:
            console.log("Unknown TSDoc kind " + props.node.kind);
            break;
    }
    if (props.context) {
        return makeStc(TsDocContext.Provider)({ value: props.context }).children(content);
    }
    else {
        return content;
    }
}
export function TsDocParagraph(props) {
    const trimmed = DocNodeTransforms.trimSpacesInParagraph(props.node);
    return trimmed.nodes.map((node) => TsDoc({ node }));
}
export function TsDocPlainText(props) {
    return props.node.text;
}
export function TsDocSection(props) {
    return mapJoin(props.node.nodes, (node) => TsDoc({ node }), {
        joiner: "\n\n",
    });
}
export function TsDocLinkTag(props) {
    const docContext = useTsDoccontext();
    if (props.node.codeDestination) {
        const apiItem = resolveCodeDestination(props.node.codeDestination, docContext);
        return stc.Reference({
            refkey: refkey(apiItem),
            linkText: props.node.linkText,
        });
    }
    else {
        return `<a href="${props.node.urlDestination}">${props.node.linkText}</a>`;
    }
}
export function TsDocCodeSpan(props) {
    return `\`${props.node.code}\``;
}
export function resolveCodeDestination(decl, context) {
    const apiModel = useContext(ApiModelContext);
    return apiModel.resolveDeclarationReference(decl, context).resolvedApiItem;
}
//# sourceMappingURL=TsDoc.js.map