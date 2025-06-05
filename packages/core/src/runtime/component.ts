import { Ref } from "@vue/reactivity";
import { CustomContext } from "../reactivity.js";
import { Refkey } from "../refkey.js";
import { IntrinsicElement } from "./intrinsic.js";

export type Child =
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
