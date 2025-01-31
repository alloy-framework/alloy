import { isRef, Ref } from "@vue/reactivity";
import { OutputSymbol } from "./binder.js";
import { useBinder } from "./context/binder.js";
import {
  Children,
  Component,
  ComponentDefinition,
  effect,
  memo,
} from "./jsx-runtime.js";

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
        finder(...args)) as any,
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

      let slotKey = slotKeyFn();
      if (typeof slotKey === "function") {
        slotKey = (slotKey as any)();
      }

      if (isRef(slotKey)) {
        if (slotKey.value === undefined) {
          return slotKey;
        }

        slotMappers.set(slotKey.value, replacement);
      } else {
        if (slotKey === undefined) {
          return slotKey;
        }

        slotMappers.set(slotKey, replacement);
      }

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

export function resolveFQN(fqn: string) {
  return () => {
    const binder = useBinder();
    return binder.resolveFQN(fqn) as Ref<OutputSymbol | undefined>;
  };
}
