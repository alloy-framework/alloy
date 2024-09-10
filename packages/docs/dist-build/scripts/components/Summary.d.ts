import type { ApiItem } from "@microsoft/api-extractor-model";
import type { DocComment } from "@microsoft/tsdoc";
export interface SummaryProps {
    type: ApiItem & {
        tsdocComment?: DocComment;
    };
}
export declare function Summary(props: SummaryProps): "" | (string | (import("@alloy-js/core").ComponentCreator<import("./TsDoc.js").TsDocProps> & {
    code(template: TemplateStringsArray, ...substitutions: import("@alloy-js/core").Children[]): import("@alloy-js/core").ComponentCreator<import("./TsDoc.js").TsDocProps>;
    children(...children: import("@alloy-js/core").Children[]): import("@alloy-js/core").ComponentCreator<import("./TsDoc.js").TsDocProps>;
}))[];
//# sourceMappingURL=Summary.d.ts.map