import { it } from "vitest";
import { For } from "../../src/components/For.jsx";
import { Output, SourceFile } from "../../src/index.js";

it("works", () => {
  const messages = ["hi", "bye"];

  const template =
    <Output>
      <SourceFile path="test.txt" filetype="text">
        <For each={messages} joiner="\n">
          {(message) => <>
            {message}, Jose!
          </>}
        </For>
      </SourceFile>
    </Output>;
});
