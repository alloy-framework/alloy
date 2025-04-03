// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import alloyPreset from "@alloy-js/babel-preset";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import typescriptPreset from "@babel/preset-typescript";
import { babel } from "@rollup/plugin-babel";

export default function alloyPlugin(): any {
  return babel({
    inputSourceMap: true as any,
    sourceMaps: "both",
    babelHelpers: "bundled",
    extensions: [".ts", ".tsx"],
    presets: [typescriptPreset, [alloyPreset]],
  });
}
