/**
 * Generic crate descriptor generator for alloy-js/rust.
 *
 * Takes any rustdoc JSON and generates a per-module directory of TypeScript
 * files with crate descriptors compatible with `createCrate()`. Extracts
 * inherent methods as members with `associated` flag for :: vs . distinction.
 *
 * Usage:
 *   npx tsx scripts/generate-crate-descriptor.ts <rustdoc.json> [options]
 *
 * Options:
 *   --builtin              Mark as builtin (no Cargo.toml dependency)
 *   --prelude              Generate prelude.ts with edition-aware PRELUDE_TYPES
 *   --prelude-source PATH  Core rustdoc JSON for resolving edition prelude globs
 *   --merge-from PATH      Merge another crate's symbols (repeatable)
 *   --out PATH             Output directory (default: src/builtins/<crate>/)
 *   --skip MOD1,MOD2       Comma-separated modules to skip
 *
 * Examples:
 *   # Standard library crates
 *   npx tsx scripts/generate-crate-descriptor.ts core.json --builtin
 *   npx tsx scripts/generate-crate-descriptor.ts alloc.json --builtin
 *   npx tsx scripts/generate-crate-descriptor.ts std.json --builtin \
 *     --prelude --prelude-source core.json \
 *     --merge-from core.json --merge-from alloc.json
 *
 *   # Third-party crates
 *   npx tsx scripts/generate-crate-descriptor.ts target/doc/serde.json
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

interface CliArgs {
  jsonPath: string;
  builtin: boolean;
  prelude: boolean;
  preludeSource: string | null; // path to core.json for resolving edition prelude globs
  mergeFrom: string[]; // paths to other rustdoc JSONs to merge into this crate
  outPath: string | null;
  skipModules: Set<string>;
}

function parseArgs(): CliArgs {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0] === "--help") {
    console.error(
      "Usage: npx tsx generate-crate-descriptor.ts <rustdoc.json> [--builtin] [--prelude] [--prelude-source <path>] [--merge-from <path>] [--out <dir>] [--skip <mods>]",
    );
    process.exit(args[0] === "--help" ? 0 : 1);
  }

  const result: CliArgs = {
    jsonPath: "",
    builtin: false,
    prelude: false,
    preludeSource: null,
    mergeFrom: [],
    outPath: null,
    skipModules: new Set(),
  };

  let i = 0;
  while (i < args.length) {
    const arg = args[i];
    if (arg === "--builtin") {
      result.builtin = true;
    } else if (arg === "--prelude") {
      result.prelude = true;
    } else if (arg === "--merge-from" && i + 1 < args.length) {
      result.mergeFrom.push(args[++i]);
    } else if (arg === "--prelude-source" && i + 1 < args.length) {
      result.preludeSource = args[++i];
    } else if (arg === "--out" && i + 1 < args.length) {
      result.outPath = args[++i];
    } else if (arg === "--skip" && i + 1 < args.length) {
      for (const mod of args[++i].split(",")) {
        result.skipModules.add(mod.trim());
      }
    } else if (!arg.startsWith("--")) {
      result.jsonPath = arg;
    } else {
      console.error(`Unknown option: ${arg}`);
      process.exit(1);
    }
    i++;
  }

  if (!result.jsonPath) {
    console.error("Error: rustdoc JSON path is required");
    process.exit(1);
  }

  return result;
}

// ---------------------------------------------------------------------------
// Default skip list for standard library crates
// ---------------------------------------------------------------------------

const DEFAULT_STD_SKIP = new Set([
  "os",
  "simd",
  "arch",
  "autodiff",
  "bstr",
  "prelude",
  "f16",
  "f128",
  "intrinsics",
  "field",
  "hint",
  "unsafe_binder",
  "from",
  "async_iter",
  "primitive",
  "index", // nightly (core::ops::index re-export), collides with index.ts
]);

// ---------------------------------------------------------------------------
// Accepted item kinds for the crate descriptor
// ---------------------------------------------------------------------------

const ACCEPTED_KINDS = new Set([
  "struct",
  "enum",
  "trait",
  "function",
  "type_alias",
  "constant",
  "macro",
]);

// ---------------------------------------------------------------------------
// Rustdoc JSON types
// ---------------------------------------------------------------------------

interface RustdocJson {
  format_version: number;
  root: string;
  crate_version: string | null;
  index: Record<string, RustdocItem>;
  paths: Record<string, { crate_id: number; path: string[]; kind: string }>;
  external_crates: Record<string, { name: string }>;
}

interface RustdocItem {
  id: number;
  crate_id: number;
  name: string | null;
  visibility: string;
  docs: string | null;
  attrs: Array<string | { other: string }>;
  inner: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Stability extraction
// ---------------------------------------------------------------------------

const STABILITY_RE =
  /Stable\s*\{\s*since:\s*Version\(RustcVersion\s*\{\s*major:\s*(\d+),\s*minor:\s*(\d+),\s*patch:\s*(\d+)\s*\}\)/;

function extractStability(item: RustdocItem): string | undefined {
  if (!item.attrs) return undefined;
  for (const attr of item.attrs) {
    const text = typeof attr === "string" ? attr : attr.other ?? "";
    const match = STABILITY_RE.exec(text);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}`;
    }
    // Check for unstable
    if (text.includes("Unstable")) {
      return "unstable";
    }
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Kind mapping
// ---------------------------------------------------------------------------

/** Maps rustdoc item kinds to RustSymbolKind values. */
function mapKind(rustdocKind: string): string {
  switch (rustdocKind) {
    case "struct":
      return "struct";
    case "enum":
      return "enum";
    case "trait":
      return "trait";
    case "function":
      return "function";
    case "type_alias":
      return "type-alias";
    case "constant":
      return "const";
    case "macro":
      return "symbol";
    default:
      return "struct";
  }
}

