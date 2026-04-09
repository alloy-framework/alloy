import { createNamedContext, useContext } from "../context.js";
import { PrintTreeOptions } from "../render.js";

export interface CommonFormatOptions extends PrintTreeOptions {}

/**
 * Base format options provider and consumer for all file types. Language
 * packages create their own via {@link createFormatOptionsContextFor}.
 */
export const { Provider: FormatOptions, useFormatOptions } =
  createFormatOptionsContextFor<CommonFormatOptions>("*");

/**
 * Create a format options context for a specific file type. Returns a
 * `Provider` component and a `useFormatOptions` hook.
 *
 * @remarks
 *
 * Merge precedence: `defaults` (lowest) → Provider `value` → `overrides`
 * argument to `useFormatOptions()` (highest). Undefined override values are
 * ignored.
 */
export function createFormatOptionsContextFor<T>(
  filetype: string,
  defaults?: T,
) {
  const context = createNamedContext<T>(`FormatOptions.${filetype}`);
  return {
    Provider: context.Provider,
    useFormatOptions: (overrides?: Partial<T>): T => {
      const base = { ...defaults, ...useContext(context) };
      if (overrides === undefined) {
        return base as any;
      }
      const result: any = { ...base };
      for (const [key, value] of Object.entries(overrides)) {
        if (value !== undefined) {
          result[key] = value;
        }
      }
      return result;
    },
  };
}
