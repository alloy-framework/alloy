import { Children, For, Indent, Match, Switch } from "@alloy-js/core";

export interface TypeArgumentsProps {
  args?: Children[] | TypeArgumentDescriptor[];
}

export interface WildcardTypeArgumentDescriptor {
  wildcard: true;
}

export interface ExtendsTypeArgumentDescriptor {
  extends: Children;
}

export interface SuperTypeArgumentDescriptor {
  super: Children;
}

export interface NamedTypeArgumentDescriptor {
  name: Children;
}

export type TypeArgumentDescriptor =
  | ExtendsTypeArgumentDescriptor
  | SuperTypeArgumentDescriptor
  | NamedTypeArgumentDescriptor
  | WildcardTypeArgumentDescriptor;

/**
 * Type arguments for a generic type. Can be called with either an array of
 * Children which are rendered as type arguments, or an array of
 * {@link TypeArgumentDescriptor}s which allow for specifying use-site variance.
 */
export function TypeArguments(props: TypeArgumentsProps) {
  return (
    <Switch>
      <Match when={!props.args || props.args.length === 0}>
        <>{"<>"}</>
      </Match>
      <Match else>
        <group>
          {"<"}
          <Indent softline>
            <Switch>
              <Match when={isTypeArgumentDescriptor(props.args![0])}>
                <For each={props.args as TypeArgumentDescriptor[]} comma line>
                  {(value) => {
                    if ("name" in value) {
                      return value.name;
                    }
                    if ("extends" in value) {
                      return <>? extends {value.extends}</>;
                    }
                    if ("super" in value) {
                      return <>? super {value.super}</>;
                    }

                    return "?";
                  }}
                </For>
              </Match>
              <Match else>
                <For each={props.args as Children[]} comma line>
                  {(value) => value}
                </For>
              </Match>
            </Switch>
          </Indent>
          <sbr />
          {">"}
        </group>
      </Match>
    </Switch>
  );
}

function isTypeArgumentDescriptor(
  value: unknown,
): value is TypeArgumentDescriptor {
  return (
    typeof value === "object" &&
    value !== null &&
    ("extends" in value ||
      "super" in value ||
      "argument" in value ||
      "wildcard" in value)
  );
}
