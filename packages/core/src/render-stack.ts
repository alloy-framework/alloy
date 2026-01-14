import pc from "picocolors";
import { contextsByKey } from "./context.js";
import { SourceDirectoryContext } from "./context/source-directory.js";
import { SourceFileContext } from "./context/source-file.js";
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
  renderStack.push({ component, props, context: getContext(), source });
}

export function popStack() {
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

  // First pass: determine which providers should be nested vs standalone
  // A provider should be nested under its parent if it's from a different file
  // (i.e., it's part of the component's implementation, not user-provided)
  const nestedProviderIndices = new Set<number>();

  for (let i = renderStack.length - 1; i >= 0; i--) {
    const { component, source } = renderStack[i];

    // Skip anonymous components and providers
    if (!component.name || component.name === "Provider") {
      continue;
    }

    // Look for providers that come immediately after this component
    for (let j = i + 1; j < renderStack.length; j++) {
      const providerEntry = renderStack[j];
      if (!providerEntry.component.name) continue;
      if (providerEntry.component.name !== "Provider") break;

      // Nest provider if it's from a different file (component-internal)
      const shouldNest =
        !source ||
        !providerEntry.source ||
        source.fileName !== providerEntry.source.fileName;

      if (shouldNest) {
        nestedProviderIndices.add(j);
      } else {
        // Stop looking - this provider and all after should be standalone
        break;
      }
    }
  }

  // Second pass: print stack entries in order, nesting providers where appropriate
  for (let i = renderStack.length - 1; i >= 0; i--) {
    const { component, props, source } = renderStack[i];

    // Skip anonymous components
    if (!component.name) {
      continue;
    }

    // Skip providers that will be nested under their parent
    if (nestedProviderIndices.has(i)) {
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

    // For non-Provider components, print any nested providers
    if (component.name !== "Provider") {
      for (let j = i + 1; j < renderStack.length; j++) {
        if (!nestedProviderIndices.has(j)) break;

        const providerEntry = renderStack[j];
        if (!providerEntry.component.name) continue;

        const providerName = getComponentDisplayName(
          providerEntry.component,
          providerEntry.props,
        );
        const providerSourceStr =
          providerEntry.source ?
            pc.gray(` (${formatSourceLocation(providerEntry.source)})`)
          : "";

        // eslint-disable-next-line no-console
        console.error(
          `     ${pc.magenta("provides")} ${pc.bold(providerName)}${providerSourceStr}`,
        );

        const providerPropsStr = inspectProps(providerEntry.props);
        if (providerPropsStr) {
          // eslint-disable-next-line no-console
          console.error(`       ${providerPropsStr}`);
        }
      }
    }
  }

  // Clear the stack after printing to avoid stale data on subsequent render errors
  clearRenderStack();
}
