#!/usr/bin/env node

/**
 * Ralph Parallel — Structured JSONL Logger
 *
 * Provides a shared logging layer for all Ralph orchestrator components.
 * Each component gets its own JSONL log file with structured entries.
 *
 * Usage:
 *   import { createLogger, flushAll, setLogDir, setRetentionDays, rotateAllLogs } from './ralph-logger.mjs';
 *   const log = createLogger('orchestrator');
 *   log.info('worker:assigned', { workerId: '1', taskId: 'M7-042' });
 *   log.error('merge:conflict', { branch: 'ralph/worker-1', files: ['src/foo.ts'] });
 *   // On shutdown:
 *   flushAll();
 *
 * Log format (one JSON object per line):
 *   {"ts":"2026-03-09T23:24:56.443Z","level":"info","component":"orchestrator","event":"worker:assigned","ctx":{"workerId":"1"}}
 *
 * @see docs/design-decisions/ (parallel ralph loop)
 */

import { appendFileSync, mkdirSync, readdirSync, statSync, unlinkSync, existsSync } from 'fs';
import { resolve, basename } from 'path';

// ── Configuration ───────────────────────────────────────────────────────

let logDir = resolve(process.cwd(), 'eng/logs');
let retentionDays = 7;

/**
 * Override the log output directory.
 * @param {string} dir — absolute path to log directory
 */
export function setLogDir(dir) {
  logDir = dir;
}

/**
 * Set log retention period in days.
 * @param {number} days
 */
export function setRetentionDays(days) {
  retentionDays = days;
}

// ── Date helpers ────────────────────────────────────────────────────────

function isoDate() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function isoTimestamp() {
  return new Date().toISOString();
}

function timestampForFile() {
  return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
}

// ── Logger registry ─────────────────────────────────────────────────────

/** @type {Map<string, RalphLogger>} */
const loggers = new Map();

/**
 * Get or create a logger for a component.
 * Loggers are singletons per component name — calling createLogger('merge')
 * twice returns the same instance.
 *
 * @param {string} component — e.g., 'orchestrator', 'merge', 'tasks'
 * @returns {RalphLogger}
 */
export function createLogger(component) {
  if (loggers.has(component)) {
    return loggers.get(component);
  }
  const logger = new RalphLogger(component);
  loggers.set(component, logger);
  return logger;
}

/**
 * Flush all loggers (call on graceful shutdown).
 * Currently a no-op since we use synchronous appends, but exists as a
 * hook point in case we switch to buffered writes for performance.
 */
export function flushAll() {
  // Synchronous writes don't need explicit flushing, but iterate
  // loggers in case any have buffered state in the future.
  for (const logger of loggers.values()) {
    logger.flush();
  }
}

/**
 * Rotate (delete) old log files across all known JSONL and JSON patterns.
 * Extends the existing cleanOldLogs() from ralph.mjs to cover new file types.
 */
export function rotateAllLogs() {
  if (!existsSync(logDir)) return;

  const cutoff = Date.now() - retentionDays * 24 * 60 * 60 * 1000;
  let deleted = 0;

  try {
    const files = readdirSync(logDir);
    for (const file of files) {
      // Match patterns: *.jsonl, *.json, ralph-*.log, validation-*.log
      const isRotatable =
        file.endsWith('.jsonl') ||
        file.endsWith('.json') ||
        (file.startsWith('ralph-') && file.endsWith('.log')) ||
        (file.startsWith('validation-') && file.endsWith('.log')) ||
        (file.startsWith('tui-dump-') && file.endsWith('.json'));

      if (!isRotatable) continue;

      const filePath = resolve(logDir, file);
      try {
        const mtime = statSync(filePath).mtimeMs;
        if (mtime < cutoff) {
          unlinkSync(filePath);
          deleted++;
        }
      } catch {
        // File may have been deleted between readdir and stat
      }
    }
  } catch {
    // Log dir may not exist yet
  }

  return deleted;
}

// ── Logger Class ────────────────────────────────────────────────────────

class RalphLogger {
  /**
   * @param {string} component — logical component name (used in filename and entries)
   */
  constructor(component) {
    this.component = component;
    this._currentDate = null;
    this._filePath = null;
  }

  /**
   * Resolve the current log file path.
   * Creates a new file per day: {component}-YYYY-MM-DD.jsonl
   */
  _getFilePath() {
    const today = isoDate();
    if (this._currentDate !== today) {
      this._currentDate = today;
      mkdirSync(logDir, { recursive: true });
      this._filePath = resolve(logDir, `${this.component}-${today}.jsonl`);
    }
    return this._filePath;
  }

  /**
   * Write a structured log entry.
   *
   * @param {'debug'|'info'|'warn'|'error'} level
   * @param {string} event — dot-separated event name (e.g., 'worker:assigned')
   * @param {object} [ctx] — arbitrary context data
   */
  _write(level, event, ctx) {
    const entry = {
      ts: isoTimestamp(),
      level,
      component: this.component,
      event,
    };
    if (ctx !== undefined && ctx !== null) {
      entry.ctx = ctx;
    }

    try {
      appendFileSync(this._getFilePath(), JSON.stringify(entry) + '\n', 'utf-8');
    } catch {
      // Non-fatal — don't crash the orchestrator because of a log write failure
    }
  }

  debug(event, ctx) {
    this._write('debug', event, ctx);
  }

  info(event, ctx) {
    this._write('info', event, ctx);
  }

  warn(event, ctx) {
    this._write('warn', event, ctx);
  }

  error(event, ctx) {
    this._write('error', event, ctx);
  }

  /**
   * Flush any buffered state (currently no-op for sync writes).
   */
  flush() {
    // Reserved for future buffered mode
  }
}

// ── Utility: Write a one-shot JSON file ─────────────────────────────────

/**
 * Write a JSON object to a file in the log directory.
 * Useful for run summaries and TUI dumps.
 *
 * @param {string} prefix — filename prefix (e.g., 'run-summary', 'tui-dump')
 * @param {object} data — JSON-serializable object
 * @returns {string} absolute path to the written file
 */
export function writeJsonLog(prefix, data) {
  mkdirSync(logDir, { recursive: true });
  const filePath = resolve(logDir, `${prefix}-${timestampForFile()}.json`);
  try {
    const content = JSON.stringify(data, null, 2) + '\n';
    appendFileSync(filePath, content, 'utf-8');
  } catch {
    // Non-fatal
  }
  return filePath;
}

/**
 * Write raw text to a file in the log directory.
 * Useful for validation output.
 *
 * @param {string} prefix — filename prefix (e.g., 'validation')
 * @param {string} content — text content
 * @returns {string} absolute path to the written file
 */
export function writeTextLog(prefix, content) {
  mkdirSync(logDir, { recursive: true });
  const filePath = resolve(logDir, `${prefix}-${timestampForFile()}.log`);
  try {
    appendFileSync(filePath, content, 'utf-8');
  } catch {
    // Non-fatal
  }
  return filePath;
}