// ---------------------------------------------------------------------------
// Core generation logic
// ---------------------------------------------------------------------------

interface MemberEntry {
  name: string;
  kind: string;
  associated?: boolean;
  since?: string;
}

interface SymbolEntry {
  name: string;
  kind: string;
  since?: string;
  members?: MemberEntry[];
  /** Rustdoc item ID, used for extracting members after walk */
  itemId?: string;
}

interface GeneratorState {
  data: RustdocJson;
  modules: Map<string, SymbolEntry[]>;
  skipModules: Set<string>;
}

function createGeneratorState(
  data: RustdocJson,
  skipModules: Set<string>,
): GeneratorState {
  return { data, modules: new Map(), skipModules };
}

function addSymbol(
  state: GeneratorState,
  modulePath: string,
  name: string,
  kind: string,
  since?: string,
  itemId?: string,
) {
  let syms = state.modules.get(modulePath);
  if (!syms) {
    syms = [];
    state.modules.set(modulePath, syms);
  }
  if (!syms.some((s) => s.name === name)) {
    syms.push({ name, kind, since, itemId });
  }
}

function isSkipped(state: GeneratorState, path: string): boolean {
  if (!path) return false;
  const topLevel = path.split("::")[0];
  return state.skipModules.has(topLevel);
}

function getItemKind(item: RustdocItem): string | null {
  if (!item.inner) return null;
  const keys = Object.keys(item.inner);
  return keys.length > 0 ? keys[0] : null;
}

function walkModule(
  state: GeneratorState,
  moduleItem: RustdocItem,
  modulePath: string,
) {
  if (isSkipped(state, modulePath)) return;

  const inner = moduleItem.inner?.module as { items: string[] } | undefined;
  if (!inner) return;

  for (const childId of inner.items || []) {
    const child = state.data.index[childId];
    if (!child || child.visibility !== "public") continue;

    const kind = getItemKind(child);
    if (!kind || !child.name) {
      if (kind === "use") handleUseItem(state, child, modulePath);
      continue;
    }

    if (kind === "module") {
      const childPath = modulePath
        ? `${modulePath}::${child.name}`
        : child.name;
      walkModule(state, child, childPath);
    } else if (kind === "use") {
      handleUseItem(state, child, modulePath);
    } else if (ACCEPTED_KINDS.has(kind)) {
      const since = extractStability(child);
      addSymbol(state, modulePath, child.name, mapKind(kind), since, String(childId));
    }
  }
}

