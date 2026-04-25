# Performance harness

This package contains a minimal performance harness used to run micro-benchmarks under `test/performance/scenarios/*`.

## Prerequisites

- Node.js
- pnpm installed and packages installed at the repository root (`pnpm install`).

## Quick start

1. Change into the package directory:

   cd test/performance

2. Run the benchmark runner:

   pnpm run bench

The `bench` script builds the harness and test scenarios then executes it.

## Passing arguments

When invoking the `bench` npm script, pass runner arguments after `--`. Example:

pnpm run bench -- --samples 10 --scenario render-long-file

Supported CLI options

- `--samples <n>`: Set the number of runs (samples) per scenario. Default: 5 (single mode), 16 (paired mode).
- `--profile`: Enable profiling mode. The harness will launch scenario children with `--inspect-brk` and force a single run. Connect with dev tools to start the scenario.
- `--scenario <name>`: Run only the named scenario (directory name under `scenarios/`). Useful for focused profiling or debugging.
- `--baseline <path>`: Provide a baseline JSON file to compare against. If no `--baseline` is passed, the runner will look for `baseline.json` in the current working directory and use that if present.
- `--write-baseline <path>`: Write the current run results to the given path as a baseline JSON file. This file can later be supplied via `--baseline` (or picked up from `baseline.json`). Includes raw per-sample numbers so future runs can compute Welch's t-test against it.
- `--compare-with <path>`: Enable **paired A/B mode**. The arg points at an alternate alloy checkout (a worktree, an older clone, or its `dist/scenarios` dir directly). The harness alternates samples between current-tree (`B`) and the alt tree (`A`), with order randomized per pair, and reports a paired t-test with 95% CI on the diff. This is the mode to use when you want a _trustworthy_ verdict on a code change.
- `--metric <inner|wall|child-cpu>`: Which timing to use for stats. `inner` (default) = CPU spent inside `runTest()`. `wall` = wall-clock of the child process — closest to "what a real user pays". `child-cpu` = inner + module-load CPU.

## Methodology

Single-shot CPU measurements have ~5–15% noise on this scenario. That's
large enough to swamp per-commit changes (often <5%), and was the root
cause of a real bug where 8 perf commits read individually as noise but
collectively delivered +25% performance — see the rebench-revert
investigation in this branch's history.

The harness offers two modes:

1. **Single mode** (default). Runs N samples, reports mean ± sd. Discards
   the first ~N/3 samples (capped at 3) as host warmup — the CPU
   governor on Linux ondemand takes ~300ms to clock up, which inflates
   the first 1–2 fresh-spawn samples. Optionally compares against a
   stored baseline.json with Welch's t-test if it has raw samples.

2. **Paired A/B mode** (`--compare-with`). The robust mode. Alternates
   A,B per iteration with order _randomized_ (deterministic per-iter
   coin flip seeded by iteration index) so neither side systematically
   gets the cold-cache or hot-governor bias. Reports a paired t-test
   with 95% CI on the diff. Use this for accept/reject decisions; the
   ralph perf loop uses it via a persistent `/tmp/alloy-perf-A` worktree
   pinned at the slice's pre-change SHA.

Each sample is a fresh `node` child. The harness measures three
timings per sample:

- **inner CPU** (`scenarios[*].cpu.avgMicros`) — CPU spent inside
  `runTest()`. Excludes module load + V8 init. Best for narrow
  attribution.
- **module-load CPU** (`scenarios[*].moduleLoad.avgMicros`) — CPU spent
  importing the scenario module + transitive deps (all of alloy). Real
  users pay this on every fresh invocation, so a slice that makes
  imports slower would show no inner-CPU change but should still be
  caught.
- **child wall-clock** (`scenarios[*].wall.avgMicros`) — total time
  from spawn to exit of the child process. Closest to what a developer
  sees when running `tsp compile`. Includes everything: `node` startup,
  V8 init, module load, runTest, GC, exit.

The headline accept/reject metric defaults to `inner` (lowest variance,
narrowest attribution) but `--metric wall` is available for changes
where module-load or process-shutdown overhead is the suspected target.
