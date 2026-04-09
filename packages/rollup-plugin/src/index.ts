// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import alloyPreset from "@alloy-js/babel-preset";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import typescriptPreset from "@babel/preset-typescript";
import { babel } from "@rollup/plugin-babel";

/**
 * Rollup/Vite plugin that handles Alloy's JSX syntax transformation.
 *
 * @remarks
 * Do not set `esbuild.jsx: "automatic"` or `jsxImportSource` — esbuild must
 * defer JSX processing to this plugin (set `esbuild.jsx: "preserve"`).
 */
export default function alloyPlugin(): any {
  return babel({
    inputSourceMap: true as any,
    sourceMaps: "both",
    babelHelpers: "bundled",
    extensions: [".ts", ".tsx"],
    presets: [typescriptPreset, [alloyPreset]],
  });
}
