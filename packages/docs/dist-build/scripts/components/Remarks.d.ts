import type { ApiItem } from "@microsoft/api-extractor-model";
import type { DocComment } from "@microsoft/tsdoc";
export interface RemarksProps {
    type: ApiItem & {
        tsdocComment?: DocComment;
    };
}
export declare function Remarks(props: RemarksProps): import("@alloy-js/core").ComponentCreator<import("./MdxSection.js").MdxSectionProps> | "";
//# sourceMappingURL=Remarks.d.ts.map