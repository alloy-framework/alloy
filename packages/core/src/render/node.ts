/**
 * AlloyNode tree — a DOM-aligned in-memory representation of rendered
 * output.
 *
 * Components return AlloyNodes (or values that get inserted into them)
 * via `runtime/insert.ts`; the resulting tree is consumed by the direct
 * printer and `render-output.ts` output-directory walker.
 *
 * Naming and semantics follow the modern DOM where there is meaningful
 * overlap. Only modern DOM mutation methods are exposed
 * (`append`/`prepend`/`before`/`after`/`replaceWith`/`remove`/`text.data`/
 * `moveBefore`). Legacy methods (`appendChild`, `insertBefore`,
 * `removeChild`, `replaceChild`, the `nodeValue` setter) are intentionally
 * NOT provided.
 */

// ─────────────────────────────────────────────────────────────────────────────
// nodeType constants — same numeric codes as DOM
// ─────────────────────────────────────────────────────────────────────────────

export const ELEMENT_NODE = 1 as const;
export const TEXT_NODE = 3 as const;
export const COMMENT_NODE = 8 as const;
export const FRAGMENT_NODE = 11 as const;

export type NodeType = 1 | 3 | 8 | 11;

/**
 * Anything that can be inserted: a Node, a string (auto-wrapped as Text),
 * or a number (auto-wrapped as Text).
 */
export type Insertable = AlloyNode | string | number;

// ─────────────────────────────────────────────────────────────────────────────
// Base Node — tree pointers + modern mutation API
// ─────────────────────────────────────────────────────────────────────────────

export abstract class AlloyNode {
  abstract readonly nodeType: NodeType;

  parentNode: AlloyNode | null = null;
  firstChild: AlloyNode | null = null;
  lastChild: AlloyNode | null = null;
  previousSibling: AlloyNode | null = null;
  nextSibling: AlloyNode | null = null;

  /**
   * Empty-state propagation. `false` for Text/Element with content,
   * `true` for empty regions. Mutated by reactive bindings; read by
   * joiner/ender logic. Direct field — no Vue effect.
   */
  isEmpty = true;

  // ───── Modern DOM mutation API ─────────────────────────────────────────

  /** Append nodes (or strings) to the end of children. */
  append(...nodes: Insertable[]): void {
    for (let i = 0, len = nodes.length; i < len; i++) {
      insertBefore(this, normalize(nodes[i]), null);
    }
  }

  /** Prepend nodes (or strings) to the beginning of children. */
  prepend(...nodes: Insertable[]): void {
    const first = this.firstChild;
    for (let i = 0, len = nodes.length; i < len; i++) {
      insertBefore(this, normalize(nodes[i]), first);
    }
  }

  /** Insert nodes immediately before `this` in the parent's child list. */
  before(...nodes: Insertable[]): void {
    const parent = this.parentNode;
    if (parent === null) return;
    for (let i = 0, len = nodes.length; i < len; i++) {
      insertBefore(parent, normalize(nodes[i]), this);
    }
  }

  /** Insert nodes immediately after `this` in the parent's child list. */
  after(...nodes: Insertable[]): void {
    const parent = this.parentNode;
    if (parent === null) return;
    const ref = this.nextSibling;
    for (let i = 0, len = nodes.length; i < len; i++) {
      insertBefore(parent, normalize(nodes[i]), ref);
    }
  }

  /** Replace `this` with the given nodes in the parent's child list. */
  replaceWith(...nodes: Insertable[]): void {
    const parent = this.parentNode;
    if (parent === null) return;
    const ref = this.nextSibling;
    detach(this);
    for (let i = 0, len = nodes.length; i < len; i++) {
      insertBefore(parent, normalize(nodes[i]), ref);
    }
  }

  /** Remove `this` from its parent. */
  remove(): void {
    if (this.parentNode !== null) detach(this);
  }

  /**
   * Atomic move: relocate `node` to be a child of `this` immediately
   * before `ref` (or at the end if `ref` is null), without disconnecting
   * any state on the moved subtree. Used by `<For>` reorder paths so
   * keyed-item bindings stay live.
   *
   * Mirrors the 2024 DOM `Element.moveBefore(node, child)` proposal.
   */
  moveBefore(node: AlloyNode, ref: AlloyNode | null): void {
    if (node.parentNode === this && node.nextSibling === ref) return;
    detach(node);
    insertBefore(this, node, ref);
  }

  /**
   * Deep-clone this node and its subtree. The clone has no parent and
   * its children are themselves clones. Used when a node value would
   * otherwise be inserted into two parents (e.g. a shared joiner element
   * produced by mapJoin) — Alloy intrinsic nodes are stateless so a
   * fresh tree is semantically equivalent.
   */
  cloneNode(): AlloyNode {
    const copy = this.cloneShallow();
    for (let c = this.firstChild; c !== null; c = c.nextSibling) {
      insertBefore(copy, c.cloneNode(), null);
    }
    return copy;
  }

