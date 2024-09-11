import type { ApiItem } from "@microsoft/api-extractor-model";
import type { ComponentApi } from "../../build-json.js";
import { Examples } from "../Examples.js";
import {
  ComponentProps,
  ComponentSignature,
  DocSourceFile,
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
  const declares: ApiItem[] = [componentFunction];
  if (componentProps) {
    declares.push(componentProps);
  }
  return DocSourceFile({ title, declares }).children(
    Summary({ type: componentFunction }),
    ComponentSignature({ component: props.component }),
    ComponentProps({ propType: componentProps }),
    Remarks({ type: componentFunction }),
    Examples({ type: componentFunction }),
    SeeAlso({ type: componentFunction, splitContexts: true }),
  );
}
