import {
  Children,
  childrenArray,
  ComponentDefinition,
  computed,
  For,
  isComponentCreator,
  Refkeyable,
  Show,
  takeSymbols,
} from "@alloy-js/core";
import { CSharpSymbol } from "../../symbols/csharp.js";
import {
  childrenToPartDescriptors,
  isArgsPart,
  isIdPart,
  PartDescriptor,
  PartDescriptorWithArgs,
  PartDescriptorWithId,
  PartDescriptorWithIndex,
} from "./part-descriptors.js";

export interface AccessExpressionProps {
  children: Children;
}

export function AccessExpression(props: AccessExpressionProps) {
  const children = flattenAccessExpression(childrenArray(() => props.children));
  const parts = childrenToPartDescriptors(children);

  // any symbols emitted from the children won't be relevant to parent scopes.
  takeSymbols();

  if (parts.length === 0) {
    return <></>;
  }

  const isCallChain = computed(() => {
    let callCount = 0;
    for (const part of parts) {
      if (isArgsPart(part)) callCount++;
    }

    return callCount > 1;
  });

  // construct a member expression from the parts. When a part is nullish,
  // and there is a subsequent part, we use `?.` instead of `.`. accessStyle determines
  // whether we use dot or bracket notation.

  return computed(() => {
    return isCallChain.value ?
        formatCallChain(parts)
      : formatNonCallChain(parts);
  });
}

/**
 * Flattens nested access expressions into a single array of parts.
 */
function flattenAccessExpression(children: Children[]): Children[] {
  const flattened: Children[] = [];
  for (const child of children) {
    if (isComponentCreator(child, AccessExpression)) {
      flattened.push(
        ...flattenAccessExpression(childrenArray(() => child.props.children)),
      );
    } else {
      flattened.push(child);
    }
  }
  return flattened;
}

export interface AccessExpressionPartProps {
  children?: Children;
  /**
   * Whether this part should use conditional access.
   */
  conditional?: boolean;
  /**
   * Emit a function call.
   */
  args?: boolean | Children[];

  /**
   * Type arguments to pass to a member access.
   */
  typeArgs?: Children[];

  /**
   * A refkey for the symbol whose name becomes this part's identifier. When a refkey is provided for the first
   * part, it will be fully resolved. Otherwise, just the symbol's name is used.
   */
  refkey?: Refkeyable;

  /**
   * The symbol whose name becomes this part's identifier.
   */
  symbol?: CSharpSymbol;

  /**
   * The identifier to use for this part.
   */
  id?: string;

  /**
   * Create an element access part with a single indexer argument. Mutually
   * exclusive with the `indexerArgs` prop.
   */
  index?: Children;

  /**
   * Create an element access part with multiple indexer arguments. Mutually
   * exclusive with the `index` prop.
   */
  indexerArgs?: Children[];

  /**
   * Whether this part could possibly be null. Will guard member and element
   * access with a conditional access operator. Passing this is not necessary if
   * you provide a symbol or refkey and the symbol's nullable flag is set.
   */
  nullable?: boolean;

  /**
   * Wether this part is an attribute reference (used in an attribute context).
   * In that case the "Attribute" suffix is trimmed from the name if present.
   */
  attribute?: boolean;
}

AccessExpression.Part = function (props: AccessExpressionPartProps) {
  /** renders nothing, the parent AccessExpression will use these args */
};

/**
 * Formatting of call chains (i.e. member expressions which have more than one
 * call in them). The general approach is that line breaks occur after each
 * call, and there is only one call per line. When there are non-call elements,
 * they occur prior to the call part. The first part of the member expression
 * contains all but the last non-call part.
 *
 * The following is an example of proper formatting:
 *
 * ```ts
 * z.dummy             // all but the last non-call part for the first element
 *   .object({         // the first call part with line break after
 *      a: 1,
 *   })
 *   .dummy.partial()  // the next call part with non-call parts before it
 * ```
 */
