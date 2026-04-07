import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "pathe";
import pc from "picocolors";

const BEGIN_MARKER = "<!-- BEGIN:alloy-docs -->";
const END_MARKER = "<!-- END:alloy-docs -->";

interface PackageDocInfo {
  name: string;
  description: string;
  docsPath: string;
  indexPath: string;
}

export async function installDocsCommand() {
  const projectRoot = findProjectRoot();
  if (!projectRoot) {
    // eslint-disable-next-line no-console
    console.log(pc.red("Could not find project root (no package.json found)."));
    process.exit(1);
  }

  const packages = discoverAlloyPackages(projectRoot);
  if (packages.length === 0) {
    // eslint-disable-next-line no-console
    console.log(
      pc.yellow("No @alloy-js packages with docs found in node_modules."),
    );
    return;
  }

  const section = generateDocsSection(packages);
  const agentsPath = resolve(projectRoot, "AGENTS.md");
  updateAgentsMd(agentsPath, section);

  // eslint-disable-next-line no-console
  console.log(
    `${pc.green("✔")} Updated ${pc.cyan("AGENTS.md")} with ${packages.length} package doc link(s):`,
  );
  for (const pkg of packages) {
    // eslint-disable-next-line no-console
    console.log(`  ${pc.dim("•")} ${pkg.name} → ${pc.dim(pkg.indexPath)}`);
  }
}

function findProjectRoot(): string | undefined {
  let dir = process.cwd();
  while (true) {
    if (existsSync(join(dir, "package.json"))) {
      return dir;
    }
    const parent = resolve(dir, "..");
    if (parent === dir) return undefined;
    dir = parent;
  }
}

function discoverAlloyPackages(projectRoot: string): PackageDocInfo[] {
  const scopeDir = join(projectRoot, "node_modules", "@alloy-js");
  if (!existsSync(scopeDir)) return [];

  const packages: PackageDocInfo[] = [];

  for (const entry of readdirSync(scopeDir, { withFileTypes: true })) {
    if (!entry.isDirectory() && !entry.isSymbolicLink()) continue;

    const pkgDir = join(scopeDir, entry.name);
    const docsDir = join(pkgDir, "docs");
    if (!existsSync(docsDir)) continue;

    // Find the best doc index
    const indexPath = findDocIndex(docsDir);
    if (!indexPath) continue;

    const pkgJsonPath = join(pkgDir, "package.json");
    let name = `@alloy-js/${entry.name}`;
    let description = "";

    if (existsSync(pkgJsonPath)) {
      try {
        const pkgJson = JSON.parse(readFileSync(pkgJsonPath, "utf-8"));
        name = pkgJson.name ?? name;
        description = pkgJson.description ?? "";
      } catch {
        // ignore parse errors
      }
    }

    const relativeIndexPath = join(
      "node_modules",
      "@alloy-js",
      entry.name,
      "docs",
      indexPath,
    );

    packages.push({
      name,
      description,
      docsPath: join("node_modules", "@alloy-js", entry.name, "docs"),
      indexPath: relativeIndexPath,
    });
  }

  // Sort: core first, then alphabetically
  packages.sort((a, b) => {
    if (a.name === "@alloy-js/core") return -1;
    if (b.name === "@alloy-js/core") return 1;
    return a.name.localeCompare(b.name);
  });

  return packages;
}

function findDocIndex(docsDir: string): string | undefined {
  // Prefer docs/index.md, then docs/api/index.md
  if (existsSync(join(docsDir, "index.md"))) {
    return "index.md";
  }
  if (existsSync(join(docsDir, "api", "index.md"))) {
    return "api/index.md";
  }
  return undefined;
}

function generateDocsSection(packages: PackageDocInfo[]): string {
  const lines = [
    BEGIN_MARKER,
    "# Alloy Framework",
    "",
    "Alloy is a code generation framework using JSX components.",
    "Before working with Alloy code, read the relevant docs from installed packages.",
    "Your training data may be outdated — these docs match your installed version.",
    "",
    "## Installed Package Documentation",
    "",
  ];

  for (const pkg of packages) {
    const desc = pkg.description ? ` — ${pkg.description}` : "";
    lines.push(`- [${pkg.name}](./${pkg.indexPath})${desc}`);
  }

  lines.push(END_MARKER);
  return lines.join("\n");
}

function updateAgentsMd(filePath: string, section: string) {
  if (!existsSync(filePath)) {
    writeFileSync(filePath, section + "\n", "utf-8");
    return;
  }

  const content = readFileSync(filePath, "utf-8");
  const beginIdx = content.indexOf(BEGIN_MARKER);
  const endIdx = content.indexOf(END_MARKER);

  if (beginIdx !== -1 && endIdx !== -1) {
    // Replace existing section
    const before = content.slice(0, beginIdx);
    const after = content.slice(endIdx + END_MARKER.length);
    writeFileSync(filePath, before + section + after, "utf-8");
  } else {
    // Append section
    const separator = content.endsWith("\n") ? "\n" : "\n\n";
    writeFileSync(filePath, content + separator + section + "\n", "utf-8");
  }
}
