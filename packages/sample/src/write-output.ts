import { dirname, join } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import * as ay from "@alloy-js/core";

export async function writeOutput(dir: ay.OutputDirectory, rootDir: string) {
  for (const item of dir.contents) {
    if (item.kind === "file") {
      const targetLocation = join(rootDir, item.path);
      console.log("Writing file to " + targetLocation);
      await mkdir(dirname(targetLocation), { recursive: true });
      await writeFile(targetLocation, item.contents);
    } else {
      await writeOutput(item, rootDir);
    }
  }
}
