import { createModule } from "../create-module.js";

export const enumModule = createModule({
  name: "enum",
  version: "3.11",
  builtin: true,
  descriptor: {
    ".": {
      named: [
        "auto",
        "Enum",
        "Flag",
        "IntEnum",
        "IntFlag",
        "StrEnum",
      ],
    },
  },
});