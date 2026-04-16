import { Children, For, memo } from "@alloy-js/core";

export interface ValueProps {
  value?: unknown;
}

export function Value(props: ValueProps): Children {
  return memo((): Children => {
    const value = props.value;

    if (typeof value === "undefined" || value === null) {
      return "None";
    } else if (typeof value === "number" || typeof value === "boolean") {
      return String(value);
    } else if (typeof value === "string") {
      return JSON.stringify(value);
    } else if (Array.isArray(value)) {
      return (
        <>
          {"vec!["}
          <For each={value} joiner=", ">
            {(item) => <Value value={item} />}
          </For>
          {"]"}
        </>
      );
    } else if (typeof value === "function") {
      return value as () => Children;
    }

    return String(value);
  });
}
