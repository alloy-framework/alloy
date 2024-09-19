import type { ApiItem } from "@microsoft/api-extractor-model";
import type { DocComment } from "@microsoft/tsdoc";
export interface SummaryProps {
    type?: ApiItem & {
        tsdocComment?: DocComment;
    };
}
export declare function Summary(props: SummaryProps): import("@alloy-js/core").ComponentCreator<import("./MdxParagraph.js").MdxParagraphProps> | "";
//# sourceMappingURL=Summary.d.ts.map