function formatCallChain(parts: PartDescriptor[]): Children {
  return computed(() => {
    const expression: Children[] = [];

    // break the expression into parts.
    const chunks: PartDescriptor[][] = [];

    // the first part is all the non-call parts
    let partIndex = 0;

    function pushPart() {
      const part = parts[partIndex];
      if (!part) throw new Error("No part to push");
      chunks.at(-1)!.push(part);
      partIndex++;
    }

    function pushChunk() {
      chunks.push([]);
    }

    // For the first chunk, take all the non-call parts except the last one
    // and put them in a chunk.
    pushChunk();
    while (
      partIndex < parts.length &&
      (partIndex === parts.length - 1 ||
        chunks.at(-1)!.length === 0 ||
        !isArgsPart(parts[partIndex + 1]))
    ) {
      pushPart();
      if (isArgsPart(chunks.at(-1)!.at(-1)!)) {
        // the first segment always ends after we see a call
        // if we happen to take one
        break;
      }
    }

    // then for all remaining parts, collect all the non-call parts and end with
    // a call chunk
    while (partIndex < parts.length) {
      pushChunk();
      while (partIndex < parts.length && !isArgsPart(parts[partIndex])) {
        pushPart();
      }
      while (partIndex < parts.length && isArgsPart(parts[partIndex])) {
        pushPart();
      }
    }

    for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
      const chunk = chunks[chunkIndex];
      const chunkExpression = [];
      for (let partIndex = 0; partIndex < chunk.length; partIndex++) {
        if (chunkIndex === 0 && partIndex === 0) {
          // first part is just gonna be the id
          const firstPart =
            isIdPart(chunk[0]) ?
              chunk[0].id
            : (chunk[0] as PartDescriptorWithIndex).indexerArgs;
          chunkExpression.push(firstPart);
          continue;
        }
        const part = chunk[partIndex];
        const prevPart =
          partIndex === 0 ?
            chunks[chunkIndex - 1].at(-1)!
          : chunk[partIndex - 1];

        if (isArgsPart(part)) {
          // For parts with only args (no name), append function call directly with appropriate nullish operator
          chunkExpression.push(formatCallExpr(prevPart, part));
        } else if (isIdPart(part)) {
          chunkExpression.push(formatMemberAccess(prevPart, part, true));
        } else {
          // bracket notation - don't include the dot
          chunkExpression.push(formatElementAccess(prevPart, part));
        }
      }

      expression.push(
        chunkIndex === 0 ? chunkExpression : (
          <>
            <sbr />
            {chunkExpression}
          </>
        ),
      );
    }

    return (
      <group>
        <indent>{expression}</indent>
      </group>
    );
  });
}

function formatNonCallChain(parts: PartDescriptor[]): Children {
  return computed(() => {
    const expression: Children[] = [];

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const base =
        isIdPart(part) ?
          part.id
        : (part as PartDescriptorWithIndex).indexerArgs;
      if (i === 0) {
        expression.push(base, <TypeArgs args={(part as any).typeArgs} />);
      } else {
        // Determine if we should use nullish operator from previous part
        const prevPart = parts[i - 1];

        if (isArgsPart(part)) {
          // For parts with only args (no name), append function call directly with appropriate nullish operator
          expression.push(formatCallExpr(prevPart, part));
        } else if (isIdPart(part)) {
          expression.push(formatMemberAccess(prevPart, part));
        } else {
          // bracket notation - don't include the dot
          expression.push(formatElementAccess(prevPart, part));
        }
      }
    }

    return expression;
  });
}

function formatElementAccess(
  prevPart: PartDescriptor,
  part: PartDescriptorWithIndex,
) {
  return (
    <group>
      {part.conditional || ("nullable" in prevPart && prevPart.nullable) ?
        "?"
      : ""}
      [
      <indent>
        <sbr />
        <For each={part.indexerArgs} comma line>
          {(arg) => arg}
        </For>
      </indent>
      <sbr />]
    </group>
  );
}

function formatMemberAccess(
  prevPart: PartDescriptor,
  part: PartDescriptorWithId,
  noIndent = false,
) {
  let Wrapping: ComponentDefinition<{ children: Children }>;
  if (noIndent) {
    Wrapping = function (props) {
      return (
        <group>
          <sbr />
          {props.children}
        </group>
      );
    };
  } else {
    Wrapping = function (props) {
      return (
        <group>
          <indent>
            <sbr />
            {props.children}
          </indent>
        </group>
      );
    };
  }

  return (
    <Wrapping>
      {part.conditional || ("nullable" in prevPart && prevPart.nullable) ?
        "?."
      : "."}
      {isIdPart(part) ? part.id : (part as PartDescriptorWithIndex).indexerArgs}
      <TypeArgs args={part.typeArgs} />
    </Wrapping>
  );
}

function TypeArgs(props: { args?: Children[] }) {
  return (
    <Show when={props.args && props.args.length > 0}>
      {"<"}
      <group>
        <indent>
          <sbr />
          <For each={props.args!} comma line>
            {(arg) => arg}
          </For>
        </indent>
        <sbr />
      </group>
      {">"}
    </Show>
  );
}

function formatCallExpr(
  prevPart: PartDescriptor,
  part: PartDescriptorWithArgs,
) {
  return (
    <group>
      (<Show when={part.args.length <= 1}>{part.args[0]}</Show>
      <Show when={part.args.length > 1}>
        <indent>
          <sbr />
          <For each={part.args} comma line>
            {(arg) => arg}
          </For>
        </indent>
        <sbr />
      </Show>
      )
    </group>
  );
}
