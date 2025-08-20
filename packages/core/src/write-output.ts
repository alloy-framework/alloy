import { dirname, relative, resolve } from "pathe";
import { AlloyHost } from "./host/alloy-host.js";
import { OutputDirectory } from "./render.js";
import { traverseOutput } from "./utils.js";
/**
 * Write the output from {@link render} to the file system.
 *
 */
export async function writeOutput(
  output: OutputDirectory,
  basePath: string = "",
) {
  return await traverseOutput(output, {
    async visitDirectory(directory) {
      const path = resolve(basePath, directory.path);
      if (await AlloyHost.exists(path)) {
        return;
      }
      // eslint-disable-next-line no-console
      console.log("create", relative(process.cwd(), path));
      await AlloyHost.mkdir(path);
    },
    async visitFile(file) {
      if ("contents" in file) {
        const path = resolve(basePath, file.path);
        if (await AlloyHost.exists(path)) {
          // eslint-disable-next-line no-console
          console.log("overwrite", relative(process.cwd(), path));
        } else {
          // eslint-disable-next-line no-console
          console.log("create", relative(process.cwd(), path));
        }

        await AlloyHost.write(path, file.contents);
      } else {
        // copy file
        const source = resolve(basePath, file.sourcePath);
        const target = resolve(basePath, file.path);
        if (await AlloyHost.exists(target)) {
          // eslint-disable-next-line no-console
          console.log("copy over", relative(process.cwd(), target));
        } else {
          // eslint-disable-next-line no-console
          console.log("copy", relative(process.cwd(), target));
        }
        await AlloyHost.mkdir(dirname(target));
        await AlloyHost.write(target, AlloyHost.read(source).stream());
      }
    },
  });
}
