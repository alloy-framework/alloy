import {
  createContext,
  effect,
  shallowReactive,
  type Ref,
} from "@alloy-js/core";
import GithubSlugger from "github-slugger";

import type { HeadingSymbol } from "../symbols/heading-symbol.js";

export interface HeadingEntry {
  /** Trimmed heading text, or `undefined` when the heading has JSX children. */
  text: () => string | undefined;
  /** Explicit anchor ID. */
  id?: string;
  /** Link target, present when the heading has a refkey. */
  symbol?: HeadingSymbol;
  /** HTML anchor emitted before the heading, if any. */
  anchor: Ref<string | undefined>;
}

export interface MarkdownFileContext {
  /** Headings in the file, in mount order. */
  headings: Set<HeadingEntry>;
}

export const MarkdownFileContext = createContext<MarkdownFileContext>();

export function createMarkdownFileContext(): MarkdownFileContext {
  const headings = shallowReactive(new Set<HeadingEntry>());
  effect(() => allocateHeadingIds([...headings]));
  return { headings };
}

function allocateHeadingIds(headings: HeadingEntry[]) {
  // Renderers generate an ID for every heading, including those with an explicit ID.
  const slugger = new GithubSlugger();
  let opaque = false;
  const automatic = headings.map((heading) => {
    const text = heading.text();
    if (opaque && heading.symbol && heading.id === undefined) {
      throw new Error(
        "A Heading with a refkey requires an explicit id after a heading with non-string children.",
      );
    }
    if (text === undefined) opaque = true;
    return text === undefined ? undefined : slugger.slug(text);
  });
  const ids = new Set(automatic.filter((id) => id !== undefined));

  const explicit = new Set<string>();
  headings.forEach((heading, i) => {
    const id = heading.id;
    if (id === undefined) return;
    if (explicit.has(id) || (ids.has(id) && automatic[i] !== id)) {
      throw new Error(`Duplicate Markdown heading ID: ${JSON.stringify(id)}.`);
    }
    explicit.add(id);
  });
  for (const id of explicit) ids.add(id);

  headings.forEach((heading, i) => {
    let anchor = heading.id;
    if (anchor === undefined && automatic[i] === "" && heading.symbol) {
      anchor = "section";
      for (let n = 1; ids.has(anchor); n++) anchor = `section-${n}`;
      ids.add(anchor);
    }
    heading.anchor.value = anchor;
    if (!heading.symbol) return;
    const name = anchor ?? automatic[i];
    if (name === undefined) {
      throw new Error(
        "A Heading with a refkey and non-string children requires an explicit id.",
      );
    }
    heading.symbol.name = name;
  });
}
