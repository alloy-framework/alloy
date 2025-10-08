import { For, Indent, memo } from "@alloy-js/core";

export interface AtomProps {
  jsValue?: unknown;
  asFloat?: boolean;
}

/**
 * A component that renders a JavaScript value as a Python atom (atomic value).
 * It handles various types of atomic values including numbers, booleans, strings,
 * functions, arrays, and objects, converting them to Python-like syntax.
 *
 * @example
 * ```tsx
 * <Atom jsValue={42} /> // renders "42"
 * <Atom jsValue={true} /> // renders "True"
 * <Atom jsValue="Hello" /> // renders '"Hello"'
 * <Atom jsValue={[1, 2, 3]} /> // renders "[1, 2, 3]"
 * <Atom jsValue={{ key: "value" }} />
 * ```
 */
export function Atom(props: AtomProps): any {
  return memo(() => {
    const jsValue = props.jsValue;

    if (typeof jsValue === "undefined") {
      return "None";
    } else if (typeof jsValue === "number") {
      if (props.asFloat && Number.isInteger(jsValue)) {
        return jsValue.toFixed(1);
      }
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
                {(v) => <Atom jsValue={v} />}
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
                    <Atom jsValue={k} />: <Atom jsValue={v} />
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
