import { ref, Ref, toRaw } from "@vue/reactivity";
import { BaseListProps } from "./components/List.jsx";
import {
  createCustomContext,
  CustomContext,
  Disposable,
  effect,
  ensureIsEmpty,
  getContext,
  memo,
  onCleanup,
  root,
  untrack,
} from "./reactivity.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OutputDirectory, OutputFile, render } from "./render.js";
import {
  Children,
  ComponentCreator,
  isComponentCreator,
} from "./runtime/component.js";

export interface JoinOptions {
  /**
   * The string to place between each element.
   */
  joiner?: Children;

  /**
   * When true, the joiner is placed at the end of the array. When a string,
   * that string is placed at the end of the array. The ender is only emitted
   * when the array has at least one element.
   */
  ender?: Children;

  /**
   * When true, falsy values with the exception of 0 are skipped.
   */
  skipFalsy?: boolean;
}
const defaultJoinOptions: JoinOptions = {
  joiner: "\n",
  ender: false,
};

/**
 * Map a Map to an array using a mapper and place a joiner between each element.
 * Defaults to joining with a newline.
 *
 * @see {@link join} for joining without mapping.
 * @param src - Source map.
 * @param cb - Mapper function.
 * @param options - Join options.
 * @returns The mapped and joined array.
 *
 */
export function mapJoin<T, U, V>(
  src: () => Map<T, U>,
  cb: (key: T, value: U, index: number) => V,
  options?: JoinOptions,
): () => (V | string | undefined | CustomContext)[];
/**
 * Map a Map to an array using a mapper and place a joiner between each element.
 * Defaults to joining with a newline.
 *
 * @see {@link join} for joining without mapping.
 * @param src - Source map.
 * @param cb - Mapper function.
 * @param options - Join options.
 * @returns The mapped and joined array.
 *
 */
export function mapJoin<U, V>(
  src: () => Set<U>,
  cb: (value: U, index: number) => V,
  options?: JoinOptions,
): () => (V | string | undefined | CustomContext)[];
/**
 * Map a array or iterator to another array using a mapper and place a joiner
 * between each element. Defaults to joining with a newline.
 *
 * @see {@link join} for joining without mapping.
 * @param src - Source array.
 * @param cb - Mapper function.
 * @param options - Join options.
 * @returns The mapped and joined array.
 */
