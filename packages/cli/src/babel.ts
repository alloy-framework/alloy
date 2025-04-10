import * as babel from "@babel/core";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import typescriptPreset from "@babel/preset-typescript";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import alloyPreset from "@alloy-js/babel-preset";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "pathe";

export async function buildFile(filename: string) {
  return babel.transformFileAsync(filename, {
    presets: [typescriptPreset, alloyPreset],
  });
}

export async function buildAllFiles(
  filenames: string[],
  rootDir: string,
  outDir: string,
) {
  await Promise.all(
    filenames.map(async (file) => {
      const transform = await buildFile(file);
      const relativePath = relative(rootDir, file).replace(/\.tsx?$/, ".js");
      const outPath = join(outDir, relativePath);
      await mkdir(dirname(outPath), { recursive: true });
      await writeFile(outPath, transform?.code as any);
    }),
  );
}
