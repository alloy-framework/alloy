/* eslint-disable no-console */
// @ts-check
import { context, getOctokit } from "@actions/github";
import {
  NodeChronusHost,
  renderReleasePlanAsMarkdown,
  resolveCurrentReleasePlan,
} from "@chronus/chronus";
import { execSync } from "child_process";
const branchName = "publish/auto-release";

const plan = await resolveCurrentReleasePlan(NodeChronusHost, process.cwd());
const changeStatus = await renderReleasePlanAsMarkdown(plan);
execSync(`pnpm change version`, { stdio: "inherit" });
const stdout = execSync(`git status --porcelain`).toString();

if (stdout.trim() !== "") {
  console.log("Commiting the following changes:\n", stdout);

  execSync(`git add -A`);
  execSync(
    `git -c user.email=chronus@github.com -c user.name="Auto Chronus Bot" commit -am "Bump versions"`,
  );
  execSync(`git push origin HEAD:${branchName} --force`);

  console.log();
  console.log("-".repeat(160));
  console.log("|  Link to create the PR");
  console.log(
    `|  https://github.com/timotheeguerin/chronus/pull/new/${branchName}  `,
  );
  console.log("-".repeat(160));

  const github = getOctokit(process.env.GITHUB_TOKEN ?? "");
  const prs = await github.rest.pulls.list({
    ...context.repo,
    head: `${context.repo.owner}:${branchName}`,
    base: "main",
    state: "open",
  });
  console.log(
    "Found those prs",
    prs.url,
    prs.data.map((x) => x.head.ref),
  );
  const existing = prs.data[0];
  if (existing) {
    console.log("Existing, updating pr", existing.number);
    await github.rest.pulls.update({
      ...context.repo,
      pull_number: existing.number,
      body: changeStatus,
    });
  } else {
    await github.rest.pulls.create({
      ...context.repo,
      title: "Release changes",
      head: branchName,
      base: "main",
      body: changeStatus,
    });
  }
} else {
  console.log("No changes to publish");
}
