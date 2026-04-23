import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
} from "node:fs";
import { join, resolve } from "pathe";
import pc from "picocolors";
import {
  collectAlloySearchDirs,
  findGitRoot,
  findProjectRoot,
} from "../workspace.js";

type Platform = "copilot" | "claude";

interface AgentFileInfo {
  sourcePath: string;
  name: string;
  packageName: string;
}

export async function installAgentsCommand() {
  const cwd = process.cwd();
  const projectRoot = findProjectRoot(cwd);
  if (!projectRoot) {
    // eslint-disable-next-line no-console
    console.log(pc.red("Could not find project root (no package.json found)."));
    process.exit(1);
  }

  // Detect platforms at git root (where .github/ and .claude/ live)
  const rootDir = findGitRoot(cwd) ?? projectRoot;
  const platforms = detectPlatforms(rootDir);
  if (platforms.length === 0) {
    // eslint-disable-next-line no-console
    console.log(
      pc.yellow(
        "Could not detect AI tool platform. Create a .github/ or .claude/ directory first,\nor run this command from a project that uses GitHub Copilot or Claude Code.",
      ),
    );
    process.exit(1);
  }

  const agents = discoverAgents(cwd);
  if (agents.length === 0) {
    // eslint-disable-next-line no-console
    console.log(
      pc.yellow("No agent definitions found in installed @alloy-js packages."),
    );
    return;
  }

  for (const platform of platforms) {
    installAgentsForPlatform(rootDir, platform, agents);
  }

  // Check if AGENTS.md has alloy docs section
  const agentsPath = resolve(rootDir, "AGENTS.md");
  if (
    !existsSync(agentsPath) ||
    !readFileSync(agentsPath, "utf-8").includes("<!-- BEGIN:alloy-docs -->")
  ) {
    // eslint-disable-next-line no-console
    console.log(
      `\n${pc.dim("Tip:")} Run ${pc.cyan("alloy install-docs")} to update AGENTS.md with links to Alloy documentation.`,
    );
  }
}

function detectPlatforms(rootDir: string): Platform[] {
  const platforms: Platform[] = [];

  if (existsSync(join(rootDir, ".github"))) {
    platforms.push("copilot");
  }

  if (existsSync(join(rootDir, ".claude"))) {
    platforms.push("claude");
  }

  return platforms;
}

function discoverAgents(cwd: string): AgentFileInfo[] {
  const searchDirs = collectAlloySearchDirs(cwd);
  const agents: AgentFileInfo[] = [];
  const seen = new Set<string>();

  for (const searchDir of searchDirs) {
    const scopeDir = join(searchDir, "node_modules", "@alloy-js");
    if (!existsSync(scopeDir)) continue;

    for (const entry of readdirSync(scopeDir, { withFileTypes: true })) {
      if (!entry.isDirectory() && !entry.isSymbolicLink()) continue;

      const pkgDir = join(scopeDir, entry.name);
      const agentsDir = join(pkgDir, "agents");
      if (!existsSync(agentsDir)) continue;

      for (const agentFile of readdirSync(agentsDir)) {
        if (!agentFile.endsWith(".agent.md")) continue;

        const name = agentFile.replace(/\.agent\.md$/, "");
        // De-duplicate by agent name
        if (seen.has(name)) continue;
        seen.add(name);

        agents.push({
          sourcePath: join(agentsDir, agentFile),
          name,
          packageName: `@alloy-js/${entry.name}`,
        });
      }
    }
  }

  return agents;
}

function installAgentsForPlatform(
  projectRoot: string,
  platform: Platform,
  agents: AgentFileInfo[],
) {
  const targetDir = getTargetDir(projectRoot, platform);
  mkdirSync(targetDir, { recursive: true });

  const installed: string[] = [];

  for (const agent of agents) {
    const targetFilename = getTargetFilename(agent.name, platform);
    const targetPath = join(targetDir, targetFilename);
    copyFileSync(agent.sourcePath, targetPath);
    installed.push(targetFilename);
  }

  const platformLabel =
    platform === "copilot" ? "GitHub Copilot" : "Claude Code";
  // eslint-disable-next-line no-console
  console.log(
    `${pc.green("✔")} Installed ${installed.length} agent(s) for ${pc.cyan(platformLabel)}:`,
  );
  for (const file of installed) {
    // eslint-disable-next-line no-console
    console.log(`  ${pc.dim("•")} ${join(getTargetRelDir(platform), file)}`);
  }
}

function getTargetDir(projectRoot: string, platform: Platform): string {
  switch (platform) {
    case "copilot":
      return join(projectRoot, ".github", "agents");
    case "claude":
      return join(projectRoot, ".claude", "agents");
  }
}

function getTargetRelDir(platform: Platform): string {
  switch (platform) {
    case "copilot":
      return ".github/agents";
    case "claude":
      return ".claude/agents";
  }
}

function getTargetFilename(name: string, platform: Platform): string {
  switch (platform) {
    case "copilot":
      return `${name}.agent.md`;
    case "claude":
      return `${name}.md`;
  }
}
