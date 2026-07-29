import alloyTransform from "@alloy-js/babel-plugin";
import jsxTransform from "@alloy-js/babel-plugin-jsx-dom-expressions";
import type { PluginItem } from "@babel/core";

/** Options accepted by the Alloy Babel preset. */
export interface AlloyPresetOptions {
  /** Module name providing the Alloy runtime. @default "@alloy-js/core" */
  alloyModuleName?: string;
  /** Module name providing the JSX runtime. @default "@alloy-js/core/jsx-runtime" */
  moduleName?: string;
  /** Code generation mode passed to the JSX transform. @default "universal" */
  generate?: string;
  /** Whether to wrap conditional expressions. @default true */
  wrapConditionals?: boolean;
  /** Preserve JSX whitespace. @default true */
  preserveWhitespace?: boolean;
  /** Opt into the legacy whitespace handling (not recommended). */
  legacyWhitespace?: boolean;
  /**
   * Emit source location information for components. When omitted, this is
   * inferred from `dev` or from `BABEL_ENV`/`NODE_ENV`.
   */
  addSourceInfo?: boolean;
  /** Whether this is a development build. Used to infer `addSourceInfo`. */
  dev?: boolean;
}

/**
 * Alloy Babel preset. Transforms Alloy's JSX syntax into calls against the
 * Alloy runtime.
 */
export default function alloyPreset(
  _context: unknown,
  options: AlloyPresetOptions = {},
): { plugins: PluginItem[] } {
  const envMode = process.env.BABEL_ENV ?? process.env.NODE_ENV;
  const inferredDev = envMode === undefined ? true : envMode !== "production";
  const defaultOptions = {
    alloyModuleName: "@alloy-js/core",
    moduleName: "@alloy-js/core/jsx-runtime",
    generate: "universal",
    wrapConditionals: true,
    preserveWhitespace: true,
  };

  const jsxOptions = {
    ...defaultOptions,
    ...options,
  } as Record<string, unknown>;
  if (options.addSourceInfo === undefined) {
    if (options.dev !== undefined) {
      jsxOptions.addSourceInfo = options.dev;
    } else {
      jsxOptions.addSourceInfo = inferredDev;
    }
  }

  // `@babel/core`'s `PluginItem` type does not model the Alloy plugins' custom
  // option objects, so assert comparability here.
  const plugins = [
    [
      alloyTransform,
      {
        alloyModuleName:
          options.alloyModuleName ?? defaultOptions.alloyModuleName,
        legacyWhitespace: options.legacyWhitespace,
      },
    ],
    [jsxTransform, jsxOptions],
  ] as PluginItem[];

  return { plugins };
}
