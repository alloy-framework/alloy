import { SymbolCreator } from "@alloy-js/core";
import { createModule } from "../create-module.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type dummy = SymbolCreator;

export const abcModule = createModule({
  name: "abc",
  descriptor: {
    ".": ["abstractmethod"],
  },
});

export const dataclassesModule = createModule({
  name: "dataclasses",
  descriptor: {
    ".": ["dataclass", "KW_ONLY"],
  },
});

export const enumModule = createModule({
  name: "enum",
  descriptor: {
    ".": ["auto", "Enum", "Flag", "IntEnum", "IntFlag", "StrEnum"],
  },
});

export const requestsModule = createModule({
  name: "requests",
  descriptor: {
    ".": ["get", "post", "put", "delete", "patch", "head", "options"],
    models: ["Response", "Request"],
  },
});

export const pydanticModule = createModule({
  name: "pydantic",
  descriptor: {
    ".": [
      "AfterValidator",
      "BaseModel",
      "BeforeValidator",
      "ConfigDict",
      "EmailStr",
      "Field",
      "HttpUrl",
      "PlainSerializer",
      "RootModel",
      "SecretStr",
      "TypeAdapter",
      "ValidationError",
      "WrapValidator",
      "computed_field",
      "field_serializer",
      "field_validator",
      "model_serializer",
      "model_validator",
    ],
    alias_generators: ["to_camel", "to_pascal", "to_snake"],
    types: ["PositiveFloat", "PositiveInt"],
  },
});

/** `typing` stdlib symbols used heavily with Pydantic generics and annotations. */
export const typingModule = createModule({
  name: "typing",
  descriptor: {
    ".": [
      "Annotated",
      "Any",
      "ClassVar",
      "Generic",
      "Literal",
      "Optional",
      "Protocol",
      "TypeVar",
      "Union",
      // Class- and method-level decorators commonly stacked above the
      // intrinsic `class` / `def`.
      "final",
      "override",
      "runtime_checkable",
    ],
  },
});

export const pydanticSettingsModule = createModule({
  name: "pydantic_settings",
  descriptor: {
    ".": ["BaseSettings", "SettingsConfigDict"],
  },
});
