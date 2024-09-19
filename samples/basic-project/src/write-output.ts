import * as ay from "@alloy-js/core";
import * as fs from "node:fs";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

export async function writeOutput(
  dir: ay.OutputDirectory,
  rootDir: string,
  clean: boolean = false,
) {
  if (clean && fs.existsSync(rootDir)) await rm(rootDir, { recursive: true });

  for (const item of dir.contents) {
    if (item.kind === "file") {
      const targetLocation = join(rootDir, item.path);
      await mkdir(dirname(targetLocation), { recursive: true });
      await writeFile(targetLocation, item.contents);
    } else {
      await writeOutput(item, rootDir);
    }
  }
}
