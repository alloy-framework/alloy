import type { ApiItem } from "@microsoft/api-extractor-model";
import type { DocComment } from "@microsoft/tsdoc";
export interface SeeAlsoProps {
    type: ApiItem & {
        tsdocComment?: DocComment;
    };
    splitContexts?: boolean;
}
export declare function SeeAlso(props: SeeAlsoProps): "" | (false | import("@alloy-js/core").Child[])[];
//# sourceMappingURL=SeeAlso.d.ts.map