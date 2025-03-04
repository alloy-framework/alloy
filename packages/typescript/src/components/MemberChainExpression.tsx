import { childrenArray, computed, For, List, Show } from "@alloy-js/core";
import { Children, isComponentCreator } from "@alloy-js/core/jsx-runtime";
import { FunctionCallExpression } from "./FunctionCallExpression.jsx";

export interface MemberChainExpressionProps {
  children: Children;
}

/**
 * Create a member chain expression, which is a member expression comprised of
 * either children or {@link FunctionCallExpression} components. It is formatted
 * such that when a linebreak is required, the FunctionCallExpression
 */
export function MemberChainExpression(props: MemberChainExpressionProps) {
  // chunks are constructed by consuming as many non-call expressions as
  // possible, then placing an indent and soft line break before and after the
  // any subsequent call expressions

  const chunks = computed(() => {
    const children = childrenArray(() => props.children);
    const chunks: Children[][] = [];

    let currentChunk: Children[] = [];

    for (const child of children) {
      if (
        isComponentCreator(child) &&
        child.component === FunctionCallExpression
      ) {
        if (currentChunk.length > 0) {
          chunks.push(currentChunk);
          currentChunk = [];
        }
        chunks.push([child]);
      } else {
        currentChunk.push(child);
      }
    }

    return [chunks[0], chunks.slice(1)];
  });

  return (
    <group>
      <List joiner="." children={chunks.value[0]} />
      <Show when={chunks.value[1].length > 0}>
        <indent>
          <For each={chunks.value[1]} softline>
            {(chunk) => (
              <>
                .<List joiner="." children={chunk} />
              </>
            )}
          </For>
        </indent>
      </Show>
    </group>
  );
}