export function mapJoin<T, V>(
  src: () => T[] | IterableIterator<T>,
  cb: (value: T, index: number) => V,
  options?: JoinOptions,
): () => (V | string | undefined | CustomContext)[];
export function mapJoin<T, U, V>(
  src: () => Map<T, U> | Set<T> | T[] | Iterable<T>,
  cb: (key: T, valueOrIndex: U | number, index: number) => V,
  rawOptions: JoinOptions = {},
): () => Children {
  /**
   * Strategy overview:
   * - Initial render: collect a stable array of mapper outputs, cache
   *   per-index slot metadata, and create joiner `Ref`s for the gaps between
   *   items so the rendered list can be mutated without recreating siblings.
   * - List mutations: diff the incoming iterable against slot metadata, reuse
   *   entries with matching keys, recycle disposers past the change point, and
   *   prune caches while recalculating first/last non-empty indices so we only
   *   edit joiners that are affected by the change.
   * - Content transitions: each child renders inside a custom context that
   *   exposes an `isEmpty` flag; when a child gains or loses content we update
   *   neighbor joiner refs so separators appear and disappear reactively
   *   without re-running the mapper.
   */
  const options = { ...defaultJoinOptions, ...rawOptions };
  const ender =
    options.ender === true ? options.joiner : options.ender || undefined;
  type MapJoinItem = T | [T, U];
  interface MapJoinSlot {
    item?: MapJoinItem;
    disposer?: Disposable;
    joiner?: Ref<Children | undefined>;
    isEmpty: Ref<boolean>;
  }
  const itemSlots: MapJoinSlot[] = [];

  function getOrCreateSlot(index: number): MapJoinSlot {
    let slot = itemSlots[index];
    if (!slot) {
      slot = { isEmpty: ref(true) };
      itemSlots[index] = slot;
    }
    return slot;
  }
  const firstNonEmptyIndex = ref(-1);
  const lastNonEmptyIndex = ref(-1);
  const mapped: Children[] = [];
  let enderMemo: (() => Children) | undefined;

  // Creates a ref placeholder that stores the joiner node for a boundary.
  function createJoinerRef(): Ref<Children | undefined> {
    return ref<unknown>(undefined) as Ref<Children | undefined>;
  }

  // Makes sure we have a joiner ref at the requested boundary index.
  function ensureJoinerSlot(index: number) {
    if (index === 0 || options.joiner === undefined) {
      return;
    }

    const slot = getOrCreateSlot(index);
    slot.joiner ??= createJoinerRef();
    mapped[index * 2 - 1] = slot.joiner!;
  }

  // Sets the joiner ref based on whether neighboring children have content.
  function updateJoinerForIndex(index: number) {
    if (index === 0 || options.joiner === undefined) {
      return;
    }

    const slot = itemSlots[index];
    const joinerRef = slot?.joiner;
    if (!joinerRef) {
      return;
    }

    if (index >= itemSlots.length) {
      if (joinerRef.value !== undefined) {
        joinerRef.value = undefined;
      }
      return;
    }

    const previousNonEmpty = findPrevNonEmpty(index - 1);
    const rightSlot = itemSlots[index];
    const shouldShow =
      previousNonEmpty !== -1 &&
      rightSlot !== undefined &&
      rightSlot.isEmpty.value === false;

    const newValue = shouldShow ? options.joiner : undefined;
    if (joinerRef.value !== newValue) {
      joinerRef.value = newValue;
    }
  }

  // Finds the next child that is not empty starting at or after `from`.
  function findNextNonEmpty(from: number) {
    for (let i = Math.max(from, 0); i < itemSlots.length; i++) {
      const slot = itemSlots[i];
      if (slot && slot.isEmpty.value === false) {
        return i;
      }
    }
    return -1;
  }

  // Finds the previous child that is not empty before or at `from`.
  function findPrevNonEmpty(from: number) {
    for (let i = Math.min(from, itemSlots.length - 1); i >= 0; i--) {
      const slot = itemSlots[i];
      if (slot && slot.isEmpty.value === false) {
        return i;
      }
    }
    return -1;
  }

  // Recomputes the cached first and last non-empty indices after changes.
  function recalculateNonEmptyBounds() {
    const first = findNextNonEmpty(0);
    firstNonEmptyIndex.value = first;
    lastNonEmptyIndex.value =
      first === -1 ? -1 : findPrevNonEmpty(itemSlots.length - 1);
    refreshJoiners();
  }

  // Syncs all joiner refs after the structural shape of the list updates.
  function refreshJoiners() {
    if (options.joiner === undefined) {
      return;
    }

    for (let i = 1; i < itemSlots.length; i++) {
      const slot = itemSlots[i];
      if (slot?.joiner) {
        updateJoinerForIndex(i);
      }
    }
  }

  // Applies empty-state bookkeeping for an item and updates neighbor joiners.
  function applyEmptyStateChange(
    index: number,
    isEmpty: boolean,
    wasEmpty: boolean,
  ) {
    if (wasEmpty === isEmpty) {
      return;
    }

    if (isEmpty) {
      if (firstNonEmptyIndex.value === index) {
        firstNonEmptyIndex.value = findNextNonEmpty(index + 1);
      }
      if (lastNonEmptyIndex.value === index) {
        lastNonEmptyIndex.value = findPrevNonEmpty(index - 1);
      }
    } else {
      if (firstNonEmptyIndex.value === -1 || index < firstNonEmptyIndex.value) {
        firstNonEmptyIndex.value = index;
      }
      if (index > lastNonEmptyIndex.value) {
        lastNonEmptyIndex.value = index;
      }
    }

    updateJoinerForIndex(index);
    updateJoinerForIndex(index + 1);
  }
  let previousItemsLen = 0;

  onCleanup(() => {
    for (const slot of itemSlots) {
      slot.disposer?.();
    }
  });

  return () => {
    const itemsSource = src();
    // need to unpack reactives for branding checks
    const itemsSourceRaw = toRaw(itemsSource);
    let items =
      Array.isArray(itemsSourceRaw) ? (itemsSource as T[]) : [...itemsSource];

    if (options.skipFalsy) {
      items = items.filter(
        (item) =>
          item !== null && item !== undefined && typeof item !== "boolean",
      );
    }

    const context = getContext();
    // this is important to access here in reactive context so we are
    // notified of new items from reactives.
    const itemsLen = items.length;
    const compare: any = getCompareFunction(itemsSourceRaw);
    const mapper: any = getMapperFunction(itemsSourceRaw);

    return untrack(() => {
      let startIndex = 0;
      for (
        ;
        startIndex < itemsLen && startIndex < itemSlots.length;
        startIndex++
      ) {
        const slot = itemSlots[startIndex];
        if (!slot || !compare(items[startIndex], slot.item as any)) {
          break;
        }
      }

      if (startIndex > 0 && startIndex < itemsLen) {
        // need to update the previous joiner (might be ender or absent)
        ensureJoinerSlot(startIndex);
      }

      for (; startIndex < itemsLen; startIndex++) {
        const slot = getOrCreateSlot(startIndex);
        slot.item = items[startIndex];
        const emptyFlag = slot.isEmpty;

        if (slot.disposer) {
          if (emptyFlag.value === false) {
            if (context) {
              context.childrenWithContent--;
            }
            emptyFlag.value = true;
            applyEmptyStateChange(startIndex, true, false);
          }
          slot.disposer();
        }

        const cleanupIndex = startIndex;

        mapped[startIndex * 2] = createCustomContext((cb) => {
          return root((disposer) => {
            const nestedContext = getContext()!;
            const isEmptyFlag = ensureIsEmpty(nestedContext);

            slot.disposer = disposer;
            disposer();
            effect(
              (prev?: boolean) => {
                const isEmpty = isEmptyFlag.value;
                return untrack(() => {
                  if (slot.isEmpty.value !== isEmpty) {
                    slot.isEmpty.value = isEmpty;
                  }
                  const wasEmpty = prev ?? true;

                  applyEmptyStateChange(cleanupIndex, isEmpty, wasEmpty);

                  return isEmpty;
                });
              },
              undefined,
              {
                debug: {
                  name: `list:slotEmpty:${cleanupIndex}`,
                  type: "list",
                },
              },
            );
            cb(mapper(items[cleanupIndex], cleanupIndex));
          });
        });

        ensureJoinerSlot(startIndex);
      }

      mapped.length = startIndex * 2;
      if (mapped.length > 0) {
        if (ender !== undefined) {
          enderMemo ??= memo(() =>
            lastNonEmptyIndex.value === -1 ? undefined : ender,
          );
          mapped[mapped.length - 1] = enderMemo;
        } else {
          mapped[mapped.length - 1] = undefined;
        }
      }
      for (; startIndex < previousItemsLen; startIndex++) {
        const slot = itemSlots[startIndex];
        if (!slot) {
          continue;
        }

        slot.disposer?.();
        if (slot.isEmpty.value === false) {
          if (context) {
            context.childrenWithContent--;
          }
          slot.isEmpty.value = true;
          applyEmptyStateChange(startIndex, true, false);
        }
      }

      if (previousItemsLen !== itemsLen) {
        itemSlots.length = itemsLen;
        recalculateNonEmptyBounds();
      }

      previousItemsLen = itemsLen;
      return mapped;
    });
  };

  // Chooses the equality function based on the collection type in use.
  function getCompareFunction(itemsSource: Map<T, U> | T[] | Iterable<T>) {
    return Array.isArray(itemsSource) || isIterable(itemsSource) ?
        compareArray
      : compareMap;
  }

  // Selects the mapper signature to match the collection type in use.
  function getMapperFunction(itemsSource: Map<T, U> | T[] | Iterable<T>) {
    return (
        Array.isArray(itemsSource) ||
          itemsSource instanceof Set ||
          isIterable(itemsSource)
      ) ?
        mapArray
      : mapMap;
  }
  // Strict equality check for array-like collections.
  function compareArray(elem1: T, elem2: T) {
    return elem1 === elem2;
  }

  // Equality check for map entries that includes key and value.
  function compareMap(record1: [T, U], record2: [T, U]) {
    return record1[0] === record2[0] && record1[1] === record2[1];
  }

  // Invokes the user mapper for array-like collections.
  function mapArray(item: T, index: number) {
    return (cb as any)(item, index);
  }

  // Invokes the user mapper for map collections.
  function mapMap(item: [T, U], index: number) {
    return cb(item[0], item[1], index);
  }

  // Runtime type guard for iterables returned from custom sources.
  function isIterable<T>(x: unknown): x is Iterable<T> {
    return typeof (x as any).next === "function";
  }
}

