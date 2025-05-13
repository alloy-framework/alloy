import { For, Indent, memo } from "@alloy-js/core";

export interface ValueProps {
  value?: unknown;
}

export function Value(props: ValueProps): any {
  return memo(() => {
    const value = props.value;

    if (typeof value === "undefined") {
      return "None";
    } else if (typeof value === "number") {
      return String(value);
    } else if (typeof value === "boolean") {
      return value ? "True" : "False";
    } else if (typeof value === "string") {
      return `"${value.replace(/"/g, '\\"')}"`;
    } else if (typeof value === "function") {
      // functions are inserted as-is.
      return value;
    } else if (typeof value === "object") {
      if (value === null) {
        return "None";
      } else if (Array.isArray(value)) {
        // Recursively emit each element of arrays
        return (
          <group>
            {"["}
            <Indent softline trailingBreak>
              <For each={value} comma line>
                {(v) => <Value value={v} />}
              </For>
            </Indent>
            {"]"}
          </group>
        );
      } else {
        const entries = Object.entries(value);
        if (entries.length === 0) {
          return "{}";
        }
        // Recursively emit each key-value pair of objects
        return (
          <group>
            {"{"}
            <Indent softline>
              <For each={entries} comma line>
                {([k, v]) => (
                  <>
                    <Value value={k} />: <Value value={v} />
                  </>
                )}
              </For>
            </Indent>
            {"}"}
          </group>
        );
      }
    }
  });
}
