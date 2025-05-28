import { toRaw } from "@vue/reactivity";
import { BaseListProps } from "./components/List.jsx";
import {
  createCustomContext,
  CustomContext,
  Disposable,
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
  src: () => Map<T, U> | T[] | Iterable<T>,
  cb: (key: T, valueOrIndex: U | number, index: number) => V,
  rawOptions: JoinOptions = {},
): () => Children {
  const options = { ...defaultJoinOptions, ...rawOptions };
  const ender =
    options.ender === true ? options.joiner : options.ender || undefined;
  const currentItems: (T | [T, U])[] = [];
  const disposables: Disposable[] = [];
  const mapped: Children[] = [];
  let previousItemsLen = 0;

  onCleanup(() => {
    for (const d of disposables) d();
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
    // this is important to access here in reactive context so we are
    // notified of new items from reactives.
    const itemsLen = items.length;
    const compare: any = getCompareFunction(itemsSource);
    const mapper: any = getMapperFunction(itemsSource);

    return untrack(() => {
      let startIndex = 0;
      for (
        ;
        startIndex < itemsLen && startIndex < currentItems.length;
        startIndex++
      ) {
        if (!compare(items[startIndex], currentItems[startIndex])) {
          break;
        }
      }

      if (startIndex > 0 && startIndex < itemsLen) {
        // need to update the previous joiner (might be ender or absent)
        mapped[startIndex * 2 - 1] = options.joiner;
      }

      for (; startIndex < itemsLen; startIndex++) {
        currentItems[startIndex] = items[startIndex];
        if (disposables[startIndex]) {
          disposables[startIndex]();
        }
        const cleanupIndex = startIndex;
        mapped[startIndex * 2] = createCustomContext((cb) => {
          return root((disposer) => {
            disposables[cleanupIndex] = disposer;
            disposer();
            cb(mapper(items[cleanupIndex], cleanupIndex));
          });
        });

        mapped[startIndex * 2 + 1] =
          startIndex < items.length - 1 ? options.joiner : ender;
      }

      mapped.length = startIndex * 2;
      mapped[mapped.length - 1] = ender;
      for (; startIndex < previousItemsLen; startIndex++) {
        disposables[startIndex]?.();
      }

      previousItemsLen = itemsLen;

      return mapped;
    });
  };

  function getCompareFunction(itemsSource: Map<T, U> | T[] | Iterable<T>) {
    return Array.isArray(itemsSource) || isIterable(itemsSource) ?
        compareArray
      : compareMap;
  }

  function getMapperFunction(itemsSource: Map<T, U> | T[] | Iterable<T>) {
    return Array.isArray(itemsSource) || isIterable(itemsSource) ?
        mapArray
      : mapMap;
  }
  function compareArray(elem1: T, elem2: T) {
    return elem1 === elem2;
  }

  function compareMap(record1: [T, U], record2: [T, U]) {
    return record1[0] === record2[0] && record1[1] === record2[1];
  }

  function mapArray(item: T, index: number) {
    return (cb as any)(item, index);
  }

  function mapMap(item: [T, U], index: number) {
    return cb(item[0], item[1], index);
  }

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
export function traverseOutput(
  sourceDirectory: OutputDirectory,
  visitor: OutputVisitor,
) {
  visitor.visitDirectory(sourceDirectory);
  for (const item of sourceDirectory.contents) {
    if (item.kind === "directory") {
      traverseOutput(item, visitor);
    } else {
      visitor.visitFile(item);
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
