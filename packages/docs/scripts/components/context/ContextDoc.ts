import type { ContextApi } from "../../build-json.js";
import type { DeclarationDescriptor } from "../DocSourceFile.js";
import {
  ContextAccessor,
  ContextInterface,
  ContextSignature,
  DocSourceFile,
  Remarks,
  SeeAlso,
  Summary,
} from "../stc/index.js";

export interface ContextDocProps {
  context: ContextApi;
}

export function ContextDoc(props: ContextDocProps) {
  const title = props.context.name + " context";
  const { contextVariable, contextAccessor, contextInterface } = props.context;

  const declares: DeclarationDescriptor[] = [
    { name: title, apiItem: contextVariable },
  ];

  if (contextAccessor) {
    declares.push({
      name: title + " accessor",
      apiItem: contextAccessor,
    });
  }
  if (typeof contextInterface !== "string") {
    declares.push({
      name: title + " interface",
      apiItem: contextInterface,
    });
  }

  return DocSourceFile({ title, declares }).children(
    Summary({ type: contextVariable }),
    ContextSignature({ context: props.context }),
    ContextAccessor({ context: props.context }),
    ContextInterface({ context: props.context }),
    Remarks({
      type: props.context.contextVariable,
    }),
    SeeAlso({
      type: props.context.contextVariable,
      splitContexts: true,
    }),
  );
}
