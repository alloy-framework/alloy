import type { ApiItem } from "@microsoft/api-extractor-model";
import type { DocComment } from "@microsoft/tsdoc";
export interface RemarksProps {
    type: ApiItem & {
        tsdocComment?: DocComment;
    };
}
export declare function Remarks(props: RemarksProps): "" | import("@alloy-js/core").Child[];
//# sourceMappingURL=Remarks.d.ts.map