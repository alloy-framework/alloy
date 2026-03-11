#!/usr/bin/env node

import { spawn, execSync } from 'child_process';
import { readFileSync, mkdirSync, writeFileSync, readdirSync, statSync, unlinkSync, existsSync, appendFileSync } from 'fs';
import { resolve } from 'path';
import { setLogDir, setRetentionDays, rotateAllLogs } from './ralph-logger.mjs';

const packageRoot = execSync('npm prefix', { encoding: 'utf-8' }).trim();
const logsDir = resolve(packageRoot, 'eng/logs');

// ── Argument parsing ──────────────────────────────────────────────────

const args = process.argv.slice(2);

function getArg(name) {
  const idx = args.indexOf(name);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : undefined;
}

const iterationsStr = getArg('--iterations') ?? '50';
const iterations = parseInt(iterationsStr, 10);
if (isNaN(iterations) || iterations <= 0) {
  console.error('Error: --iterations must be a positive number');
  process.exit(1);
}

const model = getArg('--model');
const promptFlag = getArg('--prompt') ?? 'eng/ralph.md';
const promptPath = resolve(packageRoot, promptFlag);
const prompt = readFileSync(promptPath, 'utf-8');

const logRetentionDaysStr = getArg('--log-retention-days') ?? '7';
const logRetentionDays = parseInt(logRetentionDaysStr, 10);
const autoStash = args.includes('--auto-stash');
const progressMaxLines = 500;
const progressKeepEntries = 10;

// ── Helpers ───────────────────────────────────────────────────────────

function formatDuration(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  if (h > 0) return `${h}h ${m % 60}m ${s % 60}s`;
  if (m > 0) return `${m}m ${s % 60}s`;
  return `${s}s`;
}

function timestampForFile() {
  return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
}

// ── Git state check ──────────────────────────────────────────────────

function checkGitState(label) {
  try {
    const status = execSync('git status --porcelain', {
      encoding: 'utf-8',
      cwd: packageRoot,
    }).trim();
    if (status) {
      const fileCount = status.split('\n').length;
      console.warn(`⚠️  [${label}] Working tree is dirty — ${fileCount} file(s) with uncommitted changes.`);
      if (autoStash) {
        console.log('📦 Auto-stashing uncommitted changes…');
        execSync('git stash push -m "ralph-auto-stash"', { cwd: packageRoot });
      }
      return true;
    }
  } catch {
    // git not available or not a repo; silently continue
  }
  return false;
}

// ── Log retention ───────────────────────────────────────────────────

function cleanOldLogs() {
  setLogDir(logsDir);
  setRetentionDays(logRetentionDays);
  const deleted = rotateAllLogs();
  if (deleted > 0) {
    console.log(`🧹 Cleaned ${deleted} log file(s) older than ${logRetentionDays} days.`);
  }
}

// ── Progress rotation ───────────────────────────────────────────────

