import {
  Output,
  Prose,
  renderAsync,
  SourceDirectory,
  SourceFile,
} from "@alloy-js/core";

export const title = "Render a very long file";
export const description = `
  This scenario tests the rendering a long file using the Prose component, which should stress the formatter.
`;
export async function runTest(): Promise<any> {
  const words = [];
  for (let i = 0; i < 10000; i++) {
    words.push("Word+i ");
  }
  const content = words.join(" ");

  return await renderAsync(
    <Output>
      <SourceDirectory path="src">
        <SourceFile path={`file-0.txt`} filetype="text/plain">
          <Prose>{content}</Prose>
        </SourceFile>
      </SourceDirectory>
    </Output>,
  );
}
