import { RenderTextTree, renderTree } from "@alloy-js/core";
import * as esbuild from "esbuild";
import * as Flatted from "flatted";
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { annotated } from "./serialize";

/**
 * Write a debug HTML file for exploring Alloy code generation.
 * @param component The component tree to visualize
 * @param path Output path for the HTML file
 */
export async function writeDebugFile(component: any, path: string) {
  const textTree = renderTree(component);
  const html = await generateDebugHtml(textTree);
  writeFileSync(path, html);
  console.log(`Debug UI written to ${path}`);
}

async function generateDebugHtml(textTree: RenderTextTree): Promise<string> {
  const rootDirectory = await annotated(textTree);
  // Build the client bundle
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const result = await esbuild.build({
    entryPoints: [join(__dirname, "client.js")],
    bundle: true,
    minify: false,
    format: "iife",
    write: false,
  });

  const clientCode = result.outputFiles[0].text;

  return `<!DOCTYPE html>
<html>
<head>
    <title>Alloy Debug Tools</title>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            margin: 0;
        }
        h2 {
            margin-top: 0;
        }

        .element-node-viewer .label {
          font-size: 0.75rem;
          font-weight: bold;
          font-family: monospace;
          margin-bottom: 0.25rem;
          margin-top: 0.75rem;
        }

        .element-node-viewer .explorer-item:hover {
          outline: 1px solid #ccc;
          outline-offset: -1px;
        }
    </style>
    <script >
        window.__INITIAL_DATA__ = ${JSON.stringify(Flatted.stringify(rootDirectory))};
    </script>
</head>
<body>
    <div id="root"></div>
    <script>${clientCode}</script>
</body>
</html>`;
}
