import * as ay from "@alloy-js/core";
import * as jv from "@alloy-js/java";

const res = ay.render(
  <ay.Output>
    <jv.SourceFile path="Test.java">
        const foo = 1;
    </jv.SourceFile>
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
