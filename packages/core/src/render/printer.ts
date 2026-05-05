/**
 * Direct AlloyNode tree printer.
 *
 * The printer walks the DOM-like AlloyNode tree directly, dispatching on
 * element `localName` and node type. Work items on the command stack carry
 * AlloyNode references or small synthetic frames for constructs that have no
 * node counterpart, such as fill continuation state, `ifBreak` alternate
 * branches, and split text segments.
 *
 * Correctness invariants:
 *
 *   - `fits` is continuation-aware (passes `restCommands`).
 *   - `breakParent` propagation runs as a prepass over the AlloyNode
 *     tree, including into `lineSuffix` content and both branches of
 *     `ifBreak` (matching Prettier's `traverseDoc`). Hardline / hbr /
 *     literalline / lbr / breakParent / TextNode-with-newline all
 *     trigger the propagation.
 *   - `lineSuffix` collects deferred `{ind, mode, frame}` commands.
 *   - `groupModeMap` carries forward-ref semantics: in `fits`,
 *     unknown groupId behaves as flat; during printing, unknown
 *     groupId yields no branch on `if-break` / `indent-if-break`.
 *   - `fill` uses `mustBeFlat=true` and a separate
 *     `firstAndSecondContentFits` measurement; comments are skipped
 *     when collecting the parts list.
 *   - `trim` rolls back trailing spaces / tabs from the `out` buffer.
 *   - String width is Prettier's CJK / east-asian / emoji-aware
 *     `getStringWidth` (vendored in `get-string-width.ts`).
 */

import {
  AlloyNode,
  COMMENT_NODE,
  ElementNode,
  FRAGMENT_NODE,
  TEXT_NODE,
  TextNode,
} from "./node.js";
import {
  CURSOR_PLACEHOLDER,
  getStringWidth,
  Indent,
  joinOut,
  makeAlign,
  makeIndent,
  Mode,
  MODE_BREAK,
  MODE_FLAT,
  PrintNodeOptions,
  rootIndent,
  textHasNewline,
  textWidth,
  trimOut,
} from "./printer-support.js";

// #region Frame types

const SYNTH = Symbol("alloy:synthetic-frame");

type SynthFrame = {
  [k in typeof SYNTH]: true;
} &
  // Fill remaining state: re-print `node` but starting at `offset`.
  (| { kind: "fill"; node: ElementNode; offset: number }
    // Synthesize an inline list of nodes (used for fill's
    // [content, whitespace, secondContent] measurement and for
    // text-node newline expansion). Items are popped right-to-left.
    | { kind: "list"; items: Frame[] }
    // Synthesize a `line` with the given attributes (used for
    // `line-suffix-boundary` flushing a hardline-without-break).
    | { kind: "line"; hard?: boolean; soft?: boolean; literal?: boolean }
    // Synthesize an `indent` wrapping the given AlloyNode contents
    // (used by `indent-if-break` negate path).
    | { kind: "indent"; node: ElementNode }
  );

type Frame = AlloyNode | string | SynthFrame;

interface Cmd {
  ind: Indent;
  mode: Mode;
  frame: Frame;
}

// #endregion

// #region Group broken predicate

/**
 * O(1) replacement for Prettier's `propagateBreaks` prepass — the
 * `_breakCount` field on `ElementNode` is maintained eagerly during
 * insertion (see `propagateBreakDelta` in `node.ts`), so deciding
 * whether a `group` is broken is just a field read plus the
 * `shouldBreak` data flag.
 */
function isGroupBroken(el: ElementNode): boolean {
  if (el._breakCount > 0) return true;
  const data = el.data as { shouldBreak?: boolean } | undefined;
  return data?.shouldBreak === true;
}

// #endregion

// #region fits

