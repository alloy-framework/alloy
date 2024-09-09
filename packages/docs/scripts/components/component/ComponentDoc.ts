import type { ComponentApi } from "../../build-json.js";
import {
  ComponentProps,
  ComponentSignature,
  DocDeclaration,
  Frontmatter,
  MdxSourceFile,
  Remarks,
  TsDoc,
} from "../stc/index.js";

export interface ComponentDocProps {
  component: ComponentApi;
}

export function ComponentDoc(props: ComponentDocProps) {
  const title = props.component.componentFunction.displayName;
  const summaryNode =
    props.component.componentFunction.tsdocComment?.summarySection;

  return MdxSourceFile({ path: title + ".mdx" }).children(
    DocDeclaration({
      name: title,
      apiItem: props.component.componentFunction,
    }),

    props.component.componentProps &&
      DocDeclaration({
        name: props.component.componentProps.displayName,
        apiItem: props.component.componentProps,
      }),

    Frontmatter({ title }),

    summaryNode && [
      TsDoc({
        node: summaryNode,
        context: props.component.componentFunction,
      }),
      "\n\n",
    ],

    ComponentSignature({ component: props.component }),

    props.component.componentProps &&
      ComponentProps({ propType: props.component.componentProps }),

    Remarks({
      type: props.component.componentFunction,
    }),
  );
}
