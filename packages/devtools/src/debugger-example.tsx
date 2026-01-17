import {
  Output,
  renderAsync,
  SourceDirectory,
  SourceFile,
} from "@alloy-js/core";

async function run() {
  await renderAsync(
    <Output>
      <SourceDirectory path="src">
        <SourceFile path="example.txt" filetype="text/plain">
          Hello from the devtools debugger.
          <br />
          {() => "This line updates reactively."}
        </SourceFile>
      </SourceDirectory>
    </Output>,
  );
}

void run();
