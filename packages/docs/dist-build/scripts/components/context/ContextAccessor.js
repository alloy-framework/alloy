import { code } from "@alloy-js/core";
import { TsDoc } from "../stc/index.js";
export function ContextAccessor(props) {
    if (props.context.contextAccessor) {
        return code `
      ### Accessor

      <Code code={\`import { ${props.context.contextAccessor.displayName} } from "@alloy-js/core";
      
      const myContext = ${props.context.contextAccessor.displayName}();\`} lang="ts" />

      ${props.context.contextAccessor.tsdocComment &&
            TsDoc({
                node: props.context.contextAccessor.tsdocComment.summarySection,
                context: props.context.contextAccessor,
            })}
    `;
    }
    else {
        return code `
      ### Accessor

      <Code code={\`const myContext = useContext(${props.context.name}Context);\`} lang="ts" />
    `;
    }
}
//# sourceMappingURL=ContextAccessor.js.map