import { toRaw } from "@vue/reactivity";
import { code } from "./code.js";
import {
  Child,
  Children,
  ComponentCreator,
  ComponentDefinition,
  createCustomContext,
  CustomContext,
  Disposable,
  isComponentCreator,
  memo,
  onCleanup,
  root,
  untrack,
} from "./jsx-runtime.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OutputDirectory, OutputFile, render } from "./render.js";

export interface JoinOptions {
  /**
   * The string to place between each element.
   */
  joiner?: string;

  /**
   * When true, the joiner is placed at the end of the array. When a string,
   * that string is placed at the end of the array. The ender is only emitted
   * when the array has at least one element.
   */
  ender?: string | boolean;
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
  cb: (key: T, value: U) => V,
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
  cb: (value: T) => V,
  options?: JoinOptions,
): () => (V | string | undefined | CustomContext)[];
export function mapJoin<T, U, V>(
  src: () => Map<T, U> | T[] | Iterable<T>,
  cb: (key: T, value?: U) => V,
  rawOptions: JoinOptions = {},
): () => (V | string | undefined | CustomContext)[] {
  const options = { ...defaultJoinOptions, ...rawOptions };
  const ender =
    options.ender === true ? options.joiner : options.ender || undefined;
  const currentItems: (T | [T, U])[] = [];
  const disposables: Disposable[] = [];
  const mapped: (V | string | undefined | CustomContext)[] = [];
  let previousItemsLen = 0;

  onCleanup(() => {
    for (const d of disposables) d();
  });

  return () => {
    const itemsSource = src();
    // need to unpack reactives for branding checks
    const itemsSourceRaw = toRaw(itemsSource);
    const items =
      Array.isArray(itemsSourceRaw) ? (itemsSource as T[]) : [...itemsSource];
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
            cb(mapper(items[cleanupIndex]));
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

  function mapArray(item: T) {
    return cb(item);
  }

  function mapMap(item: [T, U]) {
    return cb(item[0], item[1]);
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
export function join<T>(
  src: T[] | Iterator<T>,
  options: JoinOptions = {},
): (T | string)[] {
  const mergedOptions = { ...defaultJoinOptions, ...options };
  const joined = [];
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

/**
 * Returns a memo which is a list of all the provided children.
 * If you want this as an array, see {@link childrenArray}.
 */
export function children(fn: () => Children): () => Children {
  return memo(() => collectChildren(fn()));

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

export function childrenArray(fn: () => Children): Child[] {
  const c = children(fn)();
  if (Array.isArray(c)) {
    return c;
  } else if (c === undefined) {
    return [];
  } else {
    return [c];
  }
}

export function findKeyedChild(children: Child[], tag: symbol) {
  for (const child of children) {
    if (isKeyedChild(child) && child.tag === tag) {
      return child;
    }
  }

  return null;
}

export function findKeyedChildren(children: Child[], tag: symbol) {
  const keyedChildren: ComponentCreator[] = [];
  for (const child of children) {
    if (isKeyedChild(child) && child.tag === tag) {
      keyedChildren.push(child);
    }
  }
  return keyedChildren;
}

export function findUnkeyedChildren(children: Child[]) {
  return children.filter((child) => !isKeyedChild(child));
}

export function isKeyedChild(child: Child): child is ComponentCreator {
  return isComponentCreator(child) && !!child.tag;
}

export function stc<T extends {}>(Component: ComponentDefinition<T>) {
  return (
    ...args: unknown extends T ? []
    : {} extends Omit<T, "children"> ? [props?: T]
    : [props: T]
  ) => {
    const fn: ComponentCreator<T> & {
      code(
        template: TemplateStringsArray,
        ...substitutions: Children[]
      ): ComponentCreator<T>;
      children(...children: Children[]): ComponentCreator<T>;
    } = () => Component(args[0]!);
    fn.component = Component;
    fn.props = args[0]!;
    fn.code = (
      template: TemplateStringsArray,
      ...substitutions: Children[]
    ): ComponentCreator<T> => {
      const propsWithChildren = {
        ...(args[0] ?? {}),
        children: code(template, ...substitutions),
      };

      const fn = () => Component(propsWithChildren as any);
      fn.component = Component;
      fn.props = args[0]!;
      return fn;
    };

    fn.children = (...children: Children[]): ComponentCreator<T> => {
      const propsWithChildren = {
        ...(args[0] ?? {}),
        children,
      };

      const fn = () => Component(propsWithChildren as any);
      fn.component = Component;
      fn.props = args[0]!;
      return fn;
    };

    return fn;
  };
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
