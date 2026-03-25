import { dirname, join, relative } from "pathe";

export type ValueOrArray<T> = T | T[];

export type Optional<T> = T | undefined;

export function joinPath(...parts: string[]) {
  if (parts.length === 0) {
    return "";
  }
  const first = parts[0];
  const prefix = first.startsWith("./") ? "./" : "";
  return prefix + join(...parts);
}

export function relativePath(from: string, to: string) {
  const result = relative(dirname(from), to);
  if (result === "") return "./";
  if (!result.startsWith(".")) return "./" + result;
  return result;
}
