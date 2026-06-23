/**
 * Audit script: compares TypeSpec standard library definitions against
 * our builtins in @alloy-js/typespec to find missing or extra entries.
 *
 * Installs all TypeSpec packages in a temporary workspace, parses their
 * .tsp files, groups symbols by namespace, and compares against our
 * builtin definitions in src/builtins/<Namespace>/.
 *
 * Usage: npx tsx packages/typespec/scripts/audit-builtins.ts
 *
 * Exit code 0 = in sync, 1 = differences found.
 */
import { execSync } from "child_process";
import {
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "fs";
import { tmpdir } from "os";
import { join, resolve } from "path";

// ── TypeSpec packages to install and scan ─────────────────────────────

const TYPESPEC_PACKAGES = [
  "@typespec/compiler",
  "@typespec/http",
  "@typespec/rest",
  "@typespec/openapi",
  "@typespec/openapi3",
  "@typespec/versioning",
];

// Namespaces to skip (internal / not useful as builtins)
const SKIP_NAMESPACES = new Set([
  "Private",
  "TypeSpec.Prototypes",
  "TypeSpec.Prototypes.Types",
  "TypeSpec.Http.Private",
]);

// ── Symbol extraction ─────────────────────────────────────────────────

function findTspFiles(dir: string): string[] {
  const results: string[] = [];
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findTspFiles(fullPath));
    } else if (entry.name.endsWith(".tsp")) {
      results.push(fullPath);
    }
  }
  return results;
}

interface NamespaceSymbols {
  scalars: string[];
  models: string[];
  enums: string[];
  decorators: string[];
  unions: string[];
}

function empty(): NamespaceSymbols {
  return { scalars: [], models: [], enums: [], decorators: [], unions: [] };
}

/**
 * Parse a .tsp file and return a map of namespace -> symbols.
 * Handles file-level `namespace X;` and block-level `namespace X { }`.
 */
function extractByNamespace(tspContent: string): Map<string, NamespaceSymbols> {
  const result = new Map<string, NamespaceSymbols>();
  let currentNs = "";

  for (const line of tspContent.split("\n")) {
    const trimmed = line.trim();
    let m: RegExpMatchArray | null;

    // Track namespace (file-level `namespace X;` or block `namespace X {`)
    if ((m = trimmed.match(/^namespace\s+([\w.]+)/))) {
      currentNs = m[1];
      if (!result.has(currentNs)) {
        result.set(currentNs, empty());
      }
      continue;
    }

    if (!currentNs) continue;
    const symbols = result.get(currentNs)!;

    if ((m = trimmed.match(/^scalar\s+(\w+)/))) {
      symbols.scalars.push(m[1]);
    } else if ((m = trimmed.match(/^model\s+(\w+)/))) {
      symbols.models.push(m[1]);
    } else if ((m = trimmed.match(/^enum\s+(\w+)/))) {
      symbols.enums.push(m[1]);
    } else if ((m = trimmed.match(/^extern\s+dec\s+(\w+)/))) {
      symbols.decorators.push(m[1]);
    } else if ((m = trimmed.match(/^union\s+(\w+)/))) {
      symbols.unions.push(m[1]);
    }
  }

  return result;
}

function merge(a: NamespaceSymbols, b: NamespaceSymbols): NamespaceSymbols {
  return {
    scalars: [...a.scalars, ...b.scalars],
    models: [...a.models, ...b.models],
    enums: [...a.enums, ...b.enums],
    decorators: [...a.decorators, ...b.decorators],
    unions: [...a.unions, ...b.unions],
  };
}

function dedup(s: NamespaceSymbols): NamespaceSymbols {
  return {
    scalars: [...new Set(s.scalars)].sort(),
    models: [...new Set(s.models)].sort(),
    enums: [...new Set(s.enums)].sort(),
    decorators: [...new Set(s.decorators)].sort(),
    unions: [...new Set(s.unions)].sort(),
  };
}

// ── Load our builtins from source ─────────────────────────────────────

function extractBuiltinKeys(content: string): Map<string, string> {
  const entries = new Map<string, string>();
  // Match top-level entries: `  name: { kind: "type" ...` where kind may be
  // on the same line or the next line after the opening brace.
  const regex = /^[ \t]+(\w+):\s*\{\s*\n?\s*kind:\s*"(\w[\w-]*)"/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    entries.set(match[1], match[2]);
  }
  return entries;
}

function loadOurBuiltins(builtinDir: string): NamespaceSymbols | null {
  if (!existsSync(builtinDir)) return null;

  const scalars: string[] = [];
  const models: string[] = [];
  const enums: string[] = [];
  const unions: string[] = [];
  const decorators: string[] = [];

  // Load decorators file
  const decoratorsPath = resolve(builtinDir, "decorators.ts");
  if (existsSync(decoratorsPath)) {
    const content = readFileSync(decoratorsPath, "utf-8");
    for (const name of extractBuiltinKeys(content).keys()) {
      decorators.push(name);
    }
  }

  // Load data-types file
  const dataTypesPath = resolve(builtinDir, "data-types.ts");
  if (existsSync(dataTypesPath)) {
    for (const [name, kind] of extractBuiltinKeys(
      readFileSync(dataTypesPath, "utf-8"),
    )) {
      switch (kind) {
        case "scalar":
          scalars.push(name);
          break;
        case "model":
          models.push(name);
          break;
        case "enum":
          enums.push(name);
          break;
        case "union":
          unions.push(name);
          break;
      }
    }
  }

  return { scalars, models, enums, decorators, unions };
}

// ── Diff ──────────────────────────────────────────────────────────────

interface Diff {
  category: string;
  missing: string[];
  extra: string[];
}

