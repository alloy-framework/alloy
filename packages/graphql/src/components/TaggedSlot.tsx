import {
  findKeyedChildren,
  taggedComponent,
  type Children,
  type Component,
  type ComponentCreator,
} from "@alloy-js/core";

interface TaggedSlotOptions {
  slotName: string;
  ownerLabel: string;
}

interface TaggedSlot<TProps> {
  tag: symbol;
  Slot: Component<TProps> & Required<Pick<Component<TProps>, "tag">>;
  findSlot: (
    children: Children[],
    ownerLabelOverride?: string,
  ) => ComponentCreator<TProps> | null;
  findSlots: (children: Children[]) => ComponentCreator<TProps>[];
}

export function createTaggedSlot<TProps>(
  options: TaggedSlotOptions,
): TaggedSlot<TProps> {
  const tag = Symbol(options.slotName);
  const Slot = taggedComponent(tag, (_props: TProps) => undefined);

  function findSlots(children: Children[]): ComponentCreator<TProps>[] {
    return findKeyedChildren(children, tag) as ComponentCreator<TProps>[];
  }

  function findSlot(
    children: Children[],
    ownerLabelOverride?: string,
  ): ComponentCreator<TProps> | null {
    const slots = findSlots(children);
    if (slots.length > 1) {
      const ownerLabel = ownerLabelOverride ?? options.ownerLabel;
      throw new Error(
        `${ownerLabel} only supports a single ${options.slotName} child.`,
      );
    }
    return slots[0];
  }

  return {
    tag,
    Slot,
    findSlot,
    findSlots,
  };
}