/**
 * Place a joiner between each element of an array or iterator. Defaults to
 * joining with a newline.
 *
 * @see mapJoin for mapping before joining.
 * @returns The joined array
 */
export function join<T extends Children>(
  src: T[] | Iterator<T>,
  options: JoinOptions = {},
): Children {
  const mergedOptions = { ...defaultJoinOptions, ...options };
  const joined: Children[] = [];
  const ender =
    mergedOptions.ender === true ? mergedOptions.joiner : mergedOptions.ender;
  src = Array.from(src as Iterable<T>);

  for (const [index, item] of src.entries()) {
    joined.push(item);
    if (index !== src.length - 1) {
      joined.push(mergedOptions.joiner!);
    }
  }

  if (src.length > 0 && ender) {
    joined.push(ender);
  }

  return joined;
}

export interface ChildrenOptions {
  /**
   * When true, fragments and arrays are not flattened.
   */
  preserveFragments?: boolean;
}
/**
 * Returns a memo which is a list of all the provided children.
 * If you want this as an array, see {@link childrenArray}.
 */
export function children(
  fn: () => Children,
  options: ChildrenOptions = {},
): () => Children {
  return memo(() => {
    const children = fn();
    if (options.preserveFragments && Array.isArray(children)) {
      return children.map(collectChildren);
    } else {
      return collectChildren(children);
    }
  });

  function collectChildren(children: Children): Children {
    if (Array.isArray(children)) {
      return children.map(collectChildren).flat();
    } else if (
      typeof children === "function" &&
      !isComponentCreator(children)
    ) {
      return collectChildren(children());
    } else {
      return children;
    }
  }
}

