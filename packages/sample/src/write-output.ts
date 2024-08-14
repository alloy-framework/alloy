import * as ay from "@alloy-js/core";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

export async function writeOutput(dir: ay.OutputDirectory, rootDir: string) {
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
