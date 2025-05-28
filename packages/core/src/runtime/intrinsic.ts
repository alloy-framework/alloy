import type { Children } from "./component.js";
export interface IntrinsicElements {
  /**
   * Attempt to render the children on a single line if possible. If a group
   * contains `<breakParent />` or a hard line, or if the group exceeds the
   * print width, all linebreaks in the group will be broken.
   */
  group: { shouldBreak?: boolean; id?: symbol; children: Children };

  /**
   * A regular line break. This will break if the line exceeds the print
   * width, otherwise it will be a space.
   */
  line: {};

  /**
   * A regular line break. This will break if the line exceeds the print
   * width, otherwise it will be a space.
   */
  br: {};

  /**
   * A hard line break. This is a line that will always break, even if the
   * group does not exceed print width.
   */
  hardline: {};

  /**
   * A hard line break. This is a line that will always break, even if the
   * group does not exceed print width.
   */
  hbr: {};

  /**
   * A soft line break. This will break if the line exceeds the print width,
   * otherwise it will be be nothing.
   */
  softline: {};

  /**
   * A soft line break. This will break if the line exceeds the print width,
   * otherwise it will be be nothing.
   */
  sbr: {};

  /**
   * A literal line break. This will always break, even if the group does not
   * exceed print width. The new line will ignore indentation.
   */
  literalline: {};

  /**
   * A literal line break. This will always break, even if the group does not
   * exceed print width. The new line will ignore indentation.
   */
  lbr: {};

  /**
   * Increase the indentation level of the children of this component.
   * Indentation is determined by the print options provided to the Output
   * component or source file.
   */
  indent: { children: Children };

  /**
   * Indent the children of this component if the group specified by `groupId`
   * is broken (or not broken if `negate` is passed). The specified group must
   * already be printed.
   */
  indentIfBreak: { children: Children; groupId: symbol; negate?: boolean };

  /**
   * Similar to `group`, but will only place a line break before the last
   * segment to exceed the print width. This is useful for formatting
   * paragraphs of text where breaks are inserted prior to words which would
   * otherwise exceed the print width.
   */
  fill: { children: Children };

  /**
   * Force the parent group to break.
   */
  breakParent: {};

  /**
   * Print children if the current group or already printed group specified by
   * `groupId` is broken. Otherwise, `flatContents` is printed instead.
   */
  ifBreak: { children: Children; flatContents?: Children; groupId?: symbol };

  /**
   * Print this content at the end of the line. Useful for things like line
   * comments.
   */
  lineSuffix: { children: Children };

  /**
   * Force any line suffixes to print at this point.
   */
  lineSuffixBoundary: {};

  /**
   * Decrease the indentation level of the children of this component.
   * Indentation is determined by the print options provided to the Output
   * component or source file.
   */
  dedent: { children: Children };

  /**
   * Indent the children of this component by either the number of characters
   * indicated by the `width` prop, or by the provided string indicated by the
   * `string` prop.
   */
  align:
    | { children: Children; width: number }
    | { children: Children; string: string };

  /**
   * Mark the current indentation level as "root" for the purposes of literal
   * line breaks and `dedentToRoot`.
   */
  markAsRoot: { children: Children };

  /**
   * Decrease the indentation level to the root level specified by
   * `<markAsRoot />`, or else to no indentation.
   */
  dedentToRoot: { children: Children };
}
export interface IntrinsicElementBase<
  TKey extends keyof IntrinsicElements = keyof IntrinsicElements,
> {
  [intrinsicElementKey]: true;
  name: TKey;
  props: IntrinsicElements[TKey];
}

export function createIntrinsic<TKey extends keyof IntrinsicElements>(
  name: TKey,
  props: IntrinsicElements[TKey],
): IntrinsicElementBase<TKey> {
  return {
    [intrinsicElementKey]: true,
    name,
    props,
  };
}

export function isIntrinsicElement(type: unknown): type is IntrinsicElement {
  return (
    typeof type === "object" && type !== null && intrinsicElementKey in type
  );
}

export const intrinsicElementKey = Symbol();
export type IndentIntrinsicElement = IntrinsicElementBase<"indent">;
export type IndentIfBreakIntrinsicElement =
  IntrinsicElementBase<"indentIfBreak">;
export type BrIntrinsicElement = IntrinsicElementBase<"br">;
export type LineIntrinsicElement = IntrinsicElementBase<"line">;
export type HbrIntrinsicElement = IntrinsicElementBase<"hbr">;
export type HardlineIntrinsicElement = IntrinsicElementBase<"hardline">;
export type SbrIntrinsicElement = IntrinsicElementBase<"sbr">;
export type SoftlineIntrinsicElement = IntrinsicElementBase<"softline">;
export type GroupIntrinsicElement = IntrinsicElementBase<"group">;
export type AlignIntrinsicElement = IntrinsicElementBase<"align">;
export type FillIntrinsicElement = IntrinsicElementBase<"fill">;
export type BreakParentIntrinsicElement = IntrinsicElementBase<"breakParent">;
export type LineSuffixIntrinsicElement = IntrinsicElementBase<"lineSuffix">;
export type LineSuffixBoundaryIntrinsicElement =
  IntrinsicElementBase<"lineSuffixBoundary">;
export type DedentIntrinsicElement = IntrinsicElementBase<"dedent">;
export type DedentToRootIntrinsicElement = IntrinsicElementBase<"dedentToRoot">;
export type MarkAsRootIntrinsicElement = IntrinsicElementBase<"markAsRoot">;
export type LiterallineIntrinsicElement = IntrinsicElementBase<"literalline">;
export type LbrIntrinsicElement = IntrinsicElementBase<"lbr">;
export type IfBreakIntrinsicElement = IntrinsicElementBase<"ifBreak">;

export type IntrinsicElement =
  | IndentIntrinsicElement
  | IndentIfBreakIntrinsicElement
  | BrIntrinsicElement
  | LineIntrinsicElement
  | HbrIntrinsicElement
  | HardlineIntrinsicElement
  | SbrIntrinsicElement
  | SoftlineIntrinsicElement
  | GroupIntrinsicElement
  | AlignIntrinsicElement
  | FillIntrinsicElement
  | BreakParentIntrinsicElement
  | LineSuffixIntrinsicElement
  | LineSuffixBoundaryIntrinsicElement
  | DedentIntrinsicElement
  | LiterallineIntrinsicElement
  | LbrIntrinsicElement
  | DedentToRootIntrinsicElement
  | MarkAsRootIntrinsicElement
  | IfBreakIntrinsicElement;
