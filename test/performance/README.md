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

- `--samples <n>`: Set the number of runs (samples) per scenario. Default: 5.
- `--profile`: Enable profiling mode. The harness will launch scenario children with `--inspect-brk` and force a single run. Connect with dev tools to start the scenario.
- `--scenario <name>`: Run only the named scenario (directory name under `scenarios/`). Useful for focused profiling or debugging.
- `--baseline <path>`: Provide a baseline JSON file to compare against. If no `--baseline` is passed, the runner will look for `baseline.json` in the current working directory and use that if present.
- `--write-baseline <path>`: Write the current run results to the given path as a baseline JSON file. This file can later be supplied via `--baseline` (or picked up from `baseline.json`).
