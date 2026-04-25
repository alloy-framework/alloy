// Statistics helpers for the perf harness.
//
// Why these matter:
//   - Single-shot bench numbers carry ~5–15% noise on this scenario at N=12,
//     which is large enough to swamp the real per-commit changes (often <5%).
//   - To make accept/reject decisions reliable we compute a confidence
//     interval on the *difference* between two distributions and a p-value,
//     not just two ratios. The harness therefore keeps raw per-sample
//     numbers (not just mean+sd) and exposes a paired A/B mode.

export function mean(xs: number[]): number {
  if (xs.length === 0) return 0;
  let s = 0;
  for (const x of xs) s += x;
  return s / xs.length;
}

export function variance(xs: number[]): number {
  if (xs.length < 2) return 0;
  const m = mean(xs);
  let s = 0;
  for (const x of xs) s += (x - m) ** 2;
  return s / (xs.length - 1);
}

export function stddev(xs: number[]): number {
  return Math.sqrt(variance(xs));
}

/**
 * Welch's t-test for two independent samples (unequal variances). Returns
 * the t-statistic, degrees of freedom, and a two-sided p-value.
 *
 * Reference: Welch (1947). Implementation here uses a series approximation
 * for the regularized incomplete beta function — accurate to ~1e-6 in the
 * regime we care about (df > 5, p in [1e-6, 0.5]).
 */
export interface WelchResult {
  meanA: number;
  meanB: number;
  diff: number; // meanB - meanA
  diffPct: number; // (meanB - meanA) / meanA, or 0 when meanA==0
  // 95% confidence interval on diff (in the same units as the input samples)
  ci95: [number, number];
  ci95Pct: [number, number];
  t: number;
  df: number;
  pValue: number;
  // True if 0 lies outside ci95.
  significant: boolean;
}

export function welch(a: number[], b: number[]): WelchResult {
  const nA = a.length;
  const nB = b.length;
  const mA = mean(a);
  const mB = mean(b);
  const vA = variance(a);
  const vB = variance(b);
  const seSq = vA / nA + vB / nB;
  const se = Math.sqrt(seSq);
  const diff = mB - mA;
  const t = se > 0 ? diff / se : 0;
  // Welch–Satterthwaite degrees of freedom
  let df = 0;
  if (seSq > 0) {
    const num = seSq ** 2;
    const denom =
      (vA / nA) ** 2 / Math.max(nA - 1, 1) +
      (vB / nB) ** 2 / Math.max(nB - 1, 1);
    df = denom > 0 ? num / denom : 0;
  }
  const tCrit = tCritical95(df);
  const margin = tCrit * se;
  const ci95: [number, number] = [diff - margin, diff + margin];
  const ci95Pct: [number, number] =
    mA !== 0 ? [ci95[0] / mA, ci95[1] / mA] : [0, 0];
  const p = twoSidedPFromT(t, df);
  return {
    meanA: mA,
    meanB: mB,
    diff,
    diffPct: mA !== 0 ? diff / mA : 0,
    ci95,
    ci95Pct,
    t,
    df,
    pValue: p,
    significant: ci95[0] > 0 || ci95[1] < 0,
  };
}

/**
 * Paired t-test: requires equal-length arrays where a[i] and b[i] were
 * collected back-to-back so per-sample noise (host load drift, thermal,
 * page-cache state) cancels out. Strongly preferred over Welch when
 * sampling is interleaved.
 */
