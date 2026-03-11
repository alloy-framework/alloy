import { code, Children, refkey } from "@alloy-js/core";
import {
  Attribute,
  ConstDeclaration,
  DocComment,
  Field,
  FunctionDeclaration,
  ImplBlock,
  SourceFile,
  StructDeclaration,
} from "@alloy-js/rust";

export const configKey = refkey();
export const maxEntriesKey = refkey();
export const defaultTtlSecsKey = refkey();

export interface ConfigFileProps {
  children?: Children;
}

export function ConfigFile(props: ConfigFileProps) {
  return (
    <SourceFile path="config.rs">
      <DocComment>Configuration for the key-value store.</DocComment>

      <ConstDeclaration
        name="MAX_ENTRIES"
        refkey={maxEntriesKey}
        pub
        type="usize"
      >
        {code`10_000`}
      </ConstDeclaration>

      <hbr />

      <ConstDeclaration
        name="DEFAULT_TTL_SECS"
        refkey={defaultTtlSecsKey}
        pub
        type="u64"
      >
        {code`3600`}
      </ConstDeclaration>

      <hbr />

      <DocComment>
        {`Configuration options for initializing a Store.\n\nUse the builder methods to customize behavior.`}
      </DocComment>
      <StructDeclaration
        name="Config"
        refkey={configKey}
        pub
        derives={["Debug", "Clone"]}
      >
        <Field name="max_capacity" pub type="usize" />
        <Field
          name="default_ttl"
          pub
          type="Option<std::time::Duration>"
        />
        <Field name="enable_eviction" pub type="bool" />
        <Field name="name" pub type="String" />
      </StructDeclaration>

      <hbr />

      <ImplBlock type={configKey}>
        <DocComment>Creates a new Config with sensible defaults.</DocComment>
        <FunctionDeclaration name="new" pub receiver="none" returnType="Self">
          {code`
            Self {
                max_capacity: MAX_ENTRIES,
                default_ttl: Some(Duration::from_secs(DEFAULT_TTL_SECS)),
                enable_eviction: true,
                name: String::from("default"),
            }
          `}
        </FunctionDeclaration>

        <hbr />

        <DocComment>Sets the maximum number of entries.</DocComment>
        <Attribute name="must_use" />
        <FunctionDeclaration
          name="with_max_capacity"
          pub
          receiver="self"
          parameters={[{ name: "capacity", type: "usize" }]}
          returnType="Self"
        >
          {code`
            Self {
                max_capacity: capacity,
                ..self
            }
          `}
        </FunctionDeclaration>

        <hbr />

        <DocComment>Sets the default TTL for entries.</DocComment>
        <Attribute name="must_use" />
        <FunctionDeclaration
          name="with_ttl"
          pub
          receiver="self"
          parameters={[
            { name: "ttl", type: "std::time::Duration" },
          ]}
          returnType="Self"
        >
          {code`
            Self {
                default_ttl: Some(ttl),
                ..self
            }
          `}
        </FunctionDeclaration>

        <hbr />

        <DocComment>Disables automatic eviction of expired entries.</DocComment>
        <Attribute name="must_use" />
        <FunctionDeclaration
          name="disable_eviction"
          pub
          receiver="self"
          returnType="Self"
        >
          {code`
            Self {
                enable_eviction: false,
                ..self
            }
          `}
        </FunctionDeclaration>

        <hbr />

        <DocComment>Sets the name of this store instance.</DocComment>
        <Attribute name="must_use" />
        <FunctionDeclaration
          name="with_name"
          pub
          receiver="self"
          parameters={[{ name: "name", type: <>&amp;str</> }]}
          returnType="Self"
        >
          {code`
            Self {
                name: name.to_owned(),
                ..self
            }
          `}
        </FunctionDeclaration>
      </ImplBlock>
    </SourceFile>
  );
}
