#!/usr/bin/env node

import { copyFile, mkdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcFile = join(__dirname, "../../devtools/dist/index.html");
const destFile = join(__dirname, "../dist/devtools/index.html");

async function copyDevtoolsUi() {
  try {
    await mkdir(dirname(destFile), { recursive: true });
    await copyFile(srcFile, destFile);
    // eslint-disable-next-line no-console
    console.log("Copied devtools UI to core dist");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to copy devtools UI:", error);
    process.exit(1);
  }
}

void copyDevtoolsUi();