function handleUseItem(
  state: GeneratorState,
  item: RustdocItem,
  modulePath: string,
) {
  const useInner = item.inner?.use as
    | { source: string; name: string | null; id: string; is_glob: boolean }
    | undefined;
  if (!useInner || useInner.is_glob) return;

  const name = useInner.name || item.name;
  if (!name) return;

  let kind: string | null = null;
  const target = state.data.index[useInner.id];
  if (target) kind = getItemKind(target);

  if (!kind) {
    const pathInfo = state.data.paths[useInner.id];
    if (
      pathInfo &&
      (pathInfo.kind === "module" || ACCEPTED_KINDS.has(pathInfo.kind))
    ) {
      kind = pathInfo.kind;
    }
  }

  if (kind && (kind === "module" || ACCEPTED_KINDS.has(kind))) {
    if (kind === "module") {
      const childPath = modulePath ? `${modulePath}::${name}` : name;
      if (target) {
        walkModule(state, target, childPath);
      } else {
        walkExternalModule(state, useInner.id, childPath);
      }
    } else {
      const since = target ? extractStability(target) : undefined;
      addSymbol(state, modulePath, name, mapKind(kind), since, String(useInner.id));
    }
  }
}

function walkExternalModule(
  state: GeneratorState,
  modulePathId: string,
  targetModulePath: string,
) {
  if (isSkipped(state, targetModulePath)) return;

  const modulePath = state.data.paths[modulePathId];
  if (!modulePath) return;

  const modSuffix = modulePath.path.slice(1).join("::");
  if (!modSuffix) return;

  // Scan all crate prefixes — the re-exporting crate exposes everything
  const prefixes = new Set<string>();
  prefixes.add(modulePath.path.join("::"));
  for (const [, crate] of Object.entries(state.data.external_crates)) {
    prefixes.add(`${crate.name}::${modSuffix}`);
  }
  // Also check the crate's own name
  const root = state.data.index[state.data.root];
  if (root?.name) prefixes.add(`${root.name}::${modSuffix}`);

  for (const [, pathInfo] of Object.entries(state.data.paths)) {
    if (pathInfo.kind === "module" || pathInfo.kind === "primitive") continue;
    if (!ACCEPTED_KINDS.has(pathInfo.kind)) continue;

    const fullPath = pathInfo.path.join("::");
    for (const prefix of prefixes) {
      if (!fullPath.startsWith(prefix + "::")) continue;
      const remainder = fullPath.substring(prefix.length + 2);
      if (remainder.includes("::")) continue;
      addSymbol(state, targetModulePath, remainder, mapKind(pathInfo.kind));
      break;
    }
  }
}

// ---------------------------------------------------------------------------
// Prelude extraction
// ---------------------------------------------------------------------------

interface PreludeSet {
  edition: string;
  types: Set<string>;
}

const PRELUDE_USE_SUPPRESS_KINDS = new Set([
  "struct",
  "enum",
  "trait",
  "variant",
  "type_alias",
]);

const PRIMITIVES = [
  "bool", "char", "f32", "f64",
  "i8", "i16", "i32", "i64", "i128", "isize",
  "u8", "u16", "u32", "u64", "u128", "usize", "str",
];

function findChildModule(
  data: RustdocJson,
  parentItem: RustdocItem,
  name: string,
): RustdocItem | null {
  const items =
    (parentItem.inner?.module as { items: string[] } | undefined)?.items || [];
  for (const id of items) {
    const item = data.index[id];
    if (item && item.name === name) return item;
  }
  return null;
}

