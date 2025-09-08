import { Ref } from "@vue/reactivity";
import { CustomContext } from "../reactivity.js";
import { Json, Refkey } from "../refkey.js";
import { IntrinsicElement } from "./intrinsic.js";

export const RENDERABLE = Symbol.for("Alloy.CustomElement");

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
  | string
  | boolean
  | number
  | undefined
  | null
  | void
  | (() => Children)
  | Ref
  | Refkey
  | Json
  | CustomContext
  | IntrinsicElement;

export type Children = Child | Children[];
export type Props = Record<string, any>;

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
): ComponentCreator<TProps> {
  const creator: ComponentCreator<TProps> = () => /* */ C(props);
  creator.props = props;
  creator.component = C;
  if (C.tag) {
    creator.tag = C.tag;
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
