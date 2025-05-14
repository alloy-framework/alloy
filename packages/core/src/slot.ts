import { ref, Ref } from "@vue/reactivity";
import {
  Children,
  Component,
  ComponentDefinition,
  effect,
  memo,
} from "./jsx-runtime.js";
import { OutputSymbol } from "./symbols/output-symbol.js";

export interface SlotInstance extends ComponentDefinition {}

export interface SlotDefinition<TSlotProps> {
  find: (...args: any[]) => () => Ref<unknown>;
  create(
    key: unknown,
    props: TSlotProps,
    defaultContent?: Children,
  ): ComponentDefinition;
}

export type SlotKey = Ref<unknown>;

const slotMappers = new Map<unknown, ComponentDefinition<any>>();

export function defineSlot<
  TSlotProps,
  TFinder extends (...args: any[]) => Ref<unknown> | unknown = (
    ...args: any[]
  ) => Ref<unknown> | unknown,
>(finder: TFinder): SlotDefinition<TSlotProps> {
  return {
    find: ((...args: any[]) =>
      () =>
        ref(finder(...args))) as any,
    create(key, props, defaultContent) {
      return function () {
        return memo(() => {
          if (key === undefined) {
            return defaultContent;
          }

          const component = slotMappers.get(key);
          if (!component) {
            return defaultContent;
          }

          return component({ ...props, original: defaultContent });
        });
      };
    },
  };
}

export const extensionEffects: (() => void)[] = [];

export function replace<T>(
  slotKeyFn: () => SlotKey,
  replacement: Component<T>,
) {
  extensionEffects.push(() => {
    effect((prev: SlotKey | undefined) => {
      if (prev) {
        slotMappers.delete(prev.value);
      }

      const slotKey = slotKeyFn();
      if (slotKey.value === undefined) {
        return slotKey;
      }

      slotMappers.set(slotKey.value, replacement);

      return slotKey;
    });
  });
}

export function rename(
  slotKeyFn: () => Ref<OutputSymbol | undefined>,
  newName: string,
) {
  extensionEffects.push(() => {
    effect(() => {
      const sym = slotKeyFn().value;
      if (!sym) return;
      sym.name = newName;
    });
  });
}
