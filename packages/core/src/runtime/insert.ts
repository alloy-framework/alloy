/**
 * Polymorphic child insertion — the single entry point for "put this thing
 * into this AlloyNode". The babel-emitted compiled output calls `insert`
 * for every JSX child slot.
 *
 * When the child is a `ComponentCreator` thunk, we invoke it synchronously
 * inside a freshly-pushed owner Context via {@link runInContext}. No Vue
 * effect is allocated for component invocation.
 *
 * Reactive bindings (function children, refs, refkeys) get a bracketed
 * region between two comment markers and a single Vue `effect` that
 * rewrites the bracketed range on re-fire.
 */
import { isRef, type Ref } from "@vue/reactivity";
import { useContext } from "../context.js";
import { SourceFileContext } from "../context/source-file.js";
import { debug, isDebugEnabled } from "../debug/index.js";
import {
  contentAdded,
  contentRemoved,
  effect,
  getContext,
  isCustomContext,
  notifyContentState,
  runInContext,
  untrack,
  type CustomContext,
} from "../reactivity.js";
import { isRefkey, isRefkeyable, toRefkey, type Refkey } from "../refkey.js";
import { notifyRenderError } from "../render-error.js";
import { popStack, pushStack } from "../render-stack.js";
import { setContextForNode } from "../render/node-context.js";
import {
  AlloyNode,
  CommentNode,
  createComment,
  createElement,
  ElementNode,
  TextNode,
} from "../render/node.js";
import {
  isComponentCreator,
  isRenderableObject,
  RENDERABLE,
  type Children,
  type ComponentCreator,
} from "./component.js";

/**
 * Insert `child` into `parent`. If `marker` is provided, insert
 * immediately before `marker`; otherwise append at the end of
 * `parent`'s children.
 *
 * Recognized child shapes (in order):
 *  - `null` / `undefined` / `boolean` — no-op.
 *  - `string` — appended/inserted as a text node.
 *  - `number` — coerced to text.
 *  - `AlloyNode` — appended/inserted directly (Fragment children are
 *    spliced; see {@link AlloyNode.append}).
 *  - `Array` — each element is recursively inserted in order.
 *  - `ComponentCreator` (thunk from `createComponent`) — invoked inside
 *    `runInContext`; the returned `Children` value is recursively
 *    inserted. **No Vue effect is allocated.**
 *  - `Ref` — wrapped as a reactive accessor (`() => ref.value`) and
 *    inserted as a reactive binding.
 *  - `Refkey` / RefkeyableObject — resolved against the active
 *    `SourceFileContext.reference` inside an effect.
 *  - RenderableObject (with `[RENDERABLE]` method) — reactive binding
 *    over the method's return value.
 *  - `function` — reactive binding; the function is invoked inside an
 *    effect, the result is recursively inserted, and the bracketed
 *    range is rewritten on re-fire.
 *  - other — coerced via `String()` as a fallback.
 */
export function insert(
  parent: AlloyNode,
  child: unknown,
  marker: AlloyNode | null = null,
): void {
  if (child === null || child === undefined || typeof child === "boolean") {
    return;
  }

  if (typeof child === "string") {
    insertNode(parent, child, marker);
    return;
  }

  if (typeof child === "number") {
    insertNode(parent, String(child), marker);
    return;
  }

  if (child instanceof AlloyNode) {
    // Stateless intrinsic trees (mapJoin joiners, cached `<hbr/>`s,
    // etc.) may flow through multiple insertion points sharing the
    // same value reference. AlloyNode is a real tree (one parent), so
    // clone on re-parent rather than steal from the prior insertion.
    const node = child.parentNode !== null ? child.cloneNode() : child;
    insertNode(parent, node, marker);
    return;
  }

  if (Array.isArray(child)) {
    for (let i = 0, len = child.length; i < len; i++) {
      insert(parent, child[i], marker);
    }
    return;
  }

  if (isCustomContext(child)) {
    insertCustomContext(parent, child, marker);
    return;
  }

  if (isComponentCreator(child)) {
    insertComponent(parent, child as ComponentCreator, marker);
    return;
  }

  if (isRef(child)) {
    insertReactive(parent, () => (child as Ref).value, marker);
    return;
  }

  if (isRefkey(child) || isRefkeyable(child)) {
    insertRefkey(parent, child as Refkey, marker);
    return;
  }

  if (isRenderableObject(child)) {
    insertReactive(parent, () => child[RENDERABLE](), marker);
    return;
  }

  if (typeof child === "function") {
    insertReactive(parent, child as () => unknown, marker);
    return;
  }

  // Fallback — coerce to string.
  insertNode(parent, String(child), marker);
}

