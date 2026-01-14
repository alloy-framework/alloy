import pc from "picocolors";
import { contextsByKey } from "./context.js";
import { SourceDirectoryContext } from "./context/source-directory.js";
import { SourceFileContext } from "./context/source-file.js";
import { shouldDebug } from "./debug.js";
import { Context, getContext } from "./reactivity.js";
import { Component, Props, SourceLocation } from "./runtime/component.js";

// Store render stack for error diagnostics
const renderStack: Array<{
  component: Component<any>;
  props: Props;
  context: Context | null;
  source?: SourceLocation;
}> = [];

export function pushStack(
  component: Component<any>,
  props: Props,
  source?: SourceLocation,
) {
  if (!shouldDebug()) return;
  renderStack.push({ component, props, context: getContext(), source });
}

export function popStack() {
  if (!shouldDebug()) return;
  renderStack.pop();
}

export function clearRenderStack() {
  renderStack.length = 0;
}

// Helper functions
function getComponentDisplayName(
  component: Component<any>,
  props: Props,
): string {
  // Check if this is a Provider and if we can find its context name
  if (component.name === "Provider") {
    // Try to find the context this provider is associated with
    for (const ctx of contextsByKey.values()) {
      if (ctx.Provider === component && ctx.name) {
        return ctx.name;
      }
    }
  }
  return component.name;
}

function inspectProps(props: Props) {
  const entries = Object.entries(props)
    .filter(([key]) => key !== "children") // Exclude children prop
    .map(([key, value]) => {
      const formattedValue = formatValue(value);
      return `${pc.dim(key)}: ${formattedValue}`;
    });

  return entries.length > 0 ? entries.join(pc.dim(", ")) : "";
}

function formatValue(value: unknown): string {
  switch (typeof value) {
    case "string":
      return pc.blue(`"${value}"`);
    case "number":
    case "boolean":
      return pc.blue(String(value));
    case "undefined":
      return pc.gray("undefined");
    case "object":
      return value ? pc.gray("{...}") : pc.gray("null");
    case "function":
      return pc.gray("function");
    default:
      return pc.gray(String(value));
  }
}

function formatSourceLocation(source: SourceLocation): string {
  const cwd = process.cwd();
  let filePath = source.fileName;

  // Convert to relative path if under cwd
  if (filePath.startsWith(cwd)) {
    filePath = filePath.slice(cwd.length + 1); // +1 to remove leading slash
  }

  return `${filePath}:${source.lineNumber}:${source.columnNumber}`;
}

/**
 * Print the current render stack to the console for debugging.
 *
 * This differs from debug.component.stack in that this uses a purpose-built
 * stack rather than walking the context chain. When this is called, the context
 * chain has been restored. In the future this can probably be unified nicely.
 */
export function printRenderStack() {
  if (!shouldDebug()) return;

  // Find the nearest SourceFileContext or SourceDirectoryContext from the render stack
  let currentPath: string | undefined;
  for (let i = renderStack.length - 1; i >= 0; i--) {
    const { context } = renderStack[i];
    // Prefer SourceFileContext over SourceDirectoryContext
    if (context?.context?.[SourceFileContext.id]) {
      const fileContext = context.context[
        SourceFileContext.id
      ] as SourceFileContext;
      currentPath = fileContext.path;
      break;
    }
    if (!currentPath && context?.context?.[SourceDirectoryContext.id]) {
      const dirContext = context.context[
        SourceDirectoryContext.id
      ] as SourceDirectoryContext;
      currentPath = dirContext.path;
      // Don't break - keep looking for a SourceFileContext
    }
  }

  if (currentPath) {
    // eslint-disable-next-line no-console
    console.error(pc.red(`Error rendering in file ${currentPath}`));
  } else {
    // eslint-disable-next-line no-console
    console.error(pc.red("Error rendering:"));
  }

  // Print stack from most recent to oldest, but collect providers to nest under their parent
  const providerIndices = new Set<number>();

  for (let i = renderStack.length - 1; i >= 0; i--) {
    const { component, props, source } = renderStack[i];

    // Skip anonymous components
    if (!component.name) {
      continue;
    }

    // Check if this component is a context provider (all Providers have this name)
    if (component.name === "Provider") {
      providerIndices.add(i);
      continue;
    }

    const displayName = getComponentDisplayName(component, props);
    const sourceStr =
      source ? pc.gray(` (${formatSourceLocation(source)})`) : "";

    // eslint-disable-next-line no-console
    console.error(`  ${pc.cyan("at")} ${pc.bold(displayName)}${sourceStr}`);

    // Print props on next line if there are any
    const propsStr = inspectProps(props);
    if (propsStr) {
      // eslint-disable-next-line no-console
      console.error(`     ${propsStr}`);
    }

    // Print any providers that come immediately after this component in the stack
    // (providers have higher indices since they were pushed after this component)
    // Only nest providers that were created in the same file (by the component itself)
    for (let j = i + 1; j < renderStack.length; j++) {
      if (!providerIndices.has(j)) break;

      const providerEntry = renderStack[j];
      if (!providerEntry.component.name) continue;

      // Nest provider if it's from a different file (component-internal, in the implementation)
      // Don't nest if from same file (user-provided, in the same file as component invocation)
      const shouldNest =
        !source ||
        !providerEntry.source ||
        source.fileName !== providerEntry.source.fileName;

      const providerName = getComponentDisplayName(
        providerEntry.component,
        providerEntry.props,
      );
      const providerSourceStr =
        providerEntry.source ?
          pc.gray(` (${formatSourceLocation(providerEntry.source)})`)
        : "";

      if (shouldNest) {
        // eslint-disable-next-line no-console
        console.error(
          `     ${pc.magenta("provides")} ${pc.bold(providerName)}${providerSourceStr}`,
        );

        const providerPropsStr = inspectProps(providerEntry.props);
        if (providerPropsStr) {
          // eslint-disable-next-line no-console
          console.error(`       ${providerPropsStr}`);
        }
        providerIndices.delete(j);
      } else {
        // Don't nest - this provider will be printed as its own "at" entry
        break;
      }
    }
  }

  // Print any remaining providers that weren't nested (user-provided)
  for (let i = renderStack.length - 1; i >= 0; i--) {
    if (!providerIndices.has(i)) continue;

    const { component, props, source } = renderStack[i];
    if (!component.name) continue;

    const providerName = getComponentDisplayName(component, props);
    const sourceStr =
      source ? pc.gray(` (${formatSourceLocation(source)})`) : "";

    // eslint-disable-next-line no-console
    console.error(`  ${pc.cyan("at")} ${pc.bold(providerName)}${sourceStr}`);

    const propsStr = inspectProps(props);
    if (propsStr) {
      // eslint-disable-next-line no-console
      console.error(`     ${propsStr}`);
    }
  }
}
