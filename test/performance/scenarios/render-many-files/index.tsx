import {
  For,
  Output,
  renderAsync,
  SourceDirectory,
  SourceFile,
} from "@alloy-js/core";

export const title = "Render 10000 files";
export const description = `
  This scenario tests the rendering of a large number of files (10,000) with no content.
`;
export async function runTest(): Promise<any> {
  const files = [];
  for (let i = 0; i < 10000; i++) {
    files.push("This is file {i}");
  }

  return await renderAsync(
    <Output>
      <SourceDirectory path="src">
        <For each={files}>
          {(file, index) => {
            return (
              <SourceFile path={`file-${index}.txt`} filetype="text/plain">
                {file}
              </SourceFile>
            );
          }}
        </For>
        <SourceFile path="readme.txt" filetype="text/plain"></SourceFile>
      </SourceDirectory>
    </Output>,
  );
}
