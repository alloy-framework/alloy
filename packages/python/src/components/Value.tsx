import { For, Indent, memo } from "@alloy-js/core";

export interface ValueProps {
  jsValue?: unknown;
}

export function Value(props: ValueProps): any {
  return memo(() => {
    const jsValue = props.jsValue;

    if (typeof jsValue === "undefined") {
      return "None";
    } else if (typeof jsValue === "number") {
      return String(jsValue);
    } else if (typeof jsValue === "boolean") {
      return jsValue ? "True" : "False";
    } else if (typeof jsValue === "string") {
      return `"${jsValue.replace(/"/g, '\\"')}"`;
    } else if (typeof jsValue === "function") {
      // functions are inserted as-is.
      return jsValue;
    } else if (typeof jsValue === "object") {
      if (jsValue === null) {
        return "None";
      } else if (Array.isArray(jsValue)) {
        // Recursively emit each element of arrays
        return (
          <group>
            {"["}
            <Indent softline trailingBreak>
              <For each={jsValue} comma line>
                {(v) => <Value jsValue={v} />}
              </For>
            </Indent>
            {"]"}
          </group>
        );
      } else {
        const entries = Object.entries(jsValue);
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
                    <Value jsValue={k} />: <Value jsValue={v} />
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