function fits(
  next: Cmd,
  restCommands: Cmd[],
  width: number,
  hasLineSuffix: boolean,
  groupModeMap: Record<symbol, Mode>,
  mustBeFlat: boolean,
): boolean {
  if (width === Number.POSITIVE_INFINITY) return true;
  let restIdx = restCommands.length;
  const cmds: Cmd[] = [next];
  const out: (string | symbol)[] = [];
  const dummyInd = next.ind;
  while (width >= 0) {
    if (cmds.length === 0) {
      if (restIdx === 0) return true;
      cmds.push(restCommands[--restIdx]);
      continue;
    }
    const cmd = cmds.pop()!;
    const mode = cmd.mode;
    const frame = cmd.frame;

    if (typeof frame === "string") {
      out.push(frame);
      width -= getStringWidth(frame);
      continue;
    }

    if (isSynth(frame)) {
      switch (frame.kind) {
        case "fill": {
          const parts = collectChildren(frame.node);
          for (let i = parts.length - 1; i >= frame.offset; i--) {
            cmds.push({ ind: cmd.ind, mode, frame: parts[i] });
          }
          break;
        }
        case "list": {
          for (let i = frame.items.length - 1; i >= 0; i--) {
            cmds.push({ ind: cmd.ind, mode, frame: frame.items[i] });
          }
          break;
        }
        case "line": {
          if (mode === MODE_BREAK || frame.hard) return true;
          if (!frame.soft) {
            out.push(" ");
            width--;
          }
          break;
        }
        case "indent": {
          // Synthesized indent wrapper — same effect on width as
          // descending into the wrapped node's children.
          for (
            let c = frame.node.lastChild;
            c !== null;
            c = c.previousSibling
          ) {
            if (c.nodeType === COMMENT_NODE) continue;
            cmds.push({ ind: cmd.ind, mode, frame: c });
          }
          break;
        }
      }
      continue;
    }

    // AlloyNode
    const node = frame as AlloyNode;
    const nt = node.nodeType;
    if (nt === TEXT_NODE) {
      const tn = node as TextNode;
      const text = tn.data;
      if (text === "") continue;
      if (!textHasNewline(tn)) {
        out.push(text);
        width -= textWidth(tn);
        continue;
      }
      // Multi-line text: on the first newline encountered (in MODE_FLAT
      // we treat it as forcing break — fits returns true if mode is
      // BREAK, since reaching a hard line means content fits in the
      // remaining buffer).
      // Push reversed segments.
      const items = expandMultilineText(text);
      for (let i = items.length - 1; i >= 0; i--) {
        cmds.push({ ind: cmd.ind, mode, frame: items[i] });
      }
      continue;
    }
    if (nt === COMMENT_NODE) continue;
    if (nt === FRAGMENT_NODE) {
      for (let c = node.lastChild; c !== null; c = c.previousSibling) {
        if (c.nodeType === COMMENT_NODE) continue;
        cmds.push({ ind: cmd.ind, mode, frame: c });
      }
      continue;
    }
    // ELEMENT_NODE
    const el = node as ElementNode;
    const ln = el.localName;
    switch (ln) {
      case "line":
      case "br":
        if (mode === MODE_BREAK) return true;
        out.push(" ");
        width--;
        break;
      case "softline":
      case "sbr":
        if (mode === MODE_BREAK) return true;
        break;
      case "hardline":
      case "hbr":
      case "literalline":
      case "lbr":
        return true;
      case "breakParent":
        break;
      case "trim":
        width += trimOut(out);
        break;
      case "lineSuffix":
        hasLineSuffix = true;
        break;
      case "lineSuffixBoundary":
        if (hasLineSuffix) return false;
        break;
      case "cursor":
        // Width-neutral marker.
        break;
      case "group": {
        const broken = isGroupBroken(el);
        if (mustBeFlat && broken) return false;
        const groupMode: Mode = broken ? MODE_BREAK : mode;
        // alloy doesn't use expandedStates — descend into children.
        for (let c = el.lastChild; c !== null; c = c.previousSibling) {
          if (c.nodeType === COMMENT_NODE) continue;
          cmds.push({ ind: cmd.ind, mode: groupMode, frame: c });
        }
        break;
      }
      case "ifBreak": {
        const data = el.data as
          | { flatNode?: ElementNode; flatText?: string; groupId?: symbol }
          | undefined;
        const groupMode: Mode =
          data?.groupId ? groupModeMap[data.groupId] || MODE_FLAT : mode;
        if (groupMode === MODE_BREAK) {
          for (let c = el.lastChild; c !== null; c = c.previousSibling) {
            if (c.nodeType === COMMENT_NODE) continue;
            cmds.push({ ind: cmd.ind, mode, frame: c });
          }
        } else {
          if (data?.flatNode !== undefined) {
            cmds.push({ ind: cmd.ind, mode, frame: data.flatNode });
          } else if (data?.flatText !== undefined && data.flatText !== "") {
            cmds.push({ ind: cmd.ind, mode, frame: data.flatText });
          }
        }
        break;
      }
      case "indentIfBreak": {
        const data = el.data as
          | { groupId?: symbol; negate?: boolean }
          | undefined;
        const groupMode: Mode =
          data?.groupId ? groupModeMap[data.groupId] || MODE_FLAT : mode;
        // For width measurement, indent vs no-indent doesn't matter (no
        // newlines emitted in the candidate group while measuring flat,
        // and on hardline we return true). Just descend.
        for (let c = el.lastChild; c !== null; c = c.previousSibling) {
          if (c.nodeType === COMMENT_NODE) continue;
          cmds.push({ ind: cmd.ind, mode, frame: c });
        }
        // Suppress unused warning in case the linter complains.
        void groupMode;
        break;
      }
      case "fill":
      case "indent":
      case "align":
      case "dedent":
      case "dedentToRoot":
      case "markAsRoot":
      case "label":
      default:
        // Transparent for fits: descend into children.
        for (let c = el.lastChild; c !== null; c = c.previousSibling) {
          if (c.nodeType === COMMENT_NODE) continue;
          cmds.push({ ind: cmd.ind, mode, frame: c });
        }
        break;
    }
  }
  void dummyInd;
  return false;
}

