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
import { isValidJSIdentifier } from "../utils.js";

export interface MemberExpressionProps {
  children: Children;
}

interface PartDescriptor {
  base: string | Ref<string>;
  accessStyle: Ref<"dot" | "bracket">;
  nullish: Ref<boolean>;
  args?: Children[];
}

export function MemberExpression(props: MemberExpressionProps): Children {
  const children = flattenMemberExpression(childrenArray(() => props.children));
  const parts: PartDescriptor[] = [];

  let callExprCount = 0;

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

    if (partProps.name) {
      part.base = partProps.name;
      part.accessStyle.value = accessStyleForMemberName(partProps.name);
    } else if (partProps.refkey) {
      const binder = useBinder();
      const symbolRef = binder.getSymbolForRefkey(partProps.refkey);
      part.base = computed(() => {
        if (symbolRef.value) {
          part.nullish.value = !!symbolRef.value.metadata.nullish;
          part.accessStyle.value = accessStyleForMemberName(
            symbolRef.value.name,
          );
          return symbolRef.value.name;
        } else {
          return "<unresolved symbol>";
        }
      });
    } else if (partProps.symbol) {
      part.nullish.value = !!partProps.symbol.metadata.nullish;
      part.accessStyle = computed(() => {
        return accessStyleForMemberName(partProps.symbol!.name);
      });
      part.base = toRef(partProps.symbol, "name");
    } else if (partProps.args) {
      part.args = partProps.args;
      callExprCount++;
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
                <For each={part.args ?? []} comma line>
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

interface MemberExpressionPartProps {
  name?: string;
  refkey?: Refkey;
  symbol?: OutputSymbol;
  args?: Children[];
  nullish?: boolean;
}

MemberExpression.Part = function (props: MemberExpressionPartProps) {
  /**
   * This component does nothing except hold props which are retrieved by
   * the `MemberExpression` component.
   */
};
