import { code, For, Output, renderAsync, writeOutput } from "@alloy-js/core";
import { SourceFile } from "@alloy-js/typescript";
import { resolve } from "pathe";
import { resolveSchemas } from "./collect-schemas.js";
import { XmlComponent } from "./components/xml-component.jsx";

console.log("Fetching and parsing XSDs...");
const schemas = await resolveSchemas();
console.log(`Generating for ${schemas.length} schemas`);

const OUTPUT_PATH = resolve(import.meta.dirname, "../../src/components");

await writeOutput(
  await renderAsync(
    <Output basePath={OUTPUT_PATH}>
      å
      <SourceFile path="elements.generated.tsx">
        {code`import "@alloy-js/core";\n`}
        {code`import { makeTag } from "./utils/make-tag.js";\n\n`}
        <For each={schemas} doubleHardline>
          {(schema) => <XmlComponent schema={schema} />}
        </For>
      </SourceFile>
    </Output>,
  ),
);
console.log(`Wrote output to ${OUTPUT_PATH}`);
