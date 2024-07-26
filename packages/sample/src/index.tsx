import * as ay from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { dirname, join } from "node:path";
import { writeFile } from "fs/promises";
import { mkdir } from "node:fs/promises";

const res = ay.render(
  <ay.Output>
    <ts.PackageDirectory name="test-package" version="1.0.0" path=".">
      <ay.SourceFile path="readme.md" filetype="markdown">
        This is a sample output project.
      </ay.SourceFile>

      <ts.SourceFile export="." path="test1.ts">
        <ts.Declaration export name="foo">
          const foo = 1;
        </ts.Declaration>
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        const v = <ts.Reference refkey={ay.refkey("foo")} />;
      </ts.SourceFile>
    </ts.PackageDirectory>
  </ay.Output>
);

writeOutput(res, "./sample-output");

async function writeOutput(dir: ay.OutputDirectory, rootDir: string) {
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
