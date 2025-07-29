import {
  AppendFile,
  CopyFile,
  List,
  Output,
  render,
  TemplateFile,
  TemplateVariable,
  UpdateFile,
  writeOutput,
} from "@alloy-js/core";
import { Code, Heading } from "@alloy-js/markdown";
import { join } from "path";
import { fileURLToPath } from "url";

function content(subpath: string) {
  return join(fileURLToPath(import.meta.url), "../../..", "content", subpath);
}

const output = await render(
  <Output basePath="./alloy-output">
    <CopyFile path="license.txt" src={content("license.txt")} />

    <TemplateFile path="readme.md" src={content("readme.md")}>
      <TemplateVariable name="project_name" value="Scaffolded Project" />
      <TemplateVariable name="call_to_action">
        <List doubleHardline>
          <Heading level={3}>How to get started</Heading>
          <Code lang="bash">npm install scaffold-project</Code>
        </List>
      </TemplateVariable>
    </TemplateFile>

    <AppendFile path="log.txt">
      Generating template on {new Date().toISOString()}
    </AppendFile>

    <UpdateFile
      path="package.json"
      defaultContentPath={content("package.json")}
    >
      {(currentContent) => {
        const packageJson = JSON.parse(currentContent!);
        packageJson.dependencies ??= {};
        packageJson.dependencies["scaffold-project"] = "latest";
        return JSON.stringify(packageJson, null, 4);
      }}
    </UpdateFile>
  </Output>,
);

writeOutput(output);
