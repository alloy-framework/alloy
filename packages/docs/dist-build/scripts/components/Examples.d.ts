import type { ApiItem } from "@microsoft/api-extractor-model";
import { type DocComment } from "@microsoft/tsdoc";
export interface ExamplesProps {
    type: ApiItem & {
        tsdocComment?: DocComment;
    };
}
export declare function Examples(props: ExamplesProps): import("@alloy-js/core").Child[] | "";
//# sourceMappingURL=Examples.d.ts.map