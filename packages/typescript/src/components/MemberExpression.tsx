import {
  Children,
  childrenArray,
  computed,
  For,
  isComponentCreator,
  OutputSymbol,
  Ref,
  ref,
  Refkey,
  toRef,
  useBinder,
} from "@alloy-js/core";
import { isNullish } from "../symbols/ts-output-symbol.js";
import { isValidJSIdentifier } from "../utils.js";

export interface MemberExpressionProps {
  children: Children;
}

interface PartDescriptor {
  base: string | Ref<string>;
  accessStyle: Ref<"dot" | "bracket">;
  nullish: Ref<boolean>;
  args?: Children[] | boolean;
}

/**
 * Create a member expression from parts. Each part can provide one of
 * the following:
 *
 * * **id**: The identifier for the member expression part
 * * **refkey**: A refkey for a symbol whose name becomes the identifier
 * * **symbol**: a symbol whose name becomes the identifier part
 * * **args**: create a method call with the given args
 *
 * Additionally, a part can be `nullish`, which means subsequent parts
 * will use the appropriate conditional access operator e.g. `?.`.
 *
 * @example
 *
 * ```tsx
 * <MemberExpression>
 *   <MemberExpression.Part id="base" />
 *   <MemberExpression.Part refkey={rk} nullish />
 *   <MemberExpression.Part symbol={sym} />
 *   <MemberExpression.Part args={["hello", "world"]} />
 * </MemberExpression>
 * ```
 *
 * Assuming `rk` is a refkey to a symbol name "prop1", and `sym` is a symbol
 * with a name of "prop2", this will render:
 *
 * ```ts
 * base.prop1?.prop2("hello", "world")
 * ```
 */
export function MemberExpression(props: MemberExpressionProps): Children {
  const children = flattenMemberExpression(childrenArray(() => props.children));
  const parts: PartDescriptor[] = [];
  for (const child of children) {
    if (!isComponentCreator(child, MemberExpression.Part)) {
      // we ignore non-parts
      continue;
    }

    const partProps = child.props;
    const part: PartDescriptor = {
      base: "",
      accessStyle: ref("dot"),
      nullish: ref(!!partProps.nullish),
    };

    if (partProps.id) {
      part.base = partProps.id;
      part.accessStyle.value = accessStyleForMemberName(partProps.id);
    } else if (partProps.refkey) {
      const binder = useBinder();
      const symbolRef = binder.getSymbolForRefkey(partProps.refkey);
      part.base = computed(() => {
        if (symbolRef.value) {
          part.nullish.value = isNullish(symbolRef.value);
          part.accessStyle.value = accessStyleForMemberName(
            symbolRef.value.name,
          );
          return symbolRef.value.name;
        } else {
          return "<unresolved symbol>";
        }
      });
    } else if (partProps.symbol) {
      part.nullish.value = isNullish(partProps.symbol);
      part.accessStyle = computed(() => {
        return accessStyleForMemberName(partProps.symbol!.name);
      });
      part.base = toRef(partProps.symbol, "name");
    } else if (partProps.args) {
      part.args = partProps.args;
    }

    parts.push(part);
  }

  if (parts.length === 0) {
    return <></>;
  }

  // construct a member expression from the parts. When a part is nullish,
  // and there is a subsequent part, we use `?.` instead of `.`. accessStyle determines
  // whether we use dot or bracket notation.

  const result = computed(() => {
    const expression: Children[] = [];

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const base = typeof part.base === "string" ? part.base : part.base.value;
      const hasName = base !== "";

      if (i === 0) {
        expression.push(base);
      } else {
        // Determine if we should use nullish operator from previous part
        const prevPart = parts[i - 1];
        const isNullish = prevPart.nullish.value;

        // Handle parts with name vs. parts with only args differently
        if (hasName) {
          // Apply dot or bracket notation based on accessStyle for named parts
          if (part.accessStyle.value === "dot") {
            expression.push(
              <group>
                <indent>
                  <sbr />
                  {isNullish ? "?." : "."}
                  {base}
                </indent>
              </group>,
            );
          } else {
            // bracket notation - don't include the dot
            expression.push(
              <group>
                {isNullish ? "?." : ""}[
                <indent>
                  <sbr />
                  {JSON.stringify(base)}
                </indent>
                <sbr />]
              </group>,
            );
          }
        } else if (part.args !== undefined) {
          // For parts with only args (no name), append function call directly with appropriate nullish operator
          expression.push(
            <group>
              {isNullish ? "?." : ""}
              <group>
                (
                <For
                  each={typeof part.args === "boolean" ? [] : (part.args ?? [])}
                  comma
                  line
                >
                  {(arg) => arg}
                </For>
                )
              </group>
            </group>,
          );
        }
      }
    }

    return expression;
  });
  return <>{result.value}</>;
}

function accessStyleForMemberName(name: string) {
  if (isValidJSIdentifier(name)) {
    return "dot";
  }
  return "bracket";
}

function flattenMemberExpression(children: Children[]): Children[] {
  const flattened: Children[] = [];
  for (const child of children) {
    if (isComponentCreator(child, MemberExpression)) {
      flattened.push(
        ...flattenMemberExpression(childrenArray(() => child.props.children)),
      );
    } else {
      flattened.push(child);
    }
  }
  return flattened;
}

export interface MemberExpressionPartProps {
  /**
   * The identifier for this part of the member expression.
   */
  id?: string;
  /**
   * A refkey for a symbol whose name becomes the identifier.
   */
  refkey?: Refkey;
  /**
   * A symbol whose name becomes the identifier.
   */
  symbol?: OutputSymbol;
  /**
   * Arguments to construct a call expression.
   */
  args?: Children[] | boolean;

  /**
   * This part is nullish. Subsequent parts use conditional access operators.
   */
  nullish?: boolean;
}
/**
 * A part of a member expression. Each part can provide one of the following
 * props:
 *
 * * **id**: The identifier for the member expression part
 * * **refkey**: A refkey for a symbol whose name becomes the identifier
 * * **symbol**: a symbol whose name becomes the identifier part
 * * **args**: create a method call with the given args
 */
MemberExpression.Part = function (props: MemberExpressionPartProps) {
  /**
   * This component does nothing except hold props which are retrieved by
   * the `MemberExpression` component.
   */
};
