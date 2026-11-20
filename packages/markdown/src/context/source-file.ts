import {
  createContext,
  effect,
  emitDiagnostic,
  onCleanup,
  printTree,
  shallowRef,
  untrack,
  type AlloyNode,
  type DiagnosticHandle,
} from "@alloy-js/core";
import GithubSlugger from "github-slugger";

import { headingText } from "../heading-text.js";
import type {
  HeadingDependency,
  HeadingSymbol,
} from "../symbols/heading-symbol.js";

export interface HeadingTarget {
  symbol: HeadingSymbol;
  content?: AlloyNode;
  explicitId?: string;
  dependencies: Set<HeadingDependency>;
}

export interface MarkdownFileContext {
  headings: Set<HeadingTarget>;
  invalidate(): void;
}

export const MarkdownFileContext = createContext<MarkdownFileContext>();
export const HeadingContext = createContext<HeadingTarget>();

export function createMarkdownFileContext(): MarkdownFileContext {
  const revision = shallowRef(0);
  const headings = new Set<HeadingTarget>();
  const file: MarkdownFileContext = {
    headings,
    invalidate() {
      untrack(() => revision.value++);
    },
  };
  let cycleDiagnostic: DiagnosticHandle | undefined;
  onCleanup(() => cycleDiagnostic?.dismiss());
  effect(() => {
    void revision.value;
    untrack(() => {
      if (allocateHeadings(headings)) {
        cycleDiagnostic ??= emitDiagnostic({
          severity: "error",
          message: "Cyclic Markdown heading reference in display text.",
        });
      } else {
        cycleDiagnostic?.dismiss();
        cycleDiagnostic = undefined;
      }
    });
  });
  return file;
}

function allocateHeadings(headings: Set<HeadingTarget>) {
  const byNode = new Map<AlloyNode, HeadingTarget>();
  for (const heading of headings) {
    if (heading.content) byNode.set(heading.content, heading);
  }
  const first = byNode.keys().next().value;
  if (!first) return;
  // Mount order differs from document order when conditional headings appear.
  let root = first;
  while (root.parentNode) root = root.parentNode;
  const ordered: HeadingTarget[] = [];
  function visit(node: AlloyNode) {
    const heading = byNode.get(node);
    if (heading) ordered.push(heading);
    for (let child = node.firstChild; child; child = child.nextSibling) {
      visit(child);
    }
  }
  visit(root);

  const visiting = new Set<HeadingSymbol>();
  const visited = new Set<HeadingSymbol>();
  function checkCycle(symbol: HeadingSymbol): boolean {
    if (visiting.has(symbol)) {
      return true;
    }
    if (visited.has(symbol)) return false;
    visiting.add(symbol);
    for (const dependency of symbol.dependencies) {
      const target = dependency.resolve();
      if (target && checkCycle(target)) return true;
    }
    visiting.delete(symbol);
    visited.add(symbol);
    return false;
  }
  if (ordered.some((heading) => checkCycle(heading.symbol))) {
    for (const heading of ordered) heading.symbol.ready = false;
    return true;
  }

  const slugger = new GithubSlugger();
  const ids = new Set<string>();
  const automaticIds = new Map<HeadingTarget, string>();
  // Reserve renderer-generated IDs before allocating explicit empty-slug fallbacks.
  for (const heading of ordered) {
    const symbol = heading.symbol;
    if (
      [...heading.dependencies].some((dependency) => !dependency.isCurrent())
    ) {
      symbol.ready = false;
      continue;
    }
    const title = headingText(
      printTree(heading.content!, { noFlush: true, printWidth: Infinity }),
    );
    automaticIds.set(heading, slugger.slug(title));
    symbol.title = title;
  }
  for (const heading of ordered) {
    const automaticId = automaticIds.get(heading);
    if (automaticId === undefined) continue;
    const symbol = heading.symbol;
    const id = heading.explicitId ?? (automaticId || slugger.slug("section"));
    if (ids.has(id) || ids.has(automaticId)) {
      throw new Error(`Duplicate Markdown heading ID: ${JSON.stringify(id)}.`);
    }
    ids.add(id);
    ids.add(automaticId);
    symbol.metadata.explicitAnchor =
      heading.explicitId !== undefined || automaticId === "";
    symbol.name = id;
    symbol.ready = true;
  }
}