  protected abstract cloneShallow(): AlloyNode;
}

// ─────────────────────────────────────────────────────────────────────────────
// Concrete Node types
// ─────────────────────────────────────────────────────────────────────────────

/** Text node — analog of DOM Text / CharacterData. */
export class TextNode extends AlloyNode {
  readonly nodeType = TEXT_NODE;
  data: string;

  // Cached during construction — text data is set once and never mutated
  // (insert.ts replaces TextNode instances rather than reassigning .data).
  // Reading these in the printer's hot path is much cheaper than rerunning
  // getStringWidth / two indexOf scans on every print.
  /** Display width (Prettier-compatible). Lazily filled on first read. */
  _w: number = -1;
  /** 1 if `data` contains a newline, 0 if not, -1 if not yet computed. */
  _nl: number = -1;

  constructor(data: string) {
    super();
    this.data = data;
    this.isEmpty = data.length === 0;
  }

  protected cloneShallow(): TextNode {
    return new TextNode(this.data);
  }
}

/**
 * Comment node — used as a slot anchor (start/end markers) bracketing
 * dynamic regions. Solid uses the same pattern.
 */
export class CommentNode extends AlloyNode {
  readonly nodeType = COMMENT_NODE;
  data: string;
  /** Comments don't contribute output, always empty. */
  isEmpty = true;

  constructor(data: string = "") {
    super();
    this.data = data;
  }

  protected cloneShallow(): CommentNode {
    return new CommentNode(this.data);
  }
}

/**
 * Element node — Alloy hook node. `localName` carries the hook kind
 * ("group", "indent", "line", "softline", "ifBreak", etc).
 *
 * `data` carries hook-specific config (e.g. `{ shouldBreak: false }` for
 * a group). Kept as a single bag rather than a parallel hierarchy of
 * subclasses to avoid V8 hidden-class fan-out.
 */
export class ElementNode extends AlloyNode {
  readonly nodeType = ELEMENT_NODE;
  localName: string;
  data: unknown;

  /**
   * Count of unabsorbed break-leaves in this subtree. Maintained by
   * `insertBefore` / `detach` so the printer can decide whether a
   * `group` is broken in O(1) without a prepass walk.
   *
   * `breakParent` / `hardline` / `hbr` / `literalline` / `lbr` elements
   * and TextNodes containing `\n`/`\r` count as break-leaves; a `group`
   * element absorbs the count from its own subtree (does not propagate
   * outward).
   *
   * For `ifBreak` elements the count includes contributions from
   * `data.flatNode` (the alternate branch is not in the regular tree).
   */
  _breakCount: number = 0;

  constructor(localName: string, data?: unknown) {
    super();
    this.localName = localName;
    this.data = data;
  }

  protected cloneShallow(): ElementNode {
    return new ElementNode(this.localName, this.data);
  }
}

/**
 * Fragment node — transient batch container. Inserting a Fragment splices
 * its children into the target (mirroring DOM DocumentFragment semantics)
 * and the Fragment itself becomes empty.
 */
export class FragmentNode extends AlloyNode {
  readonly nodeType = FRAGMENT_NODE;

