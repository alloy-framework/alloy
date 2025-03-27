import { childrenArray, computed, For, Show } from "@alloy-js/core";
import { Children, isComponentCreator } from "@alloy-js/core/jsx-runtime";
import { FunctionCallExpression } from "./FunctionCallExpression.jsx";
import {
  MemberIdentifier,
  MemberIdentifierProps,
} from "./MemberIdentifier.jsx";

export interface MemberChainExpressionProps {
  children: Children;
}
/**
 * Represents an item in a member expression chain
 */
interface ChunkItem {
  /**
   * The actual member expression content
   */
  children: Children;
  /**
   * Whether this member can be null or undefined
   */
  nullish: boolean;
}

/**
 * A chunk in a member expression chain
 * Chunks are used to group related member expressions together
 * - The first chunk contains the object being accessed
 * - Function call chunks are separated for special formatting
 * - Regular member access chunks are grouped together
 */
interface Chunk {
  items: ChunkItem[];
}

/**
 * Determines if a given child component represents an optional chaining (`?.`) member access.
 *
 * @param child - The child component to check.
 * @returns True if the child represents an optional chaining member access; false otherwise.
 */
function isNullish(child: Children): boolean {
  if (isComponentCreator(child) && child.component === MemberIdentifier) {
    return (child.props as MemberIdentifierProps).nullish === true;
  }

  return false;
}

/**
 * Renders a TypeScript member expression chain, handling optional chaining, {@link FunctionCallExpression} and MemberIdentifier
 *
 * This component formats complex member chains (e.g., `obj.prop1?.method().prop2`) by grouping related expressions
 * and applying indentation and line breaks for readability.
 *
 * @example
 * ```tsx
 * <MemberChainExpression>
 *   <MemberIdentifier refkey={refkey("obj")} />
 *   <MemberIdentifier refkey={refkey("prop1")} nullish />
 *   <FunctionCallExpression target="method" />
 *   <MemberIdentifier refkey={refkey("prop2")} />
 * </MemberChainExpression>
 * // Output:
 * // obj.prop1?.method().prop2
 * ```
 */
export function MemberChainExpression(props: MemberChainExpressionProps) {
  // chunks are constructed by consuming as many non-call expressions as
  // possible, then placing an indent and soft line break before and after the
  // any subsequent call expressions

  const chunks = computed(() => {
    const children = flattenCallChains(childrenArray(() => props.children));
    return createChunks(children);
  });
  const groupId = Symbol();

  const hasSingleRestChunk = chunks.value.rest.length === 1;
  const hasMultipleRestChunks = chunks.value.rest.length > 1;

  return (
    <group>
      <group id={groupId}>
        {chunks.value.first.items.length > 0 &&
          chunks.value.first.items[0].children}
        <ChunkItems chunk={chunks.value.first} startIndex={1} softline={true} />
      </group>

      <Show when={hasSingleRestChunk}>
        <For each={chunks.value.rest} softline>
          {(chunk) => <ChunkItems chunk={chunk} />}
        </For>
      </Show>

      <Show when={hasMultipleRestChunks}>
        <indent>
          <For each={chunks.value.rest} softline>
            {(chunk) => <ChunkItems chunk={chunk} />}
          </For>
        </indent>
      </Show>
    </group>
  );
}

/**
 * Flattens nested MemberChainExpression components into a flat array.
 * This allows us to properly format complex nested chains like obj.prop1.prop2().method()
 */
function flattenCallChains(children: Children[]): Children[] {
  const flatChildren = [];
  for (const child of children) {
    if (
      isComponentCreator(child) &&
      child.component === MemberChainExpression
    ) {
      flatChildren.push(...flattenCallChains(child.props.children));
    } else {
      flatChildren.push(child);
    }
  }

  return flatChildren;
}

/**
 * Checks if a given child component is a {@link FunctionCallExpression}.
 */
function isFunctionCall(child: Children): boolean {
  return (
    isComponentCreator(child) && child.component === FunctionCallExpression
  );
}

/**
 * Adds the current chunk of member expressions to the chunks array if it's not empty.
 */
function pushCurrentChunk(chunks: Chunk[], currentChunk: ChunkItem[]) {
  if (currentChunk.length > 0) {
    chunks.push({ items: currentChunk });
  }
}

interface ChunksResult {
  first: Chunk;
  rest: Chunk[];
}

/**
 * Creates chunks from an array of children.
 * Each function call expression becomes its own chunk, while consecutive
 * property accesses are grouped into a single chunk.
 */
function createChunks(children: Children[]): ChunksResult {
  const chunks: Chunk[] = [];
  let currentChunk: ChunkItem[] = [];

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const prevChild = i > 0 ? children[i - 1] : null;
    const isOptional = prevChild !== null && isNullish(prevChild);

    if (isFunctionCall(child)) {
      if (currentChunk.length > 0) {
        chunks.push({ items: currentChunk });
        currentChunk = [];
      }
      chunks.push({ items: [{ children: child, nullish: isOptional }] });
    } else {
      currentChunk.push({ children: child, nullish: isOptional });
    }
  }

  pushCurrentChunk(chunks, currentChunk);

  return {
    first: chunks[0] || { items: [] },
    rest: chunks.slice(1),
  };
}

/**
 * Props for the ChunkItems component.
 */
interface ChunkItemsProps {
  /**
   * The chunk containing items to render.
   */
  chunk: Chunk;
  /**
   * Optional index to start rendering from (default is 0).
   */
  startIndex?: number;
  /**
   * Whether to insert soft line breaks between items.
   */
  softline?: boolean;
}

/**
 * Renders a list of chunk items, prefixing each with either '.' or '?.' based on optional chaining.
 */
function ChunkItems({
  chunk,
  startIndex = 0,
  softline = false,
}: ChunkItemsProps) {
  return (
    <For each={chunk.items.slice(startIndex)} softline={softline}>
      {(item) => (
        <>
          {item.nullish ? "?." : "."}
          {item.children}
        </>
      )}
    </For>
  );
}
