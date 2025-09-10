/**
 * Script to process DocFX YAML outputs (in ./api) into a Record<string, Descriptor>
 * compatible with the `createLibrary` props shape defined in ../src/create-library.ts.
 *
 * Usage (from repo root):
 *   tsx packages/csharp/scripts/generate-builtins.ts > /tmp/system-builtins.ts
 *
 * Disclaimer: coded with 🪄 vibes 🔮
 */

import { Output, renderAsync, writeOutput } from "@alloy-js/core";

import { dirname, join, resolve } from "node:path";
import { NamespaceDirectory } from "./components/namespace-directory.jsx";
import { walk } from "./process-docfx.jsx";

// Arg[0]=node, Arg[1]=script, Arg[2]=apiDir, Arg[3]=outputPath (unused for now)
const [, , apiParam, outParam] = process.argv;
const API_DIR =
  apiParam ?
    resolve(apiParam)
  : join(dirname(new URL(import.meta.url).pathname), "api");
const OUTPUT_PATH = outParam ? resolve(outParam) : undefined; // reserved for future use

console.log("Reading yaml files...");
const rootNamespace = walk(API_DIR);

console.log("Writing library definitions...");
await writeOutput(
  await renderAsync(
    <Output basePath={OUTPUT_PATH}>
      <NamespaceDirectory name="" fqn="" ns={rootNamespace} />
    </Output>,
  ),
);
