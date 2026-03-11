import { code, Children, refkey } from "@alloy-js/core";
import {
  DocComment,
  EnumDeclaration,
  EnumVariant,
  FunctionDeclaration,
  ImplBlock,
  ModuleDirectory,
  SourceFile,
  TypeAlias,
} from "@alloy-js/rust";
import { std_fmt } from "../externals.js";

export const storeErrorKey = refkey();
export const resultAliasKey = refkey();

export interface ErrorModuleProps {
  children?: Children;
}

export function ErrorModule(props: ErrorModuleProps) {
  return (
    <ModuleDirectory path="error" pub>
      <SourceFile path="mod.rs">
        <DocComment>Error types for the key-value store.</DocComment>
        <EnumDeclaration
          name="StoreError"
          refkey={storeErrorKey}
          pub
          derives={["Debug", "Clone"]}
        >
          <EnumVariant name="NotFound" doc="The requested key was not found." />
          <EnumVariant
            name="StorageFull"
            doc="The store has reached its maximum capacity."
          />
          <EnumVariant name="SerializationError" doc="Failed to serialize or deserialize a value.">
            {code`String`}
          </EnumVariant>
          <EnumVariant name="LockError" doc="Failed to acquire a lock on the store.">
            {code`String`}
          </EnumVariant>
        </EnumDeclaration>

        <hbr />

        <ImplBlock
          type={storeErrorKey}
          trait={std_fmt.fmt.Display}
        >
          <FunctionDeclaration
            name="fmt"
            receiver="&self"
            parameters={[
              { name: "f", type: "&mut std::fmt::Formatter<'_>" },
            ]}
            returnType="std::fmt::Result"
          >
            {code`
              match self {
                  Self::NotFound => write!(f, "key not found"),
                  Self::StorageFull => write!(f, "storage is full"),
                  Self::SerializationError(msg) => write!(f, "serialization error: {}", msg),
                  Self::LockError(msg) => write!(f, "lock error: {}", msg),
              }
            `}
          </FunctionDeclaration>
        </ImplBlock>

        <hbr />

        <DocComment>A specialized Result type for store operations.</DocComment>
        <TypeAlias name="Result" refkey={resultAliasKey} pub typeParameters={[{ name: "T" }]}>
          {code`std::result::Result<T, StoreError>`}
        </TypeAlias>
      </SourceFile>
    </ModuleDirectory>
  );
}