/**
 * Invoke a component thunk inside a fresh owner Context (synchronous,
 * no Vue effect) and recursively insert its return value.
 *
 * A `<Foo bar={x} />` JSX site compiled to `createComponent(Foo, props)`
 * arrives here, and `Foo`'s body runs only at this insertion point —
 * preserving conditional skip, render-time refkey resolution, and
 * context-flow-from-the-rendering-position semantics.
 */
function insertComponent(
  parent: AlloyNode,
  thunk: ComponentCreator,
  marker: AlloyNode | null,
): void {
  // Keep the component's pushed Context live while children are
  // recursively inserted: any reactive bindings (effects) created for
  // children must capture the component's context as their owner so
  // that `useContext(...)` walks find values set by Context.Providers
  // and other parent components.
  runInContext(() => {
    pushStack(thunk.component, thunk.props, thunk.source);
    const session = debug.render.beginComponent({
      component: thunk as ComponentCreator<unknown>,
      propsSource: thunk.props as Record<string, unknown> | undefined,
      source: thunk.source,
      parent,
    });
    let result: unknown;
    try {
      result = untrack(thunk);
    } catch (error) {
      notifyRenderError(error);
      session.dispose();
      popStack();
      throw error;
    }
    try {
      const ctx = getContext()!;
      // Carry component identity for error stacks.
      if (ctx.meta && result instanceof AlloyNode) {
        (ctx.meta as { renderNode?: AlloyNode }).renderNode = result;
      }
      const meta = ctx.meta as
        | { sourceFile?: unknown; directory?: unknown; copyFile?: unknown }
        | undefined;
      if (meta?.sourceFile || meta?.directory || meta?.copyFile) {
        if (meta.sourceFile) {
          const sf = meta.sourceFile as { path: string; filetype: string };
          session.recordFile(sf.path, sf.filetype);
        } else if (meta.directory) {
          const d = meta.directory as { path: string };
          session.recordDirectory(d.path);
        }
        const localName =
          meta.sourceFile ? "alloy:source-file"
          : meta.directory ? "alloy:directory"
          : "alloy:copy-file";
        if (result instanceof ElementNode && result.localName === localName) {
          setContextForNode(result, ctx);
          insertNode(parent, result, marker);
          return;
        }
        const wrapper: ElementNode = createElement(localName);
        setContextForNode(wrapper, ctx);
        try {
          insert(wrapper, result as Children, null);
        } catch (error) {
          notifyRenderError(error);
          throw error;
        }
        insertNode(parent, wrapper, marker);
        return;
      }
      if (result instanceof AlloyNode) {
        setContextForNode(result, ctx);
      }
      try {
        insert(parent, result as Children, marker);
      } catch (error) {
        notifyRenderError(error);
        throw error;
      }
    } finally {
      session.dispose();
      popStack();
    }
  });
}

/**
 * Wrap `accessor` in an effect; bracket its produced content between two
 * comment markers and replace the bracketed range on re-fire.
 *
 * On initial run the markers are inserted into `parent` (before
 * `marker` if given, else appended). Each effect invocation:
 *   1. Removes everything between `start` and `end`.
 *   2. Calls `accessor()` (tracking) to get the new content.
 *   3. Inserts the new content via `insert(parent, content, end)` so it
 *      lands inside the bracketed range.
 */