function extractPreludeTypes(
  data: RustdocJson,
  moduleItem: RustdocItem,
): Set<string> {
  const types = new Set<string>();
  const items =
    (moduleItem.inner?.module as { items: string[] } | undefined)?.items || [];

  for (const childId of items) {
    const child = data.index[childId];
    if (!child || child.visibility !== "public") continue;
    if (getItemKind(child) !== "use") continue;

    const useInner = child.inner?.use as
      | { name: string | null; id: string; is_glob: boolean }
      | undefined;
    if (!useInner || useInner.is_glob) continue;

    const name = useInner.name || child.name;
    if (!name) continue;

    let targetKind: string | null = null;
    const target = data.index[useInner.id];
    if (target) targetKind = getItemKind(target);
    if (!targetKind) {
      const pathInfo = data.paths[useInner.id];
      if (pathInfo) targetKind = pathInfo.kind;
    }

    if (targetKind && PRELUDE_USE_SUPPRESS_KINDS.has(targetKind)) {
      types.add(name);
    }
  }

  return types;
}

function extractPrelude(
  data: RustdocJson,
  preludeModule: RustdocItem,
  coreData: RustdocJson | null,
): PreludeSet[] {
  const results: PreludeSet[] = [];

  // Extract v1 (base) prelude
  const v1Module = findChildModule(data, preludeModule, "v1");
  if (v1Module) {
    const types = extractPreludeTypes(data, v1Module);
    if (types.size > 0) results.push({ edition: "v1", types });
  }

  // For edition-specific preludes, the items are glob re-exports
  // of core::prelude::rust_XXXX. We need core's rustdoc to resolve them.
  const corePreludeModule = coreData
    ? findChildModule(coreData, coreData.index[coreData.root], "prelude")
    : null;

  for (const editionName of ["rust_2015", "rust_2018", "rust_2021", "rust_2024"]) {
    const edition = editionName.replace("rust_", "");

    // Start with v1 types as base
    const v1Types = results.find((r) => r.edition === "v1")?.types;
    const types = new Set<string>(v1Types);

    // Add edition-specific types from core's prelude if available
    if (corePreludeModule) {
      const coreEditionModule = findChildModule(
        coreData!,
        corePreludeModule,
        editionName,
      );
      if (coreEditionModule) {
        const editionTypes = extractPreludeTypes(coreData!, coreEditionModule);
        for (const t of editionTypes) types.add(t);
      }
    }

    // Also check non-glob use items in std's edition module
    const stdEditionModule = findChildModule(data, preludeModule, editionName);
    if (stdEditionModule) {
      const stdTypes = extractPreludeTypes(data, stdEditionModule);
      for (const t of stdTypes) types.add(t);
    }

    results.push({ edition, types });
  }

  return results;
}

// ---------------------------------------------------------------------------
// Code generation
// ---------------------------------------------------------------------------

