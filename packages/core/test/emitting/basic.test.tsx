import { it } from "vitest";
import { render } from "../../src/render.js";
import { SourceFile } from "../../src/components/SourceFile.js";
import { Declaration } from "../../src/components/Declaration.js";
import { Output } from "../../src/components/Output.js";
import { Scope } from "../../src/components/Scope.js";

it("works", () => {
  const contents = render(
    <Output>
      <SourceFile path="readme.md" filetype="markdown">
        This is a sample output project.
      </SourceFile>
      <SourceFile path="test1.ts" filetype="typescript">
        <Scope name="test1.ts" kind="module">
          <Declaration name="foo">
            export function foo() {"{"} {"}"}
          </Declaration>
        </Scope>
      </SourceFile>
      <SourceFile path="test2.ts" filetype="typescript">
        <Scope name="test2.ts" kind="module">
          const v = 
        </Scope>
      </SourceFile>
    </Output>,
  );

  console.log(contents);
});
