import alloyPreset from "@alloy-js/babel-preset";
import typescriptPreset from "@babel/preset-typescript";
import { babel } from "@rollup/plugin-babel";
import type { Plugin, PluginOption } from "vite";

export interface AlloyPluginOptions {
  /**
   * Emit source location information for components (used by the devtools).
   * When omitted, the Alloy preset infers this from `BABEL_ENV`/`NODE_ENV`.
   */
  addSourceInfo?: boolean;
  /**
   * How Babel should emit source maps for the transformed files.
   *
   * @default "both"
   */
  sourceMaps?: boolean | "inline" | "both";
}

/**
 * Rollup/Vite plugin that handles Alloy's JSX syntax transformation.
 *
 * @remarks
 * When used with Vite (including Vitest) this plugin also configures esbuild to
 * defer JSX processing to Babel (`esbuild.jsx: "preserve"`) and adds the
 * `source` resolve condition, so consumers no longer need to set these by hand.
 * Do not set `esbuild.jsx: "automatic"` or `jsxImportSource` — doing so
 * prevents this plugin from transforming Alloy's JSX.
 */
export default function alloyPlugin(
  options: AlloyPluginOptions = {},
): PluginOption {
  const configPlugin: Plugin = {
    name: "alloy:config",
    // Vite-only hook; ignored by plain Rollup.
    config() {
      return {
        esbuild: { jsx: "preserve", sourcemap: "both" },
        resolve: { conditions: ["source"] },
        ssr: { resolve: { conditions: ["source"] } },
      };
    },
  };

  const transformPlugin = babel({
    inputSourceMap: true as any,
    sourceMaps: options.sourceMaps ?? "both",
    babelHelpers: "bundled",
    extensions: [".ts", ".tsx"],
    presets: [
      typescriptPreset,
      [alloyPreset, { addSourceInfo: options.addSourceInfo }],
    ],
  });

  return [configPlugin, transformPlugin as Plugin];
}