function diff(category: string, stdlib: string[], ours: string[]): Diff {
  const stdlibSet = new Set(stdlib);
  const oursSet = new Set(ours);
  return {
    category,
    missing: stdlib.filter((s) => !oursSet.has(s)),
    extra: ours.filter((s) => !stdlibSet.has(s)).sort(),
  };
}

// ── Main ──────────────────────────────────────────────────────────────

const builtinsRoot = resolve(import.meta.dirname!, "../src/builtins");

console.log("Setting up temporary workspace...");
const tempDir = mkdtempSync(join(tmpdir(), "tsp-audit-"));

try {
  writeFileSync(
    join(tempDir, "package.json"),
    JSON.stringify({
      name: "tsp-audit",
      private: true,
      dependencies: Object.fromEntries(
        TYPESPEC_PACKAGES.map((pkg) => [pkg, "latest"]),
      ),
    }),
  );

  console.log("Installing TypeSpec packages...");
  execSync("npm install --quiet 2>&1", { cwd: tempDir, stdio: "pipe" });

  // Collect symbols from all packages, grouped by namespace
  const allNamespaces = new Map<string, NamespaceSymbols>();
  const packageVersions = new Map<string, string>();

  for (const pkg of TYPESPEC_PACKAGES) {
    const pkgDir = join(tempDir, "node_modules", pkg);
    if (!existsSync(pkgDir)) {
      console.log(`⚠️  ${pkg} — not installed, skipping`);
      continue;
    }

    const version = JSON.parse(
      readFileSync(join(pkgDir, "package.json"), "utf-8"),
    ).version;
    packageVersions.set(pkg, version);

    const libDir = join(pkgDir, "lib");
    if (!existsSync(libDir)) continue;

    const tspFiles = findTspFiles(libDir);
    for (const file of tspFiles) {
      const content = readFileSync(file, "utf-8");
      const byNs = extractByNamespace(content);
      for (const [ns, symbols] of byNs) {
        const existing = allNamespaces.get(ns) ?? empty();
        allNamespaces.set(ns, merge(existing, symbols));
      }
    }
  }

  // Dedup and sort
  for (const [ns, symbols] of allNamespaces) {
    allNamespaces.set(ns, dedup(symbols));
  }

  // Report
  console.log();
  console.log("TypeSpec Builtins Audit");
  console.log("======================");
  console.log("Packages:");
  for (const [pkg, version] of packageVersions) {
    console.log(`  ${pkg}@${version}`);
  }

  let totalMissing = 0;
  let totalExtra = 0;
  let hasIssues = false;

  const sortedNamespaces = [...allNamespaces.keys()].sort();

  for (const ns of sortedNamespaces) {
    if (SKIP_NAMESPACES.has(ns)) continue;

    const stdlibSymbols = allNamespaces.get(ns)!;
    const symbolCount =
      stdlibSymbols.scalars.length +
      stdlibSymbols.models.length +
      stdlibSymbols.enums.length +
      stdlibSymbols.decorators.length +
      stdlibSymbols.unions.length;

    if (symbolCount === 0) continue;

    // Map namespace to directory: TypeSpec.Http -> TypeSpec/Http
    const builtinDir = resolve(builtinsRoot, ns.replace(/\./g, "/"));
    const ours = loadOurBuiltins(builtinDir);

    console.log(`\n── ${ns} ──`);
    console.log(
      `   Stdlib: ${stdlibSymbols.scalars.length}S ${stdlibSymbols.models.length}M ${stdlibSymbols.enums.length}E ${stdlibSymbols.decorators.length}D ${stdlibSymbols.unions.length}U`,
    );

    if (!ours) {
      hasIssues = true;
      const allSymbols = [
        ...stdlibSymbols.scalars.map((s) => `scalar ${s}`),
        ...stdlibSymbols.models.map((s) => `model ${s}`),
        ...stdlibSymbols.enums.map((s) => `enum ${s}`),
        ...stdlibSymbols.decorators.map((s) => `decorator ${s}`),
        ...stdlibSymbols.unions.map((s) => `union ${s}`),
      ];
      console.log(`   ❌ No builtin directory (${ns.replace(/\./g, "/")})`);
      for (const s of allSymbols) {
        console.log(`        - ${s}`);
      }
      totalMissing += allSymbols.length;
      continue;
    }

    console.log(
      `   Ours:   ${ours.scalars.length}S ${ours.models.length}M ${ours.enums.length}E ${ours.decorators.length}D ${ours.unions.length}U`,
    );

    const diffs: Diff[] = [
      diff("scalars", stdlibSymbols.scalars, ours.scalars),
      diff("models", stdlibSymbols.models, ours.models),
      diff("enums", stdlibSymbols.enums, ours.enums),
      diff("decorators", stdlibSymbols.decorators, ours.decorators),
      diff("unions", stdlibSymbols.unions, ours.unions),
    ];

    for (const d of diffs) {
      if (d.missing.length === 0 && d.extra.length === 0) {
        console.log(`   ✅ ${d.category}`);
      } else {
        if (d.missing.length > 0) {
          hasIssues = true;
          console.log(`   ❌ ${d.category} — missing:`);
          for (const name of d.missing) {
            console.log(`        - ${name}`);
          }
        }
        if (d.extra.length > 0) {
          console.log(`   ⚠️  ${d.category} — extra:`);
          for (const name of d.extra) {
            console.log(`        ~ ${name}`);
          }
        }
      }
      totalMissing += d.missing.length;
      totalExtra += d.extra.length;
    }
  }

  console.log(`\n══════════════════════`);
  console.log(`Total missing: ${totalMissing}, Extra: ${totalExtra}`);
  console.log(hasIssues ? "❌ Out of sync" : "✅ All in sync");
  process.exit(hasIssues ? 1 : 0);
} finally {
  rmSync(tempDir, { recursive: true, force: true });
}
