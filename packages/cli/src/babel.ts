import * as babel from "@babel/core";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import typescriptPreset from "@babel/preset-typescript";

export async function buildFile(filename: string) {
  return babel.transformFileAsync(filename, {
    presets: [typescriptPreset],
  });
}