export function childrenArray(
  fn: () => Children,
  options?: ChildrenOptions,
): Children[] {
  const c = children(fn, options)();
  if (Array.isArray(c)) {
    return c;
  } else if (c === undefined) {
    return [];
  } else {
    return [c];
  }
}

export function findKeyedChild(children: Children[], tag: symbol) {
  for (const child of children) {
    if (isKeyedChild(child) && child.tag === tag) {
      return child;
    }
  }

  return null;
}

export function findKeyedChildren(children: Children[], tag: symbol) {
  const keyedChildren: ComponentCreator[] = [];
  for (const child of children) {
    if (isKeyedChild(child) && child.tag === tag) {
      keyedChildren.push(child);
    }
  }
  return keyedChildren;
}

export function findUnkeyedChildren(children: Children[]) {
  return children.filter((child) => !isKeyedChild(child));
}

export function isKeyedChild(child: Children): child is ComponentCreator {
  return isComponentCreator(child) && !!child.tag;
}

/**
 * A visitor to collect the output from {@link render}. Used by
 * {@link traverseOutput}.
 */
export interface OutputVisitor {
  visitDirectory(directory: OutputDirectory): void;
  visitFile(file: OutputFile): void;
}

/**
 * Traverse the output from {@link render} and call the visitor for each
 * file and directory within it.
 *
 * @param sourceDirectory - The root directory to traverse.
 * @param visitor - The visitor to call for each file and directory.
 */
export async function traverseOutput(
  sourceDirectory: OutputDirectory,
  visitor: OutputVisitor,
) {
  await visitor.visitDirectory(sourceDirectory);
  for (const item of sourceDirectory.contents) {
    if (item.kind === "directory") {
      await traverseOutput(item, visitor);
    } else {
      await visitor.visitFile(item);
    }
  }
}

/**
 * Convert a list of props to a joiner and ender for use in {@link (mapJoin:1)}.
 */
export function baseListPropsToMapJoinArgs(props: BaseListProps): JoinOptions {
  let joiner, punctuation;
  if ("joiner" in props) {
    joiner = props.joiner;
  } else {
    punctuation =
      props.comma ? ","
      : props.semicolon ? ";"
      : "";

    joiner = (
      <>
        {punctuation}
        {props.softline ?
          <sbr />
        : props.hardline ?
          <hbr />
        : props.literalline ?
          <lbr />
        : props.line ?
          <br />
        : props.space ?
          <> </>
        : props.doubleHardline ?
          <>
            <hbr />
            <hbr />
          </>
        : <hbr />}
      </>
    );
  }

  const ender =
    "ender" in props ? props.ender
    : props.enderPunctuation ? punctuation
    : undefined;

  return { joiner, ender };
}
