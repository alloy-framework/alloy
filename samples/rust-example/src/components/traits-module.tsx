import { Children, refkey } from "@alloy-js/core";
import {
  DocComment,
  FunctionDeclaration,
  ModuleDirectory,
  Reference,
  SourceFile,
  TraitDeclaration,
} from "@alloy-js/rust";
import { resultAliasKey } from "./error-module.js";

export const serializableKey = refkey();
export const cacheableKey = refkey();

export interface TraitsModuleProps {
  children?: Children;
}

export function TraitsModule(props: TraitsModuleProps) {
  return (
    <ModuleDirectory path="traits" pub>
      <SourceFile path="mod.rs">
        <DocComment>
          Traits defining serialization and caching behavior.
        </DocComment>

        <TraitDeclaration
          name="Serializable"
          refkey={serializableKey}
          pub
          doc="A trait for types that can be serialized to and deserialized from bytes."
        >
          <FunctionDeclaration
            name="to_bytes"
            receiver="&self"
            returnType={
              <>
                <Reference refkey={resultAliasKey} />
                {"<Vec<u8>>"}
              </>
            }
          />

          <hbr />

          <FunctionDeclaration
            name="from_bytes"
            receiver="none"
            parameters={[{ name: "bytes", type: "&[u8]" }]}
            returnType={
              <>
                <Reference refkey={resultAliasKey} />
                {"<Self>"}
              </>
            }
            whereClause="Self: Sized"
          />
        </TraitDeclaration>

        <hbr />

        <DocComment>
          A trait for types that support caching with expiration.
        </DocComment>
        <TraitDeclaration
          name="Cacheable"
          refkey={cacheableKey}
          pub
          typeParameters={[{ name: "V", constraint: "Clone + Send + Sync" }]}
        >
          <FunctionDeclaration
            name="cache_key"
            receiver="&self"
            returnType="String"
          />

          <hbr />

          <FunctionDeclaration
            name="is_expired"
            receiver="&self"
            returnType="bool"
          />

          <hbr />

          <FunctionDeclaration
            name="cached_value"
            receiver="&self"
            returnType="Option<&V>"
          />
        </TraitDeclaration>
      </SourceFile>
    </ModuleDirectory>
  );
}