function insertReactive(
  parent: AlloyNode,
  accessor: () => unknown,
  marker: AlloyNode | null,
): void {
  const start: CommentNode = createComment("slot:start");
  const end: CommentNode = createComment("slot:end");
  insertNode(parent, start, marker);
  insertNode(parent, end, marker);
  const memo =
    isDebugEnabled() ? debug.render.prepareMemoNode(start, end) : null;

  // Tracks the previous accessor result when it was an array, so we can
  // do identity-keyed reconciliation rather than clear-and-reinsert.
  let prevSlots: Map<unknown, [CommentNode, CommentNode]> | null = null;

  effect(() => {
    const value = accessor();

    if (Array.isArray(value)) {
      untrack(() => {
        memo?.enter();
        try {
          reconcileArray(parent, start, end, value);
        } finally {
          memo?.leave();
        }
      });
      return;
    }

    untrack(() => {
      if (prevSlots) {
        prevSlots = null;
      }
      let n = start.nextSibling;
      let removedCount = 0;
      while (n !== null && n !== end) {
        const next = n.nextSibling;
        if (countsAsContent(n)) removedCount++;
        n.remove();
        n = next;
      }
      if (removedCount > 0) {
        for (let i = 0; i < removedCount; i++) contentRemoved();
        notifyContentState();
      }
      memo?.enter();
      try {
        insert(parent, value, end);
      } finally {
        memo?.leave();
      }
    });
  });

  function reconcileArray(
    parent: AlloyNode,
    start: CommentNode,
    end: CommentNode,
    next: unknown[],
  ): void {
    const prevSlotMap = prevSlots ?? new Map();
    const newSlots = new Map<unknown, [CommentNode, CommentNode]>();
    const used = new Set<unknown>();

    let cursor: AlloyNode = start;
    for (let i = 0; i < next.length; i++) {
      const entry = next[i];
      const reusable =
        entry !== null &&
        (typeof entry === "object" || typeof entry === "function") &&
        (isCustomContext(entry) || isComponentCreator(entry)) &&
        prevSlotMap.has(entry) &&
        !used.has(entry);
      if (reusable) {
        const [slotStart, slotEnd] = prevSlotMap.get(entry)!;
        moveRange(slotStart, slotEnd, cursor);
        used.add(entry);
        newSlots.set(entry, [slotStart, slotEnd]);
        cursor = slotEnd;
        continue;
      }

      const sStart = createComment("slot:item:start");
      const sEnd = createComment("slot:item:end");
      cursor.after(sEnd);
      sEnd.before(sStart);
      insert(parent, entry, sEnd);
      if (
        entry !== null &&
        (typeof entry === "object" || typeof entry === "function") &&
        (isCustomContext(entry) || isComponentCreator(entry))
      ) {
        newSlots.set(entry, [sStart, sEnd]);
      }
      cursor = sEnd;
    }

    if (prevSlotMap.size > 0) {
      for (const [entry, [s, e]] of prevSlotMap) {
        if (used.has(entry)) continue;
        removeRange(s, e);
      }
    }

    let n = cursor.nextSibling;
    while (n !== null && n !== end) {
      const nx = n.nextSibling;
      if (countsAsContent(n)) contentRemoved();
      n.remove();
      n = nx;
    }
    notifyContentState();

    prevSlots = newSlots;
  }

  function moveRange(s: CommentNode, e: CommentNode, after: AlloyNode): void {
    if (s.previousSibling === after) return;
    const nodes: AlloyNode[] = [];
    let n: AlloyNode | null = s;
    while (n !== null) {
      nodes.push(n);
      if (n === e) break;
      n = n.nextSibling;
    }
    for (const node of nodes) node.remove();
    let anchor = after;
    for (const node of nodes) {
      anchor.after(node);
      anchor = node;
    }
  }

  function removeRange(s: CommentNode, e: CommentNode): void {
    let n: AlloyNode | null = s;
    let removed = 0;
    while (n !== null) {
      const nx: AlloyNode | null = n.nextSibling;
      if (countsAsContent(n)) removed++;
      n.remove();
      if (n === e) break;
      n = nx;
    }
    if (removed > 0) {
      for (let i = 0; i < removed; i++) contentRemoved();
    }
  }
}

