#!/usr/bin/env node
import fs from "fs";
import path from "path";

// Resolve the path to your package.json
const pkgPath = path.resolve(process.cwd(), "./package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

// Recursively remove "source" keys from exports
function removeSourceExports(exportsField) {
  if (exportsField && typeof exportsField === "object") {
    if ("source" in exportsField) {
      delete exportsField.source;
    }
    // Recursively handle nested export objects
    for (const key of Object.keys(exportsField)) {
      removeSourceExports(exportsField[key]);
    }
  }
}

if (pkg.exports) {
  removeSourceExports(pkg.exports);
}

if (pkg.imports) {
  removeSourceExports(pkg.imports);
}

// Write the modified package.json back
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
console.log("Stripped source exports from package.json.");
