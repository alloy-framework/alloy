/**
 * Print hook types and utilities.
 * This is a separate file to avoid circular dependencies between render.ts and debug/render.ts.
 */

export const printHookTag = Symbol();

export interface PrintHook {
  [printHookTag]: true;
  transform?(tree: RenderedTextTree): RenderedTextTree;
  print?(
    tree: RenderedTextTree,
    print: (subtree: RenderedTextTree) => import("prettier").Doc,
  ): import("prettier").Doc;
  subtree: RenderedTextTree;
}

export function isPrintHook(type: unknown): type is PrintHook {
  return typeof type === "object" && type !== null && printHookTag in type;
}

export type RenderedTextTree = (string | RenderedTextTree | PrintHook)[];
