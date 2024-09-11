import { type Children } from "@alloy-js/core";
import { type ApiItem } from "@microsoft/api-extractor-model";
import { DocCodeSpan, DocDeclarationReference, DocLinkTag, DocNode, DocParagraph, DocPlainText, DocSection } from "@microsoft/tsdoc";
import type { DeclarationReference } from "@microsoft/tsdoc/lib-commonjs/beta/DeclarationReference.js";
export interface TsDocProps {
    node: DocNode;
    context?: ApiItem;
}
export declare function TsDoc(props: TsDocProps): Children;
export interface TsDocParagraphProps {
    node: DocParagraph;
}
export declare function TsDocParagraph(props: TsDocParagraphProps): Children[];
export interface TsDocPlainTextProps {
    node: DocPlainText;
}
export declare function TsDocPlainText(props: TsDocPlainTextProps): string;
export interface TsDocSectionProps {
    node: DocSection;
}
export declare function TsDocSection(props: TsDocSectionProps): Children[];
export interface TsDocLinkTagProps {
    node: DocLinkTag;
}
export declare function TsDocLinkTag(props: TsDocLinkTagProps): string | (import("@alloy-js/core").ComponentCreator<import("./Reference.js").ReferenceProps> & {
    code(template: TemplateStringsArray, ...substitutions: Children[]): import("@alloy-js/core").ComponentCreator<import("./Reference.js").ReferenceProps>;
    children(...children: Children[]): import("@alloy-js/core").ComponentCreator<import("./Reference.js").ReferenceProps>;
});
export interface TsDocCodeSpanProps {
    node: DocCodeSpan;
}
export declare function TsDocCodeSpan(props: TsDocCodeSpanProps): string;
export declare function resolveCodeDestination(decl: DeclarationReference | DocDeclarationReference, context: ApiItem | undefined): ApiItem | undefined;
//# sourceMappingURL=TsDoc.d.ts.map