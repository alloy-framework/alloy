import type { Context } from "../reactivity.js";
import type { AlloyNode } from "./node.js";

interface ContextNode extends AlloyNode {
  __alloyCtx?: Context;
}

export function getContextForNode(node: AlloyNode): Context | undefined {
  return (node as ContextNode).__alloyCtx;
}

export function setContextForNode(node: AlloyNode, context: Context): void {
  (node as ContextNode).__alloyCtx = context;
}
