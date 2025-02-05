import { mkdirSync, statSync, writeFileSync } from "node:fs";
import { relative, resolve } from "pathe";
import { OutputDirectory } from "./render.js";
import { traverseOutput } from "./utils.js";
/**
 * Write the output from {@link render} to the file system.
 *
 */
export function writeOutput(output: OutputDirectory, basePath: string = "") {
  traverseOutput(output, {
    visitDirectory(directory) {
      const path = resolve(basePath, directory.path);
      if (statSync(path)) {
        return;
      }
      // eslint-disable-next-line no-console
      console.log("create", relative(process.cwd(), path));
      mkdirSync(path, { recursive: true });
    },
    visitFile(file) {
      const path = resolve(basePath, file.path);
      if (statSync(path)) {
        // eslint-disable-next-line no-console
        console.log("overwrite", relative(process.cwd(), path));
      } else {
        // eslint-disable-next-line no-console
        console.log("create", relative(process.cwd(), path));
      }

      writeFileSync(path, file.contents);
    },
  });
}
