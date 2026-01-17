import {
  Output,
  ref,
  renderAsync,
  SourceDirectory,
  SourceFile,
} from "@alloy-js/core";
import { flushJobsAsync } from "./scheduler.js";

async function run() {
  const value = ref(0);
  await renderAsync(
    <Output>
      <SourceDirectory path="src">
        <SourceFile path="example.txt" filetype="text/plain">
          Hello from the devtools debugger.
          <hbr />
          <hbr />
          {value.value}
        </SourceFile>
      </SourceDirectory>
    </Output>,
  );

  setInterval(() => {
    console.log("Incrementing");
    value.value += 1;
    flushJobsAsync();
  }, 500);
}

void run();
