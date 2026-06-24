import { Ref } from "@vue/reactivity";
import { CustomContext } from "../reactivity.js";
import { Refkey, RefkeyableObject } from "../refkey.js";
import type { AlloyNode } from "../render/node.js";

export const RENDERABLE = Symbol.for("Alloy.CustomElement");

/**
 * Marker placed on the thunks produced by `sti(...)` (the simple template
 * component creators for intrinsics such as `indent`, `group`, `hbr`).
 *
 * Unlike a {@link ComponentCreator}, these thunks eagerly materialize an
 * intrinsic `ElementNode` (resolving any refkey children) the moment they are
 * invoked. Child-collection helpers such as `children()`/`childrenArray()` must
 * therefore treat them as opaque leaves rather than invoking them during keyed
 * child analysis — otherwise refkeys get resolved against the wrong scope
 * before the owning component has established its own scope.
 *
 * @internal
 */
export const _INTRINSIC_CREATOR = Symbol.for("Alloy.IntrinsicCreator");

/**
 * Returns true if `item` is a thunk produced by `sti(...)` (see
 * {@link _INTRINSIC_CREATOR}).
 *
 * @internal
 */
export function _isIntrinsicCreator(item: unknown): boolean {
  return (
    typeof item === "function" && (item as any)[_INTRINSIC_CREATOR] === true
  );
}

/**
 * A renderable object is any object that has an `[ay.RENDERABLE]` method that
 * returns children. This is used to allow custom object types to be used as
 * children in Alloy components.
 */
export interface RenderableObject {
  /**
   * Renders this object to children.
   */
  [RENDERABLE](): Children;
}

/**
 * Returns true if the item is a renderable object, meaning it has an `[ay.RENDERABLE]`
 * method.
 *
 * @param item - The item to check.
 * @returns True if the item is a renderable object.
 */
export function isRenderableObject(item: unknown): item is RenderableObject {
  return (
    typeof item === "object" &&
    item !== null &&
    RENDERABLE in item &&
    typeof (item as any)[RENDERABLE] === "function"
  );
}

export type Child =
  | RenderableObject
  | RefkeyableObject
  | string
  | boolean
  | number
  | undefined
  | null
  | void
  | (() => Children)
  | Ref
  | Refkey
  | CustomContext
  | AlloyNode;

export type Children = Child | Children[];
export type Props = Record<string, any>;

export interface SourceLocation {
  fileName: string;
  lineNumber: number;
  columnNumber: number;
}

export interface ComponentDefinition<TProps = Props> {
  (props: TProps): Children;
}
export interface Component<TProps = Props> {
  (props: TProps): Children;
  tag?: symbol;
}

export interface ComponentCreator<TProps = Props> {
  component: Component<TProps>;
  (): Children;
  props: TProps;
  tag?: symbol;
  source?: SourceLocation;
}

export function isComponentCreator<TProps = any>(
  item: unknown,
  component?: Component<TProps>,
): item is ComponentCreator<TProps> {
  if (!component) {
    return typeof item === "function" && (item as any).component;
  }
  return typeof item === "function" && (item as any).component === component;
}

export function createComponent<TProps extends Props = Props>(
  C: Component<TProps>,
  props: TProps,
  source?: SourceLocation,
): ComponentCreator<TProps> {
  const creator: ComponentCreator<TProps> = () => /* */ C(props);
  creator.props = props;
  creator.component = C;
  if (C.tag) {
    creator.tag = C.tag;
  }
  if (source) {
    creator.source = source;
  }

  return creator;
}

export function taggedComponent<TProps = Props>(
  tag: symbol,
  component: Component<TProps>,
): Component<TProps> & Required<Pick<Component<TProps>, "tag">> {
  component.tag = tag;
  return component as any;
}
