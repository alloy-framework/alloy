import { ClassDeclaration } from "#components/class/declaration.jsx";
import { EnumDeclaration } from "#components/enum/declaration.jsx";
import { EnumMember } from "#components/enum/member.jsx";
import { Method } from "#components/method/method.jsx";
import { Namespace } from "#components/namespace.jsx";
import { SourceFile } from "#components/source-file/source-file.jsx";
import { Output, refkey } from "@alloy-js/core";
import * as coretest from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { createCSharpNamePolicy } from "../../name-policy.js";

it("using on source file are placed above file namespace statement", () => {
  expect(
    <Output>
      <Namespace name="TestCode">
        <SourceFile path="Test1.cs" using={["Foo"]} />
      </Namespace>
    </Output>,
  ).toRenderTo(`
    using Foo;

    namespace TestCode;

    
  `);
});

it("adds using statement across namespaces", () => {
  const inputTypeRefkey = refkey();
  const outputTypeRefkey = refkey();
  const twoValRefkey = refkey();

  const params = [
    {
      name: "BodyParam",
      type: inputTypeRefkey,
    },
  ];

  expect(
    <Output namePolicy={createCSharpNamePolicy()}>
      <Namespace name="Models">
        <SourceFile path="Models.cs">
          <ClassDeclaration public name="Input" refkey={inputTypeRefkey} />
          <hbr />
          <ClassDeclaration public name="Output" refkey={outputTypeRefkey} />
          <hbr />
          <EnumDeclaration public name="TestEnum">
            <EnumMember name="One" />,<hbr />
            <EnumMember name="Two" refkey={twoValRefkey} />
          </EnumDeclaration>
        </SourceFile>
      </Namespace>
      <Namespace name="Client">
        <SourceFile path="Client.cs" using={["System"]}>
          <ClassDeclaration public name="Client">
            <Method
              public
              name="MethodOne"
              parameters={params}
              returns={outputTypeRefkey}
            />
          </ClassDeclaration>
          <hbr />
          {twoValRefkey};
        </SourceFile>
      </Namespace>
    </Output>,
  ).toRenderTo({
    "Models.cs": coretest.d`
      namespace Models;

      public class Input;
      public class Output;
      public enum TestEnum
      {
          One,
          Two
      }
    `,
    "Client.cs": coretest.d`
      using Models;
      using System;

      namespace Client;
      
      public class Client
      {
          public Output MethodOne(Input bodyParam) {}
      }
      TestEnum.Two;
    `,
  });
});
