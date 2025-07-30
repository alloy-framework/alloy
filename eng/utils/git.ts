import { execa, Result } from "execa";

export async function listChangedFilesSince(
  ref: string,
  { repositoryPath }: { repositoryPath: string },
) {
  return splitStdoutLines(
    await execGit(["diff", "--name-only", `${ref}...`], { repositoryPath }),
  );
}

async function execGit(
  args: string[],
  { repositoryPath }: { repositoryPath: string },
) {
  const result = await execa("git", args, { cwd: repositoryPath });

  if (result.code !== "0") {
    throw new GitError(args, result.stdio.toString());
  }
  return result;
}

export class GitError extends Error {
  args: string[];

  constructor(args: string[], stderr: string) {
    super(`GitError running: git ${args.join(" ")}\n${stderr}`);
    this.args = args;
  }
}
function splitStdoutLines(result: Result<{ cwd: string }>) {
  return result.stdout
    .toString()
    .split("\n")
    .filter((a) => a);
}