// #endregion

// #region Helpers

function isSynth(f: Frame): f is SynthFrame {
  return typeof f === "object" && f !== null && (f as any)[SYNTH] === true;
}

/**
 * Collect the non-comment children of an element into an array
 * (in order). Used for `fill` part indexing — `fill` requires random
 * access on the parts list (offset, length), which a linked list
 * doesn't provide cheaply. Cached per ElementNode to amortize across
 * the multiple fits-measurements `fill` performs.
 */
const fillPartsCache = new WeakMap<ElementNode, AlloyNode[]>();

function collectChildren(el: ElementNode): AlloyNode[] {
  const cached = fillPartsCache.get(el);
  if (cached !== undefined) return cached;
  const out: AlloyNode[] = [];
  for (let c = el.firstChild; c !== null; c = c.nextSibling) {
    if (c.nodeType === COMMENT_NODE) continue;
    out.push(c);
  }
  fillPartsCache.set(el, out);
  return out;
}

/**
 * Expand a TextNode's `data` containing newlines into a flat list of
 * frames matching `convertText` in `to-doc.ts` — segment strings
 * separated by synthetic hardlines. Empty segments are dropped, just
 * like Prettier's `[hardline, "x", hardline, "y"]` (no empty strings).
 */
function expandMultilineText(text: string): Frame[] {
  const parts = text.split(/\r?\n/);
  const out: Frame[] = [];
  const synthHardline: SynthFrame = { [SYNTH]: true, kind: "line", hard: true };
  for (let i = 0; i < parts.length; i++) {
    if (i > 0) out.push(synthHardline);
    if (parts[i] !== "") out.push(parts[i]);
  }
  return out;
}

// #endregion

// #region Main entry point

export interface PrintNodeResult {
  formatted: string;
}

