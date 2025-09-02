import * as babel from "@babel/core";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import typescriptPreset from "@babel/preset-typescript";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import alloyPreset from "@alloy-js/babel-preset";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "pathe";

export interface BuildOptions {
  sourceMaps?: boolean;
}
export async function buildFile(filename: string, options: BuildOptions) {
  return babel.transformFileAsync(filename, {
    sourceMaps: options.sourceMaps,
    presets: [typescriptPreset, alloyPreset],
  });
}

export async function buildAllFiles(
  filenames: string[],
  rootDir: string,
  outDir: string,
  options: BuildOptions = {},
) {
  await Promise.all(
    filenames.map(async (file) => {
      const transform = await buildFile(file, options);
      const relativePath = relative(rootDir, file).replace(/\.tsx?$/, ".js");
      const outPath = join(outDir, relativePath);
      await mkdir(dirname(outPath), { recursive: true });
      await writeFile(outPath, transform?.code as any);
      if (transform?.map) {
        await writeFile(outPath + ".map", JSON.stringify(transform.map));
      }
    }),
  );
}
