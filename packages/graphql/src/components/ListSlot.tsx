import {
  childrenArray,
  type Children,
  type Component,
  type ComponentCreator,
} from "@alloy-js/core";
import type { TypeReference } from "../schema.js";
import {
  assertOnlyListChildren as assertOnlyListChildrenForTag,
  filterTaggedChildren,
} from "../schema/children.js";
import { wrapListType, wrapNonNullType } from "../schema/refs.js";
import { createTaggedSlot } from "./TaggedSlot.js";

interface BaseListSlotProps {
  nonNull?: boolean;
  children?: Children;
}

interface ListSlotOptions {
  listName: string;
  ownerLabel: string;
}

interface ListSlotFactory<TProps extends BaseListSlotProps> {
  tag: symbol;
  List: Component<TProps> & Required<Pick<Component<TProps>, "tag">>;
  findListSlot: (
    children: Children[],
    ownerLabelOverride?: string,
  ) => ComponentCreator<TProps> | null;
  assertOnlyListChildren: (children: Children[], ownerLabel: string) => void;
  applyListType: (
    type: TypeReference,
    listSlot: ComponentCreator<TProps> | null,
  ) => TypeReference;
}

export function createListSlot<TProps extends BaseListSlotProps>(
  options: ListSlotOptions,
): ListSlotFactory<TProps> {
  const taggedList = createTaggedSlot<TProps>({
    slotName: options.listName,
    ownerLabel: options.ownerLabel,
  });
  const tag = taggedList.tag;
  const List = taggedList.Slot;

  function findListSlot(children: Children[], ownerLabelOverride?: string) {
    return taggedList.findSlot(children, ownerLabelOverride);
  }

  function assertOnlyListChildren(children: Children[], ownerLabel: string) {
    assertOnlyListChildrenForTag(children, {
      ownerLabel,
      listName: options.listName,
      listTag: tag,
    });
  }

  function applyListType(
    type: TypeReference,
    listSlot: ComponentCreator<TProps> | null,
  ): TypeReference {
    if (!listSlot) {
      return type;
    }

    const listChildren = childrenArray(() => listSlot.props.children);
    const nestedListSlot = findListSlot(listChildren, options.listName);
    if (filterTaggedChildren(listChildren, [tag]).length > 0) {
      throw new Error(
        `${options.listName} only supports ${options.listName} as a child.`,
      );
    }

    const innerType =
      nestedListSlot ? applyListType(type, nestedListSlot) : type;
    const listType = wrapListType(innerType);
    return listSlot.props.nonNull ? wrapNonNullType(listType) : listType;
  }

  return {
    tag,
    List,
    findListSlot,
    assertOnlyListChildren,
    applyListType,
  };
}