function rotateProgress() {
  const progressPath = resolve(packageRoot, 'progress.md');
  if (!existsSync(progressPath)) return;

  const content = readFileSync(progressPath, 'utf-8');
  const lineCount = content.split('\n').length;
  if (lineCount <= progressMaxLines) return;

  const parts = content.split(/^(## .+)$/m);
  // parts[0] = header, then alternating: heading, body
  const header = parts[0];
  const entries = [];
  for (let i = 1; i < parts.length; i += 2) {
    const heading = parts[i];
    const body = i + 1 < parts.length ? parts[i + 1] : '';
    entries.push(heading + body);
  }

  if (entries.length <= progressKeepEntries) return;

  const archiveEntries = entries.slice(0, -progressKeepEntries);
  const recentEntries = entries.slice(-progressKeepEntries);

  const archiveDir = resolve(packageRoot, 'eng/progress-archive');
  mkdirSync(archiveDir, { recursive: true });

  const month = new Date().toISOString().slice(0, 7); // YYYY-MM
  const archivePath = resolve(archiveDir, `${month}.md`);

  if (existsSync(archivePath)) {
    appendFileSync(archivePath, '\n' + archiveEntries.join('\n') + '\n', 'utf-8');
  } else {
    writeFileSync(archivePath, `# Progress Archive — ${month}\n\n` + archiveEntries.join('\n') + '\n', 'utf-8');
  }

  writeFileSync(progressPath, header + recentEntries.join('\n') + '\n', 'utf-8');

  console.log(`📋 Rotated ${archiveEntries.length} progress entries to eng/progress-archive/${month}.md`);
}

// ── Ensure logs directory exists ─────────────────────────────────────

mkdirSync(logsDir, { recursive: true });

// ── Startup housekeeping ─────────────────────────────────────────────

checkGitState('startup');
cleanOldLogs();

// ── Signal handling ──────────────────────────────────────────────────

let interrupted = false;
let activeChild = null;

function handleSignal(signal) {
  if (interrupted) return; // avoid double-handling
  interrupted = true;
  console.log(`\n⚡ Received ${signal} — finishing current iteration…`);
  if (activeChild) {
    activeChild.kill(signal);
  }
}

process.on('SIGINT', () => handleSignal('SIGINT'));
process.on('SIGTERM', () => handleSignal('SIGTERM'));

// ── Core runner ──────────────────────────────────────────────────────

function runCopilot(promptText) {
  const copilotArgs = ['--yolo', '-p', promptText];
  if (model) {
    copilotArgs.push('--model', model);
  }

  return new Promise((resolve, reject) => {
    const child = spawn('copilot', copilotArgs, {
      stdio: ['inherit', 'pipe', 'pipe'],
      env: process.env,
    });

    activeChild = child;
    let combined = '';

    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');

    child.stdout.on('data', (chunk) => {
      combined += chunk;
      process.stdout.write(chunk);
    });

    child.stderr.on('data', (chunk) => {
      combined += chunk;
      process.stderr.write(chunk);
    });

    child.on('error', (err) => {
      activeChild = null;
      reject(err);
    });

    child.on('close', (code) => {
      activeChild = null;
      resolve({ code, output: combined });
    });
  });
}

// ── Main loop ────────────────────────────────────────────────────────

const globalStart = Date.now();
let completed = 0;
let prdCompleted = false;

console.log(`\n🔁 Ralph Loop — ${iterations} iterations, prompt: ${promptFlag}`);
if (model) console.log(`   Model: ${model}`);
console.log();

for (let i = 1; i <= iterations; i++) {
  if (interrupted) break;

  const iterStart = Date.now();
  console.log(
    `\n=== Iteration ${i} of ${iterations} [started ${new Date(iterStart).toLocaleTimeString()}] ===\n`,
  );

  let code, output;
  try {
    ({ code, output } = await runCopilot(prompt));
  } catch (err) {
    console.error('\n❌ Failed to run copilot:', err?.message ?? err);
    output = err?.message ?? String(err);
    code = 1;
  }

  const iterDuration = Date.now() - iterStart;
  const totalElapsed = Date.now() - globalStart;
  completed = i;

  console.log(
    `\n⏱  Iteration ${i}: ${formatDuration(iterDuration)} | Total elapsed: ${formatDuration(totalElapsed)}`,
  );

  // Write iteration log file
  const logFile = resolve(logsDir, `ralph-${timestampForFile()}-iteration-${i}.log`);
  try {
    writeFileSync(logFile, output, 'utf-8');
    console.log(`📄 Log: ${logFile}`);
  } catch (err) {
    console.warn(`⚠️  Could not write log file: ${err.message}`);
  }

  if (output.includes('<promise>COMPLETED</promise>')) {
    prdCompleted = true;
    console.log('\n✅ PRD is complete! Exiting.');
    break;
  }

  if (code !== 0) {
    console.log(`\n⚠️ Copilot exited with code ${code}`);
  }

  // Post-iteration housekeeping
  rotateProgress();
  checkGitState(`post-iteration ${i}`);
}

// ── Summary ──────────────────────────────────────────────────────────

const totalTime = Date.now() - globalStart;
console.log('\n' + '═'.repeat(50));
console.log('  Ralph Loop Summary');
console.log('═'.repeat(50));
console.log(`  Iterations completed: ${completed} / ${iterations}`);
console.log(`  Total time:           ${formatDuration(totalTime)}`);
console.log(`  PRD completed:        ${prdCompleted ? '✅ Yes' : '❌ No'}`);
if (interrupted) console.log('  Stopped by:           signal (SIGINT/SIGTERM)');
console.log('═'.repeat(50) + '\n');
