import type { DocumentationApi } from "../build-json.js";
export interface DocProps {
    api: DocumentationApi;
}
export declare function Doc(props: DocProps): (import("@alloy-js/core").ComponentCreator<import("./component/ComponentDoc.js").ComponentDocProps> & {
    code(template: TemplateStringsArray, ...substitutions: import("@alloy-js/core").Children[]): import("@alloy-js/core").ComponentCreator<import("./component/ComponentDoc.js").ComponentDocProps>;
    children(...children: import("@alloy-js/core").Children[]): import("@alloy-js/core").ComponentCreator<import("./component/ComponentDoc.js").ComponentDocProps>;
}) | undefined;
//# sourceMappingURL=Doc.d.ts.map