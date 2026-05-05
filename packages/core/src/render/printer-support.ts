/**
 * Shared scaffolding for the direct AlloyNode printer.
 *
 * `Indent` management, `trim`, mode constants, and the cursor placeholder
 * are kept separate from the main tree walk so the printer's control flow
 * stays focused on AlloyNode dispatch.
 */

import { getStringWidth } from "./get-string-width.js";
import type { TextNode } from "./node.js";

export { getStringWidth };

/**
 * Width of a TextNode's data, cached on the node (data is immutable
 * post-construction). Includes an ASCII fast path — for the bulk of
 * generated source, every char is < 0x80 so display width === string
 * length and we skip the (expensive) emoji-regex / east-asian-width
 * traversal that lives in `getStringWidth`.
 */
export function textWidth(t: TextNode): number {
  let w = t._w;
  if (w >= 0) return w;
  const s = t.data;
  // ASCII-only fast path.
  let i = 0;
  const len = s.length;
  for (; i < len; i++) if (s.charCodeAt(i) >= 0x80) break;
  w = i === len ? len : getStringWidth(s);
  t._w = w;
  return w;
}

/** Whether a TextNode's data contains \n or \r. Cached. */
export function textHasNewline(t: TextNode): boolean {
  let nl = t._nl;
  if (nl < 0) {
    const s = t.data;
    nl =
      s.length > 0 && (s.indexOf("\n") !== -1 || s.indexOf("\r") !== -1) ?
        1
      : 0;
    t._nl = nl;
  }
  return nl === 1;
}

export const MODE_BREAK = Symbol("MODE_BREAK");
export const MODE_FLAT = Symbol("MODE_FLAT");
export const CURSOR_PLACEHOLDER = Symbol("cursor");

export type Mode = typeof MODE_BREAK | typeof MODE_FLAT;

export interface PrintNodeOptions {
  printWidth: number;
  tabWidth: number;
  useTabs?: boolean;
}

export interface IndentPart {
  type: "indent" | "stringAlign" | "numberAlign";
  n?: any;
}

export interface Indent {
  value: string;
  length: number;
  queue: IndentPart[];
  root?: Indent;
}

export function rootIndent(): Indent {
  return { value: "", length: 0, queue: [] };
}

export function makeIndent(ind: Indent, options: PrintNodeOptions): Indent {
  return generateInd(ind, { type: "indent" }, "indent", options);
}

export function makeAlign(
  indent: Indent,
  widthOrDoc: any,
  options: PrintNodeOptions,
): Indent {
  if (widthOrDoc === Number.NEGATIVE_INFINITY) {
    return indent.root || rootIndent();
  }
  if (widthOrDoc < 0) {
    return generateInd(indent, { type: "indent" }, "dedent", options);
  }
  if (!widthOrDoc) {
    return indent;
  }
  if (widthOrDoc.type === "root") {
    return { ...indent, root: indent };
  }
  const alignType: "stringAlign" | "numberAlign" =
    typeof widthOrDoc === "string" ? "stringAlign" : "numberAlign";
  return generateInd(
    indent,
    { type: alignType, n: widthOrDoc },
    alignType,
    options,
  );
}

function generateInd(
  ind: Indent,
  newPart: IndentPart,
  op: "indent" | "dedent" | "stringAlign" | "numberAlign",
  options: PrintNodeOptions,
): Indent {
  const queue: IndentPart[] =
    op === "dedent" ? ind.queue.slice(0, -1) : [...ind.queue, newPart];
  let value = "";
  let length = 0;
  let lastTabs = 0;
  let lastSpaces = 0;
  for (const part of queue) {
    switch (part.type) {
      case "indent":
        flush();
        if (options.useTabs) addTabs(1);
        else addSpaces(options.tabWidth);
        break;
      case "stringAlign":
        flush();
        value += part.n;
        length += (part.n as string).length;
        break;
      case "numberAlign":
        lastTabs += 1;
        lastSpaces += part.n as number;
        break;
      default:
        throw new Error(`Unexpected type '${(part as any).type}'`);
    }
  }
  flushSpaces();
  return { ...ind, value, length, queue };

  function addTabs(count: number): void {
    value += "\t".repeat(count);
    length += options.tabWidth * count;
  }
  function addSpaces(count: number): void {
    value += " ".repeat(count);
    length += count;
  }
  function flush(): void {
    if (options.useTabs) {
      if (lastTabs > 0) addTabs(lastTabs);
      lastTabs = 0;
      lastSpaces = 0;
    } else flushSpaces();
  }
  function flushSpaces(): void {
    if (lastSpaces > 0) addSpaces(lastSpaces);
    lastTabs = 0;
    lastSpaces = 0;
  }
}

/**
 * Roll back trailing spaces / tabs from the emitted output. Used by
 * `trim` doc/element and at every newline before emitting indentation
 * (Prettier semantics — see prettier/doc.js `trim2`).
 */
export function trimOut(out: (string | symbol)[]): number {
  let trimCount = 0;
  let cursorCount = 0;
  let outIndex = out.length;
  outer: while (outIndex--) {
    const last = out[outIndex];
    if (last === CURSOR_PLACEHOLDER) {
      cursorCount++;
      continue;
    }
    const s = last as string;
    for (let charIndex = s.length - 1; charIndex >= 0; charIndex--) {
      const char = s[charIndex];
      if (char === " " || char === "\t") {
        trimCount++;
      } else {
        out[outIndex] = s.slice(0, charIndex + 1);
        break outer;
      }
    }
  }
  if (trimCount > 0 || cursorCount > 0) {
    out.length = outIndex + 1;
    while (cursorCount-- > 0) out.push(CURSOR_PLACEHOLDER);
  }
  return trimCount;
}

export function joinOut(out: (string | symbol)[]): string {
  const cursorIdx = out.indexOf(CURSOR_PLACEHOLDER);
  if (cursorIdx === -1) return out.join("");
  // Cursors are not used by alloy. Strip them; tests don't exercise.
  const otherIdx = out.indexOf(CURSOR_PLACEHOLDER, cursorIdx + 1);
  if (otherIdx === -1) {
    return out.filter((c) => c !== CURSOR_PLACEHOLDER).join("");
  }
  const before = out.slice(0, cursorIdx).join("");
  const around = out.slice(cursorIdx + 1, otherIdx).join("");
  const after = out.slice(otherIdx + 1).join("");
  return before + around + after;
}