  protected cloneShallow(): FragmentNode {
    return new FragmentNode();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Constructors — `document.create*`-style names
// ─────────────────────────────────────────────────────────────────────────────

export function createTextNode(data: string): TextNode {
  return new TextNode(data);
}

export function createComment(data: string = ""): CommentNode {
  return new CommentNode(data);
}

export function createElement(localName: string, data?: unknown): ElementNode {
  return new ElementNode(localName, data);
}

export function createFragment(): FragmentNode {
  return new FragmentNode();
}

// ─────────────────────────────────────────────────────────────────────────────
// Eager break-propagation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Element local-names whose mere presence forces the innermost enclosing
 * `group` to break (= count as one "break leaf"). Mirrors the cases
 * Prettier's `propagateBreaks` triggers on.
 */
function isBreakLeafElement(localName: string): boolean {
  return (
    localName === "breakParent" ||
    localName === "hardline" ||
    localName === "hbr" ||
    localName === "literalline" ||
    localName === "lbr"
  );
}

/**
 * How many break-leaves does inserting/removing `n` add to its parent's
 * subtree? `group` absorbs internal breaks → contributes 0 outward.
 * `ifBreak` includes its `flatNode` count too (the alternate branch is
 * stored on `data`, not in the regular tree).
 */
function effectiveBreakCount(n: AlloyNode): number {
  const nt = n.nodeType;
  if (nt === TEXT_NODE) {
    const t = n as TextNode;
    // Inline (and cache) the textHasNewline check to avoid a cross-module
    // call on the hot insert path.
    let nl = t._nl;
    if (nl < 0) {
      const s = t.data;
      nl =
        s.length > 0 && (s.indexOf("\n") !== -1 || s.indexOf("\r") !== -1) ?
          1
        : 0;
      t._nl = nl;
    }
    return nl;
  }
  if (nt === ELEMENT_NODE) {
    const el = n as ElementNode;
    const ln = el.localName;
    if (isBreakLeafElement(ln)) return 1;
    if (ln === "group") {
      const broken =
        el._breakCount > 0 ||
        (el.data as { shouldBreak?: boolean } | undefined)?.shouldBreak ===
          true;
      return broken ? 1 : 0;
    }
    if (ln === "ifBreak") {
      const flat = (el.data as { flatNode?: ElementNode } | undefined)
        ?.flatNode;
      return el._breakCount + (flat ? flat._breakCount : 0);
    }
    return el._breakCount;
  }
  return 0;
}

/**
 * Walk up from `start` adjusting `_breakCount` by `delta`. When the walk
 * crosses a `group` element, the group itself absorbs the inner breaks,
 * but if its own broken state transitions (0 ↔ >0) it must propagate ±1
 * outward so that ancestor groups also become broken (matches Prettier's
 * `propagateBreaks` cascade through groupStack).
 */
function propagateBreakDelta(start: AlloyNode | null, delta: number): void {
  if (delta === 0) return;
  let d = delta;
  for (let n: AlloyNode | null = start; n !== null; n = n.parentNode) {
    if (n.nodeType !== ELEMENT_NODE) continue;
    const el = n as ElementNode;
    const before = el._breakCount;
    el._breakCount = before + d;
    if (el.localName === "group") {
      const wasBroken =
        before > 0 ||
        (el.data as { shouldBreak?: boolean } | undefined)?.shouldBreak ===
          true;
      const nowBroken =
        el._breakCount > 0 ||
        (el.data as { shouldBreak?: boolean } | undefined)?.shouldBreak ===
          true;
      if (wasBroken === nowBroken) return;
      d = nowBroken ? 1 : -1;
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Core mutation primitives (private)
// ─────────────────────────────────────────────────────────────────────────────

function normalize(input: Insertable): AlloyNode {
  if (typeof input === "string") return new TextNode(input);
  if (typeof input === "number") return new TextNode(String(input));
  return input;
}

/**
 * Splice `node` (or its children, if Fragment) into `parent` immediately
 * before `ref` (or at end if `ref` is null). Detaches `node` from any
 * existing parent first.
 */
/** Mutation listener — set by `debug/render.ts`. */
export interface MutationListener {
  attached(node: AlloyNode, parent: AlloyNode): void;
  detached(node: AlloyNode, formerParent: AlloyNode): void;
}
let mutationListener: MutationListener | null = null;
export function setMutationListener(l: MutationListener | null): void {
  mutationListener = l;
}

function insertBefore(
  parent: AlloyNode,
  node: AlloyNode,
  ref: AlloyNode | null,
): void {
  // Fragment: splice its children, leaving the fragment itself empty.
  if (node.nodeType === FRAGMENT_NODE) {
    let child = node.firstChild;
    node.firstChild = null;
    node.lastChild = null;
    while (child !== null) {
      const next = child.nextSibling;
      child.parentNode = null;
      child.previousSibling = null;
      child.nextSibling = null;
      insertBefore(parent, child, ref);
      child = next;
    }
    return;
  }

  if (node.parentNode !== null) detach(node);

  node.parentNode = parent;
  if (ref === null) {
    // append
    const last = parent.lastChild;
    node.previousSibling = last;
    node.nextSibling = null;
    if (last !== null) last.nextSibling = node;
    else parent.firstChild = node;
    parent.lastChild = node;
  } else {
    // insert before ref
    const prev = ref.previousSibling;
    node.previousSibling = prev;
    node.nextSibling = ref;
    ref.previousSibling = node;
    if (prev !== null) prev.nextSibling = node;
    else parent.firstChild = node;
  }
  // Eager break propagation — keeps groups' `_breakCount` accurate so
  // the printer can skip its `propagateBreaks` prepass.
  propagateBreakDelta(parent, effectiveBreakCount(node));
  if (mutationListener !== null) mutationListener.attached(node, parent);
}

function detach(node: AlloyNode): void {
  const parent = node.parentNode;
  if (parent === null) return;
  // Subtract this subtree's break contribution from ancestors before
  // unlinking, so `_breakCount` stays in sync.
  propagateBreakDelta(parent, -effectiveBreakCount(node));
  const prev = node.previousSibling;
  const next = node.nextSibling;
  if (prev !== null) prev.nextSibling = next;
  else parent.firstChild = next;
  if (next !== null) next.previousSibling = prev;
  else parent.lastChild = prev;
  node.parentNode = null;
  node.previousSibling = null;
  node.nextSibling = null;
  if (mutationListener !== null) mutationListener.detached(node, parent);
}