export function paired(a: number[], b: number[]): WelchResult {
  if (a.length !== b.length) {
    throw new Error(`paired(): length mismatch ${a.length} vs ${b.length}`);
  }
  const n = a.length;
  if (n < 2) {
    return {
      meanA: mean(a),
      meanB: mean(b),
      diff: mean(b) - mean(a),
      diffPct: 0,
      ci95: [0, 0],
      ci95Pct: [0, 0],
      t: 0,
      df: 0,
      pValue: 1,
      significant: false,
    };
  }
  const diffs: number[] = [];
  for (let i = 0; i < n; i++) diffs.push(b[i]! - a[i]!);
  const mA = mean(a);
  const mB = mean(b);
  const mD = mean(diffs);
  const sD = stddev(diffs);
  const se = sD / Math.sqrt(n);
  const df = n - 1;
  // If sD == 0, all diffs are identical. The classical t-statistic
  // is undefined (division by zero); treat as a perfect signal when
  // mD != 0, otherwise no signal.
  if (se === 0) {
    return {
      meanA: mA,
      meanB: mB,
      diff: mD,
      diffPct: mA !== 0 ? mD / mA : 0,
      ci95: [mD, mD],
      ci95Pct: mA !== 0 ? [mD / mA, mD / mA] : [0, 0],
      t:
        mD === 0 ? 0
        : mD > 0 ? Infinity
        : -Infinity,
      df,
      pValue: mD === 0 ? 1 : 0,
      significant: mD !== 0,
    };
  }
  const t = mD / se;
  const tCrit = tCritical95(df);
  const margin = tCrit * se;
  const ci95: [number, number] = [mD - margin, mD + margin];
  const ci95Pct: [number, number] =
    mA !== 0 ? [ci95[0] / mA, ci95[1] / mA] : [0, 0];
  return {
    meanA: mA,
    meanB: mB,
    diff: mD,
    diffPct: mA !== 0 ? mD / mA : 0,
    ci95,
    ci95Pct,
    t,
    df,
    pValue: twoSidedPFromT(t, df),
    significant: ci95[0] > 0 || ci95[1] < 0,
  };
}

// ---- internal: Student-t critical values and CDF ---------------------------

// Approximate t-critical for two-sided alpha=0.05. Uses a small lookup for
// low df (where the asymptotic z=1.96 is too small) and falls back to z+
// correction for higher df. Accurate to ~3 decimal places.
function tCritical95(df: number): number {
  if (df <= 0) return Infinity;
  // Lookup for small df (two-sided 95%).
  const table: Array<[number, number]> = [
    [1, 12.706],
    [2, 4.303],
    [3, 3.182],
    [4, 2.776],
    [5, 2.571],
    [6, 2.447],
    [7, 2.365],
    [8, 2.306],
    [9, 2.262],
    [10, 2.228],
    [12, 2.179],
    [15, 2.131],
    [20, 2.086],
    [30, 2.042],
    [60, 2.0],
    [120, 1.98],
  ];
  for (let i = 0; i < table.length; i++) {
    if (df <= table[i]![0]) {
      if (i === 0) return table[0]![1];
      // linear interp between table entries
      const [df0, t0] = table[i - 1]!;
      const [df1, t1] = table[i]!;
      const f = (df - df0) / (df1 - df0);
      return t0 + f * (t1 - t0);
    }
  }
  return 1.96;
}

// Two-sided p-value from t-statistic, using the regularized incomplete
// beta-function relation: p = I_{df/(df+t^2)}(df/2, 1/2).
function twoSidedPFromT(t: number, df: number): number {
  if (df <= 0) return 1;
  const x = df / (df + t * t);
  return regIncompleteBeta(x, df / 2, 0.5);
}

// Regularized incomplete beta — Lentz's continued-fraction algorithm
// (Numerical Recipes §6.4). Sufficient for our needs.
function regIncompleteBeta(x: number, a: number, b: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  // For numerical stability, swap to the side where the cf converges fast.
  if (x > (a + 1) / (a + b + 2)) {
    return 1 - regIncompleteBeta(1 - x, b, a);
  }
  const lnBeta = lgamma(a) + lgamma(b) - lgamma(a + b);
  const front = Math.exp(Math.log(x) * a + Math.log(1 - x) * b - lnBeta) / a;
  const cf = betacf(x, a, b);
  return front * cf;
}

function betacf(x: number, a: number, b: number): number {
  const MAX_IT = 200;
  const EPS = 3e-7;
  const FPMIN = 1e-300;
  const qab = a + b;
  const qap = a + 1;
  const qam = a - 1;
  let c = 1;
  let d = 1 - (qab * x) / qap;
  if (Math.abs(d) < FPMIN) d = FPMIN;
  d = 1 / d;
  let h = d;
  for (let m = 1; m <= MAX_IT; m++) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1 + aa / c;
    if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d;
    h *= d * c;
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1 + aa / c;
    if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < EPS) break;
  }
  return h;
}

// log gamma — Stirling-corrected Lanczos approximation (g=7, n=9). ~1e-15
// accuracy for x>0.5; sufficient for df we'll see.
function lgamma(x: number): number {
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  if (x < 0.5) {
    // reflection
    return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
  }
  x -= 1;
  let a = c[0]!;
  const t = x + 7.5;
  for (let i = 1; i < 9; i++) a += c[i]! / (x + i);
  return (
    0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a)
  );
}
