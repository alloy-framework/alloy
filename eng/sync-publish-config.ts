// Keeps each package's `publishConfig.exports`/`publishConfig.imports` in sync with
// its top-level `exports`/`imports`, with the `source` condition removed.
//
// The `source` condition points at TypeScript sources and is only used for local
// resolution (e.g. Vitest). It must not reach published consumers. pnpm replaces the
// top-level `exports`/`imports` with the `publishConfig` versions when packing, so the
// published manifest is the stripped one. This script generates those stripped copies
// so they never have to be hand-maintained.
//
// Usage:
//   node eng/sync-publish-config.ts           # write any out-of-sync package.json
//   node eng/sync-publish-config.ts --check    # exit non-zero if anything is stale
/* eslint-disable no-console */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "pathe";
import { repoRoot } from "./utils/constants.ts";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

interface PackageJson {
  [key: string]: Json | undefined;
  name?: string;
  private?: boolean;
  exports?: Json;
  imports?: Json;
  publishConfig?: JsonObject;
}

const packagesDir = join(repoRoot, "packages");
const check = process.argv.includes("--check");

function hasSourceCondition(node: Json | undefined): boolean {
  if (node && typeof node === "object" && !Array.isArray(node)) {
    if ("source" in node) return true;
    return Object.values(node).some(hasSourceCondition);
  }
  return false;
}

function stripSource(node: Json): Json {
  if (Array.isArray(node)) return node.map(stripSource);
  if (node && typeof node === "object") {
    const out: JsonObject = {};
    for (const [key, value] of Object.entries(node)) {
      if (key === "source") continue;
      out[key] = stripSource(value);
    }
    return out;
  }
  return node;
}

// Build the publishConfig a package should have, preserving any unrelated keys it
// already declares (e.g. `access`).
function expectedPublishConfig(pkg: PackageJson): JsonObject {
  const publishConfig: JsonObject = { ...(pkg.publishConfig ?? {}) };
  delete publishConfig.exports;
  delete publishConfig.imports;

  if (pkg.exports && hasSourceCondition(pkg.exports)) {
    publishConfig.exports = stripSource(pkg.exports);
  }
  if (pkg.imports && hasSourceCondition(pkg.imports)) {
    publishConfig.imports = stripSource(pkg.imports);
  }
  return publishConfig;
}

// Re-insert publishConfig right after imports/exports for readable diffs.
function withPublishConfig(
  pkg: PackageJson,
  publishConfig: JsonObject,
): PackageJson {
  if ("publishConfig" in pkg) {
    return { ...pkg, publishConfig };
  }
  const anchor = "imports" in pkg ? "imports" : "exports";
  const out: PackageJson = {};
  for (const key of Object.keys(pkg)) {
    out[key] = pkg[key];
    if (key === anchor) out.publishConfig = publishConfig;
  }
  return out;
}

const stale: string[] = [];

for (const entry of readdirSync(packagesDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const pkgPath = join(packagesDir, entry.name, "package.json");
  if (!existsSync(pkgPath)) continue;

  const pkg: PackageJson = JSON.parse(readFileSync(pkgPath, "utf8"));
  if (pkg.private) continue;
  if (!pkg.exports && !pkg.imports) continue;

  const publishConfig = expectedPublishConfig(pkg);
  const current = pkg.publishConfig ?? {};

  // Compare only the fields this script owns.
  const currentOwned = { exports: current.exports, imports: current.imports };
  const expectedOwned = {
    exports: publishConfig.exports,
    imports: publishConfig.imports,
  };
  if (JSON.stringify(currentOwned) === JSON.stringify(expectedOwned)) continue;

  stale.push(pkg.name ?? entry.name);
  if (check) continue;

  let next: PackageJson;
  if (Object.keys(publishConfig).length === 0) {
    const { publishConfig: _drop, ...rest } = pkg;
    next = rest;
  } else {
    next = withPublishConfig(pkg, publishConfig);
  }
  writeFileSync(pkgPath, JSON.stringify(next, null, 2) + "\n", "utf8");
  console.log(`Updated publishConfig for ${pkg.name ?? entry.name}`);
}

if (check && stale.length > 0) {
  console.error(
    `publishConfig is out of sync for: ${stale.join(", ")}\n` +
      `Run \`pnpm sync-publish-config\` to update.`,
  );
  process.exit(1);
}

if (!check) {
  console.log(
    stale.length === 0 ?
      "publishConfig already in sync."
    : `Synced publishConfig for ${stale.length} package(s).`,
  );
}
