import pc from "picocolors";
import { buildCommand } from "./commands/build.js";
import { installAgentsCommand } from "./commands/install-agents.js";
import { installDocsCommand } from "./commands/install-docs.js";

const argv = process.argv.slice(2);
const subcommand = argv[0];

const buildFlags = new Set([
  "--watch",
  "--dev",
  "--prod",
  "--source-info",
  "--with-dev",
]);

function isBuildFlag(arg: string): boolean {
  return buildFlags.has(arg);
}

async function main() {
  switch (subcommand) {
    case "build":
      await buildCommand(argv.slice(1));
      break;
    case "install-docs":
      await installDocsCommand();
      break;
    case "install-agents":
      await installAgentsCommand();
      break;
    case "--help":
    case "-h":
      printHelp();
      break;
    default:
      // Backward compat: if no subcommand or unrecognized arg that looks like
      // a build flag, run build with the full argv.
      if (!subcommand || isBuildFlag(subcommand)) {
        await buildCommand(argv);
      } else {
        // eslint-disable-next-line no-console
        console.log(pc.red(`Unknown command: ${subcommand}`));
        printHelp();
        process.exit(1);
      }
  }
}

function printHelp() {
  // eslint-disable-next-line no-console
  console.log(`
${pc.bold("alloy")} — Alloy framework CLI

${pc.bold("Commands:")}
  build              Build the project (default)
  install-docs       Update AGENTS.md with links to installed Alloy package docs
  install-agents     Install Alloy agent definitions for Copilot or Claude

${pc.bold("Build flags:")}
  --watch            Rebuild on file changes
  --dev              Development build
  --prod             Production build
  --source-info      Include source info in output
  --with-dev         Dual build: prod → dist/, dev → dist/dev/

Run ${pc.cyan("alloy <command> --help")} for command-specific help.
`);
}

await main();
