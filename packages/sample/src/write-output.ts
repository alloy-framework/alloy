import { dirname, join } from "node:path";
import { mkdir, rm, rmdir, writeFile } from "node:fs/promises";
import * as ay from "@alloy-js/core";

export async function writeOutput(dir: ay.OutputDirectory, rootDir: string, clean: boolean = false) {
  if (clean) await rm(rootDir, { recursive: true });

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
