import Table from "cli-table3";
import pc from "picocolors";
import { contextsByKey } from "../context.js";
import { getContext, untrack } from "../reactivity.js";
import { isReactiveTarget } from "./effects.js";

function reactiveTag(value: unknown) {
  if (isReactiveTarget(value)) {
    return " " + pc.greenBright(`reactive`) + " ";
  }
  return "";
}

const style = {
  value: {
    primitive(value: string | number | boolean | null | undefined) {
      switch (typeof value) {
        case "string":
          return pc.blue(`"${value}"`);
        case "object":
        case "undefined":
          return pc.gray(String(value));
        default:
          return pc.blue(String(value));
      }
    },
    symbol(value: symbol) {
      return pc.gray(String(value));
    },
  },
  context: {
    name(name: string) {
      return pc.bgBlack(` ${pc.white(name)} `);
    },
  },
  component: {
    name(name: string) {
      return pc.bgBlue(` <${pc.white(name)}> `);
    },
  },
};

function dumpValue(value: unknown, level = 0) {
  switch (typeof value) {
    case "boolean":
    case "string":
    case "number":
      return style.value.primitive(value) + reactiveTag(value);
    case "symbol":
      return style.value.symbol(value) + reactiveTag(value);
    case "object":
      if (value === null) {
        return style.value.primitive(null) + reactiveTag(value);
      } else {
        if (level > 0) return pc.gray(`{ ... }` + reactiveTag(value));

        const table = kvTable(" ");

        for (const [key, propValue] of Object.entries(value)) {
          table.push([{ content: key }, dumpValue(propValue, level + 1)]);
        }

        return table.toString();
      }
    case "function":
      return pc.gray("ƒ ()");
    case "undefined":
      return style.value.primitive(undefined);
  }
}

function kvTable(sep = "  ") {
  return new Table({
    chars: {
      top: "",
      "top-mid": "",
      "top-left": "",
      "top-right": "",
      bottom: "",
      "bottom-mid": "",
      "bottom-left": "",
      "bottom-right": "",
      left: "",
      "left-mid": "",
      mid: "",
      "mid-mid": "",
      right: "",
      "right-mid": "",
      middle: sep,
    },
    style: { "padding-left": 0, "padding-right": 0 },
  });
}

function printContext(
  context: ReturnType<typeof getContext>,
  omitOwner = false,
) {
  if (!context?.context) return "";
  const key = Object.getOwnPropertySymbols(context.context)[0];
  if (!key) return "";
  const contextDefinition = contextsByKey.get(key);
  const contextName = contextDefinition?.name ?? "unknown context";
  const value = context.context[key];

  let output = style.context.name(contextName);
  if (!omitOwner) {
    const owner = findContextOwner(context);
    output += " provided by " + style.component.name(owner);
  }

  output += "\n" + dumpValue(value) + "\n";

  return output;
}

function findContextOwner(context: ReturnType<typeof getContext>) {
  let currentContext = context;
  while (
    currentContext &&
    (currentContext.componentOwner === undefined ||
      currentContext.componentOwner.component.name === "Provider")
  ) {
    currentContext = currentContext.owner;
  }

  return currentContext?.componentOwner?.component.name ?? "unknown";
}

export function debugStack() {
  untrack(() => {
    let currentContext = getContext();
    let foundContexts: (typeof currentContext)[] = [];
    while (currentContext !== null) {
      if (
        currentContext.context &&
        Object.getOwnPropertySymbols(currentContext.context)[0]
      ) {
        foundContexts.push(currentContext);
      }

      if (
        currentContext.componentOwner &&
        currentContext.componentOwner.component.name !== "Provider"
      ) {
        process.stdout.write(
          style.component.name(currentContext.componentOwner.component.name) +
            "\n",
        );
        const table = kvTable();
        const props = currentContext.componentOwner.props;

        table.push([
          { hAlign: "right", content: "props" },
          props && Object.keys(props).length > 0 ?
            dumpValue(props)
          : pc.gray("(none)"),
        ]);

        table.push([
          { hAlign: "right", content: "contexts" },
          foundContexts.length > 0 ?
            foundContexts.map((c) => printContext(c, true)).join("\n")
          : pc.gray("(none)"),
        ]);

        process.stdout.write(table.toString() + "\n\n");
        foundContexts = [];
      }

      currentContext = currentContext.owner;
    }
  });
}

export function debugContext() {
  untrack(() => {
    let currentContext = getContext();
    while (currentContext !== null) {
      // eslint-disable-next-line no-console
      console.log(printContext(currentContext));
      currentContext = currentContext.owner;
    }
  });
}

export function debugTree() {
  // eslint-disable-next-line no-console
  console.log("tree");
}

export function debugWatch() {
  // eslint-disable-next-line no-console
  console.log("watch");
}

export function debugRender() {
  // eslint-disable-next-line no-console
  console.log("render");
}
