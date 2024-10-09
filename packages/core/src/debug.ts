import { isReactive } from "@vue/reactivity";
import { Chalk } from "chalk";
import Table from "cli-table3";
import { contextsByKey } from "./context.js";
import { Context, getContext } from "./jsx-runtime.js";

interface DebugInterface {
  component: {
    stack(): void;
    tree(): void;
    watch(): void;
    render(): void;
    context(): void;
  };
}

const debug: DebugInterface = {
  component: {
    stack: debugStack,
    tree() {
      for (let i = 0; i < 240; i += 10) {
        for (let j = 0; j < 240; j += 10) {
          process.stdout.write(chalk.bgRgb(i, j, 0)(" "));
        }
        process.stdout.write("\n");
      }
    },
    watch() {
      console.log("watch");
    },
    render() {
      console.log("render");
    },
    context: debugContext,
  },
};

function debugStack() {
  let currentContext = getContext();
  let foundContexts: Context[] = [];
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
        : chalk.gray("(none)"),
      ]);

      table.push([
        { hAlign: "right", content: "contexts" },
        foundContexts.length > 0 ?
          foundContexts.map((c) => printContext(c, true)).join("\n")
        : chalk.gray("(none)"),
      ]);

      process.stdout.write(table.toString() + "\n\n");
      foundContexts = [];
    }

    currentContext = currentContext.owner;
  }
}

function debugContext() {
  let currentContext = getContext();
  while (currentContext !== null) {
    console.log(printContext(currentContext));
    currentContext = currentContext.owner;
  }
}
function printContext(context: Context, omitOwner: boolean = false) {
  if (!context.context) return "";
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

function findContextOwner(context: Context) {
  let currentContext: Context | null = context;
  while (
    currentContext &&
    (currentContext.componentOwner === undefined ||
      currentContext.componentOwner.component.name === "Provider")
  ) {
    currentContext = currentContext.owner;
  }

  return currentContext?.componentOwner?.component.name ?? "unknown";
}
declare global {
  // eslint-disable-next-line no-var
  var debug: DebugInterface;
}

globalThis.debug = debug;

const chalk = new Chalk();
const style = {
  value: {
    primitive(value: string | number | boolean | null | undefined) {
      switch (typeof value) {
        case "string":
          return chalk.blue(`"${value}"`);
        case "object":
        case "undefined":
          return chalk.gray(String(value));
        default:
          return chalk.blue(String(value));
      }
    },
    symbol(value: symbol) {
      return chalk.gray(String(value));
    },
  },
  context: {
    name(name: string) {
      return chalk.bgGray(` ${chalk.white(name)} `);
    },
  },
  component: {
    name(name: string) {
      return chalk.bgBlue(` <${chalk.white(name)}> `);
    },
  },
};

function reactiveTag(value: unknown) {
  if (isReactive(value)) {
    return " " + chalk.greenBright(`reactive`) + " ";
  }
  return "";
}

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
        if (level > 0) return chalk.gray(`{ ... }` + reactiveTag(value));

        const table = kvTable(" ");

        for (const [key, propValue] of Object.entries(value)) {
          table.push([{ content: key }, dumpValue(propValue, level + 1)]);
        }

        return table.toString();
      }
    case "function":
      return chalk.gray("ƒ ()");
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
