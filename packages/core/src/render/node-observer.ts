import type { AlloyNode } from "./node.js";

const observers = new WeakMap<AlloyNode, Set<() => void>>();
let observerCount = 0;

/**
 * Observe insertions and removals within one rendered subtree.
 * The caller owns the returned cleanup function.
 *
 * @internal
 */
export function _observeNode(
  node: AlloyNode,
  callback: () => void,
): () => void {
  let callbacks = observers.get(node);
  if (!callbacks) {
    callbacks = new Set();
    observers.set(node, callbacks);
  }
  const listener = () => callback();
  callbacks.add(listener);
  observerCount++;
  return () => {
    if (callbacks.delete(listener)) observerCount--;
  };
}

/** @internal */
export function notifyNodeObservers(parent: AlloyNode): void {
  if (observerCount === 0) return;
  for (let node: AlloyNode | null = parent; node; node = node.parentNode) {
    const callbacks = observers.get(node);
    if (callbacks) {
      for (const callback of callbacks) callback();
    }
  }
}