export function printNodeToString(
  root: AlloyNode,
  options: PrintNodeOptions,
): PrintNodeResult {
  // Group "broken" status is maintained eagerly during render via
  // `propagateBreakDelta` in node.ts (which keeps `el._breakCount`
  // accurate). The `isGroupBroken` helper below reads it in O(1) so we
  // no longer need the per-print `propagateBreaks` walk over the tree.

  const groupModeMap: Record<symbol, Mode> = {};
  const width = options.printWidth;
  const newLine = "\n";
  let pos = 0;
  const cmds: Cmd[] = [{ ind: rootIndent(), mode: MODE_BREAK, frame: root }];
  const out: (string | symbol)[] = [];
  let shouldRemeasure = false;
  const lineSuffix: Cmd[] = [];

  while (cmds.length > 0) {
    const cmd = cmds.pop()!;
    const ind = cmd.ind;
    const mode = cmd.mode;
    const frame = cmd.frame;

    // ---- string ----
    if (typeof frame === "string") {
      out.push(frame);
      if (cmds.length > 0) pos += getStringWidth(frame);
      continue;
    }

    // ---- synthetic ----
    if (isSynth(frame)) {
      switch (frame.kind) {
        case "fill":
          handleFill(frame.node, frame.offset, ind, mode);
          break;
        case "list": {
          for (let i = frame.items.length - 1; i >= 0; i--) {
            cmds.push({ ind, mode, frame: frame.items[i] });
          }
          break;
        }
        case "line":
          handleLine(!!frame.hard, !!frame.soft, !!frame.literal, ind, mode);
          break;
        case "indent":
          cmds.push({
            ind: makeIndent(ind, options),
            mode,
            frame: {
              [SYNTH]: true,
              kind: "list",
              items: collectChildren(frame.node),
            },
          });
          break;
      }
      // After-pop line-suffix flush check.
      if (cmds.length === 0 && lineSuffix.length > 0) {
        cmds.push(...lineSuffix.reverse());
        lineSuffix.length = 0;
      }
      continue;
    }

    // ---- AlloyNode ----
    const node = frame as AlloyNode;
    const nt = node.nodeType;

    if (nt === TEXT_NODE) {
      const tn = node as TextNode;
      const text = tn.data;
      if (text === "") {
        // empty text: nothing
      } else if (!textHasNewline(tn)) {
        out.push(text);
        if (cmds.length > 0) pos += textWidth(tn);
      } else {
        // multiline: expand into segments + synthetic hardlines.
        const items = expandMultilineText(text);
        for (let i = items.length - 1; i >= 0; i--) {
          cmds.push({ ind, mode, frame: items[i] });
        }
      }
    } else if (nt === COMMENT_NODE) {
      // skip
    } else if (nt === FRAGMENT_NODE) {
      for (let c = node.lastChild; c !== null; c = c.previousSibling) {
        if (c.nodeType === COMMENT_NODE) continue;
        cmds.push({ ind, mode, frame: c });
      }
    } else {
      // ELEMENT_NODE
      const el = node as ElementNode;
      handleElement(el, ind, mode);
    }

    if (cmds.length === 0 && lineSuffix.length > 0) {
      cmds.push(...lineSuffix.reverse());
      lineSuffix.length = 0;
    }
  }

  return { formatted: joinOut(out) };

  // #region Closures

  function pushChildrenReversed(
    el: ElementNode,
    ind: Indent,
    mode: Mode,
  ): void {
    for (let c = el.lastChild; c !== null; c = c.previousSibling) {
      if (c.nodeType === COMMENT_NODE) continue;
      cmds.push({ ind, mode, frame: c });
    }
  }

  function handleElement(el: ElementNode, ind: Indent, mode: Mode): void {
    const ln = el.localName;
    switch (ln) {
      case "line":
      case "br":
        handleLine(false, false, false, ind, mode);
        return;
      case "softline":
      case "sbr":
        handleLine(false, true, false, ind, mode);
        return;
      case "hardline":
      case "hbr":
        handleLine(true, false, false, ind, mode);
        return;
      case "literalline":
      case "lbr":
        handleLine(true, false, true, ind, mode);
        return;
      case "breakParent":
        return;
      case "trim":
        pos -= trimOut(out);
        return;
      case "cursor":
        out.push(CURSOR_PLACEHOLDER);
        return;
      case "indent":
        pushChildrenReversed(el, makeIndent(ind, options), mode);
        return;
      case "dedent":
        pushChildrenReversed(el, makeAlign(ind, -1, options), mode);
        return;
      case "dedentToRoot":
        pushChildrenReversed(
          el,
          makeAlign(ind, Number.NEGATIVE_INFINITY, options),
          mode,
        );
        return;
      case "markAsRoot":
        pushChildrenReversed(
          el,
          makeAlign(ind, { type: "root" }, options),
          mode,
        );
        return;
      case "align": {
        const data = el.data as
          | {
              count?: number | string;
              width?: number | string;
              string?: string;
            }
          | undefined;
        const widthOrString = data?.count ?? data?.width ?? data?.string ?? 0;
        pushChildrenReversed(el, makeAlign(ind, widthOrString, options), mode);
        return;
      }
      case "label":
        pushChildrenReversed(el, ind, mode);
        return;
      case "lineSuffix": {
        // Defer contents as a single list frame; capture current ind and mode.
        lineSuffix.push({
          ind,
          mode,
          frame: {
            [SYNTH]: true,
            kind: "list",
            items: collectChildren(el),
          },
        });
        return;
      }
      case "lineSuffixBoundary":
        if (lineSuffix.length > 0) {
          // Synthesize hardlineWithoutBreakParent.
          cmds.push({
            ind,
            mode,
            frame: { [SYNTH]: true, kind: "line", hard: true },
          });
        }
        return;
      case "group":
        handleGroup(el, ind, mode);
        return;
      case "ifBreak":
        handleIfBreak(el, ind, mode);
        return;
      case "indentIfBreak":
        handleIndentIfBreak(el, ind, mode);
        return;
      case "fill":
        handleFillElement(el, ind, mode);
        return;
      default:
        // Unknown: transparent container.
        pushChildrenReversed(el, ind, mode);
        return;
    }
  }

  function handleGroup(el: ElementNode, ind: Indent, mode: Mode): void {
    const data = el.data as { shouldBreak?: boolean; id?: symbol } | undefined;
    const broken = isGroupBroken(el);
    const groupId = data?.id;

    switch (mode) {
      case MODE_FLAT: {
        if (!shouldRemeasure) {
          // Stay flat (or step into break if shouldBreak).
          const m: Mode = broken ? MODE_BREAK : MODE_FLAT;
          pushChildrenReversedAtMode(el, ind, m);
          break;
        }
      }
      // fallthrough
      // eslint-disable-next-line no-fallthrough
      case MODE_BREAK: {
        shouldRemeasure = false;
        // Build a "candidate" cmd that pushes the group's children flat.
        // We measure via fits using a synthetic single frame: the
        // element itself with mode=FLAT. But fits descends into children
        // since group dispatches to them. To match prettier semantics
        // exactly (fits treats group as: if mustBeFlat&&broken→false,
        // else descend into contents at groupMode), passing the group
        // itself works.
        const next: Cmd = { ind, mode: MODE_FLAT, frame: el };
        const rem = width - pos;
        const hasLS = lineSuffix.length > 0;
        if (!broken && fits(next, cmds, rem, hasLS, groupModeMap, false)) {
          // Push children flat.
          pushChildrenReversedAtMode(el, ind, MODE_FLAT);
        } else {
          // Push children broken.
          pushChildrenReversedAtMode(el, ind, MODE_BREAK);
        }
        break;
      }
    }
    if (groupId) {
      groupModeMap[groupId] =
        cmds.length > 0 ? cmds[cmds.length - 1].mode : mode;
    }
  }

  function pushChildrenReversedAtMode(
    el: ElementNode,
    ind: Indent,
    mode: Mode,
  ): void {
    for (let c = el.lastChild; c !== null; c = c.previousSibling) {
      if (c.nodeType === COMMENT_NODE) continue;
      cmds.push({ ind, mode, frame: c });
    }
  }

  function handleIfBreak(el: ElementNode, ind: Indent, mode: Mode): void {
    const data = el.data as
      | { flatNode?: ElementNode; flatText?: string; groupId?: symbol }
      | undefined;
    const groupMode: Mode | undefined =
      data?.groupId ? groupModeMap[data.groupId] : mode;
    if (groupMode === MODE_BREAK) {
      // Push children (the breakContents).
      pushChildrenReversed(el, ind, mode);
    } else if (groupMode === MODE_FLAT) {
      if (data?.flatNode !== undefined) {
        cmds.push({ ind, mode, frame: data.flatNode });
      } else if (data?.flatText !== undefined && data.flatText !== "") {
        cmds.push({ ind, mode, frame: data.flatText });
      }
    }
    // groupMode === undefined: emit nothing (matches prettier).
  }

  function handleIndentIfBreak(el: ElementNode, ind: Indent, mode: Mode): void {
    const data = el.data as { groupId?: symbol; negate?: boolean } | undefined;
    const groupMode: Mode | undefined =
      data?.groupId ? groupModeMap[data.groupId] : mode;
    const negate = !!data?.negate;
    if (groupMode === MODE_BREAK) {
      if (negate) {
        // breakContents = original children (no indent).
        pushChildrenReversed(el, ind, mode);
      } else {
        // breakContents = indent(children).
        pushChildrenReversed(el, makeIndent(ind, options), mode);
      }
    } else if (groupMode === MODE_FLAT) {
      if (negate) {
        // flatContents = indent(children).
        pushChildrenReversed(el, makeIndent(ind, options), mode);
      } else {
        // flatContents = original children.
        pushChildrenReversed(el, ind, mode);
      }
    }
  }

  function handleFillElement(el: ElementNode, ind: Indent, mode: Mode): void {
    handleFill(el, 0, ind, mode);
  }

  function handleFill(
    el: ElementNode,
    offset: number,
    indArg?: Indent,
    modeArg?: Mode,
  ): void {
    const ind = indArg ?? rootIndent();
    const mode = modeArg ?? MODE_BREAK;
    const parts = collectChildren(el);
    const rem = width - pos;
    const length = parts.length - offset;
    if (length === 0) return;
    const content = parts[offset + 0];
    const whitespace = parts[offset + 1];
    const contentFlatCmd: Cmd = { ind, mode: MODE_FLAT, frame: content };
    const contentBreakCmd: Cmd = { ind, mode: MODE_BREAK, frame: content };
    const contentFits = fits(
      contentFlatCmd,
      [],
      rem,
      lineSuffix.length > 0,
      groupModeMap,
      true,
    );
    if (length === 1) {
      if (contentFits) cmds.push(contentFlatCmd);
      else cmds.push(contentBreakCmd);
      return;
    }
    const whitespaceFlatCmd: Cmd = {
      ind,
      mode: MODE_FLAT,
      frame: whitespace,
    };
    const whitespaceBreakCmd: Cmd = {
      ind,
      mode: MODE_BREAK,
      frame: whitespace,
    };
    if (length === 2) {
      if (contentFits) cmds.push(whitespaceFlatCmd, contentFlatCmd);
      else cmds.push(whitespaceBreakCmd, contentBreakCmd);
      return;
    }
    const secondContent = parts[offset + 2];
    const remainingCmd: Cmd = {
      ind,
      mode,
      frame: { [SYNTH]: true, kind: "fill", node: el, offset: offset + 2 },
    };
    const firstAndSecondListFrame: SynthFrame = {
      [SYNTH]: true,
      kind: "list",
      items: [content, whitespace, secondContent],
    };
    const firstAndSecondContentFits = fits(
      { ind, mode: MODE_FLAT, frame: firstAndSecondListFrame },
      [],
      rem,
      lineSuffix.length > 0,
      groupModeMap,
      true,
    );
    if (firstAndSecondContentFits) {
      cmds.push(remainingCmd, whitespaceFlatCmd, contentFlatCmd);
    } else if (contentFits) {
      cmds.push(remainingCmd, whitespaceBreakCmd, contentFlatCmd);
    } else {
      cmds.push(remainingCmd, whitespaceBreakCmd, contentBreakCmd);
    }
  }

  function handleLine(
    hard: boolean,
    soft: boolean,
    literal: boolean,
    ind: Indent,
    mode: Mode,
  ): void {
    switch (mode) {
      case MODE_FLAT:
        if (!hard) {
          if (!soft) {
            out.push(" ");
            pos += 1;
          }
          break;
        } else {
          shouldRemeasure = true;
        }
      // fallthrough
      // eslint-disable-next-line no-fallthrough
      case MODE_BREAK:
        if (lineSuffix.length > 0) {
          // Re-push the line as a synthetic frame and then the suffix.
          cmds.push({
            ind,
            mode,
            frame: {
              [SYNTH]: true,
              kind: "line",
              hard,
              soft,
              literal,
            },
          });
          for (let i = lineSuffix.length - 1; i >= 0; i--) {
            cmds.push(lineSuffix[i]);
          }
          lineSuffix.length = 0;
          break;
        }
        if (literal) {
          if (ind.root) {
            out.push(newLine, ind.root.value);
            pos = ind.root.length;
          } else {
            out.push(newLine);
            pos = 0;
          }
        } else {
          pos -= trimOut(out);
          out.push(newLine + ind.value);
          pos = ind.length;
        }
        break;
    }
  }

  // #endregion
}

// #endregion
