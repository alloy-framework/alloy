import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "pathe";

/**
 * Walk up from `startDir` looking for a `.git` directory.
 * Returns the directory containing `.git`, or undefined.
 */
export function findGitRoot(startDir: string): string | undefined {
  let dir = resolve(startDir);
  while (true) {
    if (existsSync(join(dir, ".git"))) {
      return dir;
    }
    const parent = resolve(dir, "..");
    if (parent === dir) return undefined;
    dir = parent;
  }
}

/**
 * Walk up from `startDir` looking for `package.json`.
 * Returns the directory containing it, or undefined.
 */
export function findProjectRoot(startDir: string): string | undefined {
  let dir = resolve(startDir);
  while (true) {
    if (existsSync(join(dir, "package.json"))) {
      return dir;
    }
    const parent = resolve(dir, "..");
    if (parent === dir) return undefined;
    dir = parent;
  }
}

/**
 * Find the workspace root — the nearest ancestor that has workspace
 * configuration (pnpm-workspace.yaml or package.json#workspaces).
 * Returns undefined if not in a workspace.
 */
export function findWorkspaceRoot(startDir: string): string | undefined {
  let dir = resolve(startDir);
  while (true) {
    if (existsSync(join(dir, "pnpm-workspace.yaml"))) {
      return dir;
    }
    if (existsSync(join(dir, "package.json"))) {
      try {
        const pkg = JSON.parse(
          readFileSync(join(dir, "package.json"), "utf-8"),
        );
        if (pkg.workspaces) {
          return dir;
        }
      } catch {
        // ignore
      }
    }
    const parent = resolve(dir, "..");
    if (parent === dir) return undefined;
    dir = parent;
  }
}

/**
 * Get workspace member directories. Reads pnpm-workspace.yaml or
 * package.json#workspaces and expands globs to actual directories.
 */
export function getWorkspaceMembers(workspaceRoot: string): string[] {
  const patterns = getWorkspacePatterns(workspaceRoot);
  if (patterns.length === 0) return [];

  const members: string[] = [];
  for (const pattern of patterns) {
    // Handle glob patterns like "packages/*", "apps/*", "packages/**"
    if (pattern.endsWith("/*") || pattern.endsWith("/**")) {
      const parentPath = pattern.replace(/\/\*\*?$/, "");
      const parentDir = resolve(workspaceRoot, parentPath);
      if (!existsSync(parentDir)) continue;

      for (const entry of readdirSync(parentDir, { withFileTypes: true })) {
        if (!entry.isDirectory() && !entry.isSymbolicLink()) continue;
        const memberDir = join(parentDir, entry.name);
        if (existsSync(join(memberDir, "package.json"))) {
          members.push(memberDir);
        }
      }
    } else {
      // Exact path like "apps/web"
      const memberDir = resolve(workspaceRoot, pattern);
      if (
        existsSync(memberDir) &&
        existsSync(join(memberDir, "package.json"))
      ) {
        members.push(memberDir);
      }
    }
  }

  return members;
}

/**
 * Read workspace glob patterns from pnpm-workspace.yaml or package.json.
 */
function getWorkspacePatterns(workspaceRoot: string): string[] {
  // Try pnpm-workspace.yaml first
  const pnpmPath = join(workspaceRoot, "pnpm-workspace.yaml");
  if (existsSync(pnpmPath)) {
    const content = readFileSync(pnpmPath, "utf-8");
    return parsePnpmWorkspaceYaml(content);
  }

  // Try package.json workspaces
  const pkgPath = join(workspaceRoot, "package.json");
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
      if (Array.isArray(pkg.workspaces)) {
        return pkg.workspaces;
      }
      if (pkg.workspaces?.packages) {
        return pkg.workspaces.packages;
      }
    } catch {
      // ignore
    }
  }

  return [];
}

/**
 * Minimal YAML parser for pnpm-workspace.yaml — only extracts the
 * `packages:` list. No dependency on a full YAML parser.
 */
function parsePnpmWorkspaceYaml(content: string): string[] {
  const patterns: string[] = [];
  let inPackages = false;

  for (const line of content.split("\n")) {
    const trimmed = line.trim();

    if (trimmed === "packages:" || trimmed === "packages: []") {
      inPackages = trimmed !== "packages: []";
      continue;
    }

    if (inPackages) {
      // List items start with "- "
      if (trimmed.startsWith("- ")) {
        const value = trimmed
          .slice(2)
          .trim()
          .replace(/^['"]|['"]$/g, "");
        if (value && !value.startsWith("!")) {
          patterns.push(value);
        }
      } else if (trimmed && !trimmed.startsWith("#")) {
        // Hit a new key — stop parsing packages
        break;
      }
    }
  }

  return patterns;
}

/**
 * Check if a directory has any `@alloy-js/*` dependencies
 * (dependencies, devDependencies, or peerDependencies).
 */
export function hasAlloyDependencies(dir: string): boolean {
  const pkgPath = join(dir, "package.json");
  if (!existsSync(pkgPath)) return false;

  try {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
    const allDeps = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
      ...pkg.peerDependencies,
    };
    return Object.keys(allDeps).some((d) => d.startsWith("@alloy-js/"));
  } catch {
    return false;
  }
}

/**
 * Collect all `node_modules/@alloy-js/` directories to scan for packages.
 * Searches cwd, workspace members, and ancestors up to git root.
 */
export function collectAlloySearchDirs(cwd: string): string[] {
  const searchDirs: string[] = [];
  const seen = new Set<string>();

  function addDir(dir: string) {
    const scopeDir = join(dir, "node_modules", "@alloy-js");
    const resolved = resolve(scopeDir);
    if (!seen.has(resolved) && existsSync(resolved)) {
      seen.add(resolved);
      searchDirs.push(dir);
    }
  }

  // 1. Current directory
  addDir(cwd);

  // 2. Workspace members with alloy dependencies
  const wsRoot = findWorkspaceRoot(cwd);
  if (wsRoot) {
    // Also check the workspace root itself
    addDir(wsRoot);

    const members = getWorkspaceMembers(wsRoot);
    for (const member of members) {
      if (hasAlloyDependencies(member)) {
        addDir(member);
      }
    }
  }

  // 3. Walk up to git root
  const gitRoot = findGitRoot(cwd);
  if (gitRoot) {
    let dir = cwd;
    while (true) {
      addDir(dir);
      if (resolve(dir) === resolve(gitRoot)) break;
      const parent = resolve(dir, "..");
      if (parent === dir) break;
      dir = parent;
    }
  }

  return searchDirs;
}