function generatePreludeFile(
  formatVersion: number,
  preludeSets: PreludeSet[],
): string {
  const lines: string[] = [];
  lines.push(`// Generated by scripts/generate-crate-descriptor.ts`);
  lines.push(`// Source: rustdoc JSON format version ${formatVersion}`);
  lines.push(``);

  // Build a combined set from all editions, plus primitives
  const allTypes = new Set<string>(PRIMITIVES);
  for (const ps of preludeSets) {
    for (const t of ps.types) allTypes.add(t);
  }

  lines.push(`/**`);
  lines.push(
    ` * Types, traits, enum variants, and primitives that are automatically in scope`,
  );
  lines.push(
    ` * via the Rust prelude. References to these do not need \`use\` statements.`,
  );
  lines.push(` *`);
  lines.push(
    ` * This is the union of all edition preludes (2015–2024) plus primitive types.`,
  );
  lines.push(` */`);
  lines.push(`export const PRELUDE_TYPES = new Set<string>([`);
  for (const name of [...allTypes].sort()) {
    lines.push(`  "${name}",`);
  }
  lines.push(`]);`);
  lines.push(``);

  // Per-edition sets
  for (const ps of preludeSets) {
    if (ps.edition === "v1") continue; // v1 is the legacy name, skip
    const varName = `PRELUDE_TYPES_${ps.edition}`;
    lines.push(`/** Prelude types for the ${ps.edition} edition. */`);
    lines.push(`export const ${varName} = new Set<string>([`);
    for (const name of [...ps.types].sort()) {
      lines.push(`  "${name}",`);
    }
    // Add primitives to each edition set too
    for (const p of PRIMITIVES.sort()) {
      lines.push(`  "${p}",`);
    }
    lines.push(`]);`);
    lines.push(``);
  }

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

const JS_RESERVED = new Set([
  "abstract", "arguments", "await", "boolean", "break", "byte", "case", "catch",
  "char", "class", "const", "continue", "debugger", "default", "delete", "do",
  "double", "else", "enum", "eval", "export", "extends", "false", "final",
  "finally", "float", "for", "function", "goto", "if", "implements", "import",
  "in", "instanceof", "int", "interface", "let", "long", "native", "new",
  "null", "package", "private", "protected", "public", "return", "short",
  "static", "super", "switch", "synchronized", "this", "throw", "throws",
  "transient", "true", "try", "typeof", "undefined", "var", "void",
  "volatile", "while", "with", "yield",
]);

function sanitizeIdentifier(name: string): string {
  const cleaned = name.replace(/-/g, "_");
  if (JS_RESERVED.has(cleaned)) return `${cleaned}_`;
  return cleaned;
}

function pascalCase(name: string): string {
  return name
    .split(/[-_]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const cli = parseArgs();

const data: RustdocJson = JSON.parse(
  readFileSync(resolve(cli.jsonPath), "utf-8"),
);

// Extract crate name from the root module
const root = data.index[data.root];
if (!root) {
  console.error("Could not find root module in index");
  process.exit(1);
}

const crateName = root.name ?? "unknown";
const crateVersion = data.crate_version;

console.log(`Crate: ${crateName} ${crateVersion ?? "(no version)"}`);
console.log(`Rustdoc JSON format version: ${data.format_version}`);
console.log(`Index items: ${Object.keys(data.index).length}`);
console.log(`Builtin: ${cli.builtin}`);

// Merge skip modules: CLI-provided + defaults for std-family crates
const skipModules = new Set(cli.skipModules);
if (["std", "core", "alloc"].includes(crateName)) {
  for (const m of DEFAULT_STD_SKIP) skipModules.add(m);
}

// Walk the module tree
const state = createGeneratorState(data, skipModules);
walkModule(state, root, "");

// For std-like crates, also walk the prelude to pick up re-exports
const preludeModule = findChildModule(data, root, "prelude");
if (preludeModule && crateName === "std") {
  // Walk v1 prelude to pick up types for the crate descriptor
  const v1Module = findChildModule(data, preludeModule, "v1");
  if (v1Module) {
    const v1Items =
      (v1Module.inner?.module as { items: string[] } | undefined)?.items || [];

    for (const childId of v1Items) {
      const child = data.index[childId];
      if (!child || child.visibility !== "public") continue;
      if (getItemKind(child) !== "use") continue;

      const useInner = child.inner?.use as
        | { source: string; name: string | null; id: string; is_glob: boolean }
        | undefined;
      if (!useInner || useInner.is_glob) continue;

      const name = useInner.name || child.name;
      if (!name) continue;

      let targetKind: string | null = null;
      const target = data.index[useInner.id];
      if (target) targetKind = getItemKind(target);
      if (!targetKind) {
        const pathInfo = data.paths[useInner.id];
        if (pathInfo) targetKind = pathInfo.kind;
      }
      if (!targetKind || !ACCEPTED_KINDS.has(targetKind)) continue;

      // Map to canonical module using paths table
      const pathInfo = data.paths[String(useInner.id)];
      if (!pathInfo) continue;

      // For prelude items, determine the std module they belong to
      // by checking what module they're re-exported from
      const sourcePath = pathInfo.path;
      const typeName = sourcePath[sourcePath.length - 1];

      // Find which module in our descriptor already has this type
      let placed = false;
      for (const [modPath, syms] of state.modules) {
        if (syms.some((s) => s.name === typeName)) {
          placed = true;
          break;
        }
      }

      // If not already placed, add to root module
      if (!placed) {
        const since = target ? extractStability(target) : undefined;
        addSymbol(state, "", name, mapKind(targetKind), since);
      }
    }

    console.log("Prelude v1 items processed");
  }
}

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Extract inherent methods from impl blocks
// ---------------------------------------------------------------------------

const MEMBER_KINDS = new Set(["struct", "enum", "trait"]);

function extractMembers(genState: GeneratorState) {
  let totalMembers = 0;

  for (const [, symbols] of genState.modules) {
    for (const sym of symbols) {
      if (!sym.itemId || !MEMBER_KINDS.has(sym.kind)) continue;

      const item = genState.data.index[sym.itemId];
      if (!item) continue;

      const inner = item.inner?.[sym.kind === "type-alias" ? "type_alias" : sym.kind] as
        | { impls?: string[] }
        | undefined;
      if (!inner?.impls) continue;

      const members: MemberEntry[] = [];

      for (const implId of inner.impls) {
        const impl = genState.data.index[implId];
        if (!impl?.inner?.impl) continue;
        const implInner = impl.inner.impl as {
          trait?: unknown;
          items?: string[];
        };

        // Only inherent impls (no trait impls)
        if (implInner.trait) continue;

        for (const methodId of implInner.items || []) {
          const method = genState.data.index[methodId];
          if (!method || method.visibility !== "public" || !method.name) continue;

          const methodKind = getItemKind(method);
          if (methodKind !== "function") continue;

          const sig = (method.inner?.function as { sig?: { inputs?: [string, unknown][] } })?.sig;
          const hasSelfReceiver = sig?.inputs?.some(
            ([name]) => name === "self",
          );

          if (!members.some((m) => m.name === method.name)) {
            members.push({
              name: method.name!,
              kind: "function",
              associated: hasSelfReceiver ? undefined : true,
              since: extractStability(method),
            });
          }
        }
      }

      if (members.length > 0) {
        members.sort((a, b) => a.name.localeCompare(b.name));
        sym.members = members;
        totalMembers += members.length;
      }
    }
  }

  console.log(`Extracted ${totalMembers} inherent methods`);
}

// ---------------------------------------------------------------------------
// Merge modules from other crates (--merge-from)
// ---------------------------------------------------------------------------
// Used for crates that re-export from dependencies (e.g., std re-exports
// core and alloc). We walk each source crate's rustdoc and merge its
// modules into our state, so the output includes the full re-exported API.

for (const mergePath of cli.mergeFrom) {
  const mergeData: RustdocJson = JSON.parse(
    readFileSync(resolve(mergePath), "utf-8"),
  );
  const mergeRoot = mergeData.index[mergeData.root];
  if (!mergeRoot) continue;

  const mergeName = mergeRoot.name ?? "unknown";
  const mergeState = createGeneratorState(mergeData, skipModules);
  walkModule(mergeState, mergeRoot, "");

  // Extract members in the merge state BEFORE merging (uses merge data's index)
  extractMembers(mergeState);

  // Merge into main state: for each module in the source crate,
  // add its symbols (with members) to the corresponding module in our state
  let mergedCount = 0;
  for (const [modulePath, symbols] of mergeState.modules) {
    for (const sym of symbols) {
      // Add the symbol — if it already exists, skip (deduplication in addSymbol)
      addSymbol(state, modulePath, sym.name, sym.kind, sym.since, sym.itemId);
      // If the merged symbol has members and the main state's copy doesn't, transfer them
      if (sym.members) {
        let mainSyms = state.modules.get(modulePath);
        if (mainSyms) {
          const mainSym = mainSyms.find((s) => s.name === sym.name);
          if (mainSym && !mainSym.members) {
            mainSym.members = sym.members;
          }
        }
      }
      mergedCount++;
    }
  }

  console.log(`Merged ${mergedCount} symbols from ${mergeName}`);
}

extractMembers(state);

// Sort and print summary
const sortedModules = [...state.modules.entries()].sort(([a], [b]) =>
  a.localeCompare(b),
);
let totalSymbols = 0;
for (const [mod, syms] of sortedModules) {
  syms.sort((a, b) => a.name.localeCompare(b.name));
  totalSymbols += syms.length;
}
console.log(`\nModules: ${sortedModules.length}, Symbols: ${totalSymbols}`);

for (const [mod, syms] of sortedModules) {
  const names = syms.map((s) => s.name);
  const display =
    names.length > 8
      ? `${names.slice(0, 8).join(", ")}, ... +${names.length - 8}`
      : names.join(", ");
  console.log(`  ${mod || "(root)"} [${syms.length}]: ${display}`);
}

// ---------------------------------------------------------------------------
// Write output — per-module directory structure
// ---------------------------------------------------------------------------

import { mkdirSync } from "node:fs";

const scriptDir = dirname(new URL(import.meta.url).pathname);
const defaultOutDir = join(scriptDir, "..", "src", "builtins", crateName);
const outDir = cli.outPath ? resolve(cli.outPath) : defaultOutDir;
mkdirSync(outDir, { recursive: true });

// Generate a file per top-level module
const topLevelModules = new Map<string, [string, SymbolEntry[]][]>();
for (const [modulePath, symbols] of sortedModules) {
  const topLevel = modulePath === "" ? "root" : modulePath.split("::")[0];
  if (!topLevelModules.has(topLevel)) {
    topLevelModules.set(topLevel, []);
  }
  topLevelModules.get(topLevel)!.push([modulePath, symbols]);
}

function generateModuleFile(
  moduleEntries: [string, SymbolEntry[]][],
  formatVersion: number,
): string {
  const lines: string[] = [];
  lines.push(`import type { SymbolDescriptor } from "../../create-crate.js";`);
  lines.push(``);
  lines.push(`// Generated by scripts/generate-crate-descriptor.ts`);
  lines.push(`// Source: rustdoc JSON format version ${formatVersion}`);
  lines.push(``);

  for (const [modulePath, symbols] of moduleEntries) {
    const varName = modulePath === ""
      ? "mod_root"
      : "mod_" + sanitizeIdentifier(modulePath.replace(/::/g, "_"));

    lines.push(
      `export const ${varName} = {`,
    );
    for (const sym of symbols) {
      if (sym.members && sym.members.length > 0) {
        const meta = sym.since ? `, metadata: { since: "${sym.since}" }` : "";
        lines.push(`  ${sym.name}: {`);
        lines.push(`    kind: "${sym.kind}"${meta},`);
        lines.push(`    members: {`);
        for (const m of sym.members) {
          const mAssoc = m.associated ? ", associated: true" : "";
          const mMeta = m.since ? `, metadata: { since: "${m.since}" }` : "";
          lines.push(`      ${m.name}: { kind: "${m.kind}"${mAssoc}${mMeta} },`);
        }
        lines.push(`    },`);
        lines.push(`  },`);
      } else {
        if (sym.since) {
          lines.push(
            `  ${sym.name}: { kind: "${sym.kind}", metadata: { since: "${sym.since}" } },`,
          );
        } else {
          lines.push(`  ${sym.name}: { kind: "${sym.kind}" },`);
        }
      }
    }
    lines.push(
      `} as const satisfies Record<string, SymbolDescriptor>;`,
    );
    lines.push(``);
  }

  return lines.join("\n");
}

// Write module files
const moduleFileNames: { varName: string; fileName: string; modulePath: string }[] = [];

for (const [topLevel, entries] of [...topLevelModules.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  const fileName = `${topLevel}.ts`;
  const filePath = join(outDir, fileName);
  const source = generateModuleFile(entries, data.format_version);
  writeFileSync(filePath, source);

  // Track for the index file — variable names are prefixed with mod_ to avoid
  // collisions with the crate export name and JS reserved words
  for (const [modulePath] of entries) {
    const varName = modulePath === ""
      ? "mod_root"
      : "mod_" + sanitizeIdentifier(modulePath.replace(/::/g, "_"));
    moduleFileNames.push({ varName, fileName, modulePath });
  }
}

// Write crate index file
{
  const lines: string[] = [];
  lines.push(`import { type SymbolCreator } from "@alloy-js/core";`);
  lines.push(`import {`);
  lines.push(`  type CrateDescriptor,`);
  lines.push(`  type CrateRef,`);
  lines.push(`  createCrate,`);
  lines.push(`  type ExternalCrate,`);
  lines.push(`} from "../../create-crate.js";`);

  // Import each module
  const importsByFile = new Map<string, string[]>();
  for (const { varName, fileName } of moduleFileNames) {
    if (!importsByFile.has(fileName)) importsByFile.set(fileName, []);
    importsByFile.get(fileName)!.push(varName);
  }
  for (const [fileName, vars] of [...importsByFile.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const jsName = fileName.replace(".ts", ".js");
    lines.push(`import { ${vars.join(", ")} } from "./${jsName}";`);
  }

  lines.push(``);
  lines.push(`// Generated by scripts/generate-crate-descriptor.ts`);
  lines.push(`// Source: rustdoc JSON format version ${data.format_version}`);
  lines.push(``);

  const descriptorName = `${sanitizeIdentifier(crateName)}Descriptor`;
  const typeName = `${pascalCase(crateName)}Crate`;

  lines.push(`const ${descriptorName} = {`);
  lines.push(`  name: "${crateName}",`);
  if (crateVersion && crateVersion !== "0.0.0") {
    lines.push(`  version: "${crateVersion}",`);
  }
  if (cli.builtin) {
    lines.push(`  builtin: true,`);
  }
  lines.push(`  modules: {`);

  for (const { varName, modulePath } of moduleFileNames) {
    const key = modulePath === "" ? '""' : `"${modulePath}"`;
    lines.push(`    ${key}: ${varName},`);
  }

  lines.push(`  },`);
  lines.push(`} as const satisfies CrateDescriptor;`);
  lines.push(``);
  lines.push(`/**`);
  lines.push(` * The \`${crateName}\` crate descriptor.`);
  lines.push(` */`);
  lines.push(`export type ${typeName} = CrateRef<typeof ${descriptorName}> &`);
  lines.push(`  SymbolCreator &`);
  lines.push(`  ExternalCrate;`);
  lines.push(`export const ${sanitizeIdentifier(crateName)}: ${typeName} = createCrate(${descriptorName});`);
  lines.push(``);

  writeFileSync(join(outDir, "index.ts"), lines.join("\n"));
}

console.log(`\nWrote ${outDir}/ (${topLevelModules.size} module files + index.ts)`);

// Write prelude if requested
if (cli.prelude && preludeModule) {
  const coreData: RustdocJson | null = cli.preludeSource
    ? JSON.parse(readFileSync(resolve(cli.preludeSource), "utf-8"))
    : null;
  const preludeSets = extractPrelude(data, preludeModule, coreData);
  const preludeSource = generatePreludeFile(data.format_version, preludeSets);
  // Write prelude one level up (alongside the crate directory)
  const preludePath = join(outDir, "..", "prelude.ts");
  writeFileSync(preludePath, preludeSource);
  console.log(`Wrote ${preludePath}`);

  for (const ps of preludeSets) {
    console.log(`  Prelude ${ps.edition}: ${ps.types.size} types`);
  }
}
