import { createNamedContext, useContext } from "../context.js";

export interface CommonFormatOptions {
  /**
   * The number of characters the printer will wrap on.
   */
  printWidth?: number;

  /**
   * Whether to use tabs instead of spaces for indentation.
   */
  useTabs?: boolean;

  /**
   * The number of spaces to use for indentation.
   */
  tabWidth?: number;
}

export const { Provider: FormatOptions, useFormatOptions } =
  createFormatOptionsContextFor<CommonFormatOptions>("*");

/** Create a format options context for a specific file type */
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
