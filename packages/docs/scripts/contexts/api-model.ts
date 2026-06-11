import { createContext, type ComponentContext } from "@alloy-js/core";
import type { ApiModel } from "../model/index.js";

export const ApiModelContext: ComponentContext<ApiModel> = createContext();
