import {
  CommonFormatOptions,
  createFormatOptionsContextFor,
} from "@alloy-js/core";

export interface TypeSpecFormatOptions extends CommonFormatOptions {}

export const {
  Provider: TypeSpecFormatOptions,
  useFormatOptions: useTypeSpecFormatOptions,
} = createFormatOptionsContextFor<TypeSpecFormatOptions>("typespec", {
  tabWidth: 4,
  printWidth: 120,
});