/**
 * Refkey insertion — resolve against the active SourceFileContext and
 * wrap in a reactive binding so the produced Reference content updates
 * if the binder updates.
 */
function insertRefkey(
  parent: AlloyNode,
  key: Refkey,
  marker: AlloyNode | null,
): void {
  const refkey = isRefkey(key) ? key : toRefkey(key);
  insertReactive(
    parent,
    () => {
      const sf = useContext(SourceFileContext);
      if (!sf || !sf.reference) {
        throw new Error("Can only emit references inside of source files");
      }
      return sf.reference({ refkey });
    },
    marker,
  );
}

/**
 * Low-level: insert `node` (or wrap `text` as a TextNode) into `parent`,
 * either before `marker` or at the end. Updates the surrounding
 * Context's `childrenWithContent` accounting so reactive observers
 * (`ContentSlot.isEmpty`, `mapJoin`, `Block`, etc.) see content as it
 * lands.
 */
function insertNode(
  parent: AlloyNode,
  nodeOrText: AlloyNode | string,
  marker: AlloyNode | null,
): void {
  if (marker !== null) {
    marker.before(nodeOrText);
  } else {
    parent.append(nodeOrText);
  }

  if (countsAsContent(nodeOrText)) {
    contentAdded();
    notifyContentState();
  }
}

function countsAsContent(nodeOrText: AlloyNode | string): boolean {
  if (typeof nodeOrText === "string") return nodeOrText !== "";
  // Comment markers (slot:start/slot:end, ctx:start/ctx:end) are
  // bookkeeping only — they never produce visible output and must not
  // count toward emptiness tracking.
  if (nodeOrText instanceof CommentNode) return false;
  if (nodeOrText instanceof TextNode) return nodeOrText.data !== "";
  // ElementNode / FragmentNode: these are structural wrappers. They
  // count as content iff their subtree has any text descendant.
  // Pre-built JSX fragments (e.g. `<>{p}</>` evaluated outside a
  // mapJoin slot) carry their text payload as already-attached
  // descendants — we have to peek into the subtree because those
  // descendants didn't go through this insertNode path inside the
  // slot's context. An empty intrinsic like `<hbr/>` correctly
  // reports `false` so mapJoin suppresses joiners around it
  // (matches legacy main-branch semantics).
  return hasTextDescendant(nodeOrText);
}

function hasTextDescendant(node: AlloyNode): boolean {
  for (let c = node.firstChild; c !== null; c = c.nextSibling) {
    if (c instanceof TextNode) {
      if (c.data !== "") return true;
    } else if (c instanceof CommentNode) {
      // skip
    } else if (hasTextDescendant(c)) {
      return true;
    }
  }
  return false;
}

/**
 * Insert a `CustomContext` (the wrapper produced by `createCustomContext`,
 * e.g. by `mapJoin`'s per-item slots).
 *
 * The custom-context object exposes `useCustomContext(cb)` — invoking it
 * runs whatever owner-context setup the producer wants (e.g. `mapJoin`'s
 * `root(...)` + `effect(...)` for per-item disposers and isEmpty tracking)
 * and then yields the rendered Children back to `cb`. We bracket the
 * insertion site with comment markers so any later mutation by enclosing
 * reactive bindings doesn't disturb our region, and we recursively
 * `insert` the produced children before the end marker.
 */
function insertCustomContext(
  parent: AlloyNode,
  ctx: CustomContext,
  marker: AlloyNode | null,
): void {
  const start = createComment("ctx:start");
  const end = createComment("ctx:end");
  insertNode(parent, start, marker);
  insertNode(parent, end, marker);
  ctx.useCustomContext((children) => {
    insert(parent, children as Children, end);
  });
}
