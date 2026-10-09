import { createContext, type ComponentContext } from "@alloy-js/core";
import type { ApiModel } from "@microsoft/api-extractor-model";

export const ApiModelContext: ComponentContext<ApiModel> = createContext();
