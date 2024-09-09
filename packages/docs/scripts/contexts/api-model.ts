import { createContext, type ComponentContext } from "@alloy-js/core";
import { ApiModel } from "@microsoft/api-extractor-model";

export const ApiModelContext: ComponentContext<ApiModel> = createContext();
