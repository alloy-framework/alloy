import { inspect } from "../inspect.js";

export function pret(
  strings: TemplateStringsArray,
  ...keys: PrettyStringSegment[]
): PrettyString {
  const result: PrettyStringSegment[] = [strings[0]];
  keys.forEach((key, i) => {
    result.push(key);
    result.push(strings[i + 1]);
  });

  return new PrettyString(result);
}

pret.black = (x: PrettyStringSegment) => new PrettyStringColored(x, "black");
pret.red = (x: PrettyStringSegment) => new PrettyStringColored(x, "red");
pret.green = (x: PrettyStringSegment) => new PrettyStringColored(x, "green");
pret.yellow = (x: PrettyStringSegment) => new PrettyStringColored(x, "yellow");
pret.blue = (x: PrettyStringSegment) => new PrettyStringColored(x, "blue");
pret.magenta = (x: PrettyStringSegment) =>
  new PrettyStringColored(x, "magenta");
pret.cyan = (x: PrettyStringSegment) => new PrettyStringColored(x, "cyan");
pret.white = (x: PrettyStringSegment) => new PrettyStringColored(x, "white");
pret.gray = (x: PrettyStringSegment) => new PrettyStringColored(x, "gray");

pret.bgBlack = (x: PrettyStringSegment) =>
  new PrettyStringColored(x, "bgBlack");
pret.bgRed = (x: PrettyStringSegment) => new PrettyStringColored(x, "bgRed");
pret.bgGreen = (x: PrettyStringSegment) =>
  new PrettyStringColored(x, "bgGreen");
pret.bgYellow = (x: PrettyStringSegment) =>
  new PrettyStringColored(x, "bgYellow");
pret.bgBlue = (x: PrettyStringSegment) => new PrettyStringColored(x, "bgBlue");
pret.bgMagenta = (x: PrettyStringSegment) =>
  new PrettyStringColored(x, "bgMagenta");
pret.bgCyan = (x: PrettyStringSegment) => new PrettyStringColored(x, "bgCyan");
pret.bgWhite = (x: PrettyStringSegment) =>
  new PrettyStringColored(x, "bgWhite");

const ansiColors = {
  reset: ["\x1b[0m", "\x1b[0m"],
  bold: ["\x1b[1m", "\x1b[22m"],
  dim: ["\x1b[2m", "\x1b[22m"],
  italic: ["\x1b[3m", "\x1b[23m"],
  underline: ["\x1b[4m", "\x1b[24m"],
  inverse: ["\x1b[7m", "\x1b[27m"],
  hidden: ["\x1b[8m", "\x1b[28m"],
  strikethrough: ["\x1b[9m", "\x1b[29m"],
  black: ["\x1b[30m", "\x1b[39m"],
  red: ["\x1b[31m", "\x1b[39m"],
  green: ["\x1b[32m", "\x1b[39m"],
  yellow: ["\x1b[33m", "\x1b[39m"],
  blue: ["\x1b[34m", "\x1b[39m"],
  magenta: ["\x1b[35m", "\x1b[39m"],
  cyan: ["\x1b[36m", "\x1b[39m"],
  white: ["\x1b[37m", "\x1b[39m"],
  gray: ["\x1b[90m", "\x1b[39m"],
  bgBlack: ["\x1b[40m", "\x1b[49m"],
  bgRed: ["\x1b[41m", "\x1b[49m"],
  bgGreen: ["\x1b[42m", "\x1b[49m"],
  bgYellow: ["\x1b[43m", "\x1b[49m"],
  bgBlue: ["\x1b[44m", "\x1b[49m"],
  bgMagenta: ["\x1b[45m", "\x1b[49m"],
  bgCyan: ["\x1b[46m", "\x1b[49m"],
  bgWhite: ["\x1b[47m", "\x1b[49m"],
} as Record<string, [string, string]>;

export type PrettyStringSegment = string | PrettyStringColored | PrettyString;
export class PrettyStringColored {
  #value: PrettyStringSegment;
  #color: string;

  constructor(value: PrettyStringSegment, color: string) {
    this.#value = value;
    this.#color = color;
  }

  toString(): string {
    return this.#value.toString();
  }

  toAnsi(): string {
    const [start, end] = ansiColors[this.#color];
    return `${start}${typeof this.#value === "string" ? this.#value : this.#value.toAnsi()}${end}`;
  }
}

export class PrettyString {
  #segments: PrettyStringSegment[];

  constructor(segments: PrettyStringSegment[]) {
    this.#segments = segments;
  }

  toString(): string {
    return this.#segments
      .map((s) => (typeof s === "string" ? s : s.toString()))
      .join("");
  }

  toAnsi(): string {
    return this.#segments
      .map((s) => (typeof s === "string" ? s : s.toAnsi()))
      .join("");
  }

  [inspect.custom]() {
    return this.toAnsi();
  }
}
