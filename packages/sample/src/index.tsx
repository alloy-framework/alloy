import * as ay from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";

const res = ay.render(
  <ay.Output>
    <ay.SourceFile path="readme.md" filetype="markdown">
      This is a sample output project.
    </ay.SourceFile>

    <ts.SourceFile path="test1.ts">
      <ay.Declaration name="foo">
        const foo = 1;
      </ay.Declaration>
    </ts.SourceFile>

    <ts.SourceFile path="test2.ts">
      const v = <ts.Reference refkey="foo" />;
    </ts.SourceFile>
  </ay.Output>
);

printOutput(res);

function printOutput(dir: ay.OutputDirectory, level = 1) {
  console.log(`${"#".repeat(level)} Directory ${dir.path}`);

  for (const item of dir.contents) {
    if (item.kind === "directory") {
      printOutput(item, level + 1);
    } else {
      console.log(
        `\n${"#".repeat(level + 1)} ${item.path} (${item.filetype})\n`
      );
      console.log(item.contents);
    }
  }
}
