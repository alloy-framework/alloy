import { mapJoin, type Children } from "@alloy-js/core";
import type { ApiItem } from "@microsoft/api-extractor-model";
import type { ComponentApi } from "../../build-json.js";
import {
  ComponentProps,
  ComponentSignature,
  DocSourceFile,
  Examples,
  MdxSection,
  Remarks,
  SeeAlso,
  Summary,
} from "../stc/index.js";

export interface ComponentDocProps {
  component: ComponentApi;
}

export function ComponentDoc(props: ComponentDocProps) {
  const { componentFunction, componentProps } = props.component;
  const title = componentFunction.displayName;

  let overloadBlocks: Children;

  if (componentProps.length === 0) {
    overloadBlocks = [ComponentSignature({ component: props.component })];
  } else {
    let index = 1;
    overloadBlocks = mapJoin(
      () => componentProps,
      (iface) => {
        return MdxSection({ title: "Overload " + index++, level: 2 }).children(
          Summary({ type: iface }),
          ComponentSignature({ component: props.component, propsType: iface }),
          ComponentProps({ propType: iface }),
        );
      },
    );
  }

  return DocSourceFile({
    title,
    declares: (componentProps as ApiItem[]).concat(componentFunction),
  }).children(
    Summary({ type: componentFunction }),
    overloadBlocks,
    Remarks({ type: componentFunction }),
    Examples({ type: componentFunction }),
    SeeAlso({ type: componentFunction, splitContexts: true }),
  );
}
