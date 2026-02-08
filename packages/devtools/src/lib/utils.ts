import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Normalize a raw file path: strip leading `./`, convert backslashes to forward slashes. */
export function normalizePath(raw: string): string {
  return String(raw ?? "").replace(/^\.\/?/, "").replace(/\\/g, "/");
}
