import * as babel from "@babel/core";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import typescriptPreset from "@babel/preset-typescript";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import alloyPreset from "@alloy-js/babel-preset";
import { mkdir, writeFile } from "node:fs/promises";
import { basename, dirname, join, relative } from "pathe";

export interface BuildOptions {
  sourceMaps?: boolean;
  addSourceInfo?: boolean;
}
export async function buildFile(filename: string, options: BuildOptions) {
  return babel.transformFileAsync(filename, {
    sourceMaps: options.sourceMaps,
    presets: [typescriptPreset, [alloyPreset, { addSourceInfo: options.addSourceInfo }]],
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
      const transform = await buildFile(file, {
        ...options,
      });
      const relativePath = relative(rootDir, file).replace(/\.tsx?$/, ".js");
      const outPath = join(outDir, relativePath);
      await mkdir(dirname(outPath), { recursive: true });
      let code = transform?.code as any;
      const map = transform?.map;
      if (map) {
        const mapPath = `${outPath}.map`;
        map.sources = map.sources.map((source) => {
          return relative(dirname(mapPath), file);
        });
        await writeFile(mapPath, JSON.stringify(map));
        code = addSourceMappingUrl(code, mapPath);
      }
      await writeFile(outPath, code);
    }),
  );
}

function addSourceMappingUrl(code: string, loc: string) {
  return `${code}\n//# sourceMappingURL=${basename(loc)}`;
}
