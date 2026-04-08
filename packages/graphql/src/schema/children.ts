import {
  isComponentCreator,
  isKeyedChild,
  type Children,
  type Component,
} from "@alloy-js/core";
import { applyNonNullType } from "./refs.js";
import type { TypeReference } from "./types.js";

interface DirectiveListChildrenOptions {
  ownerLabel: string;
  listName: string;
  listTag: symbol;
  directiveComponent: Component<any>;
}

interface ListChildrenOptions {
  ownerLabel: string;
  listName: string;
  listTag: symbol;
}

export function isTaggedChild(
  tags: symbol[],
  child: Children,
): child is Children & Required<Pick<Component, "tag">> {
  return isKeyedChild(child) && tags.some((tag) => child.tag === tag);
}

export function filterTaggedChildren(
  children: Children[],
  tags: symbol[],
): Children[] {
  return children.filter((child) => !isTaggedChild(tags, child));
}

export function assertOnlyListChildren(
  children: Children[],
  options: ListChildrenOptions,
) {
  const extraChildren = filterTaggedChildren(children, [options.listTag]);
  if (extraChildren.length > 0) {
    throw new Error(
      `${options.ownerLabel} only supports ${options.listName} children.`,
    );
  }
}

export function assertOnlyDirectiveAndListChildren(
  children: Children[],
  options: DirectiveListChildrenOptions,
) {
  const extraChildren = children.filter((child) => {
    if (isComponentCreator(child, options.directiveComponent)) {
      return false;
    }
    if (isTaggedChild([options.listTag], child)) {
      return false;
    }
    return true;
  });
  if (extraChildren.length > 0) {
    throw new Error(
      `${options.ownerLabel} only supports Directive and ${options.listName} children.`,
    );
  }
}

export function filterListSlotChildren(
  children: Children[],
  listTag: symbol,
): Children[] {
  return filterTaggedChildren(children, [listTag]);
}

export function resolveListType<TListSlot>(
  type: TypeReference,
  itemNonNull: boolean | undefined,
  listSlot: TListSlot,
  applyListType: (type: TypeReference, listSlot: TListSlot) => TypeReference,
): TypeReference {
  return applyListType(applyNonNullType(type, itemNonNull), listSlot);
}
