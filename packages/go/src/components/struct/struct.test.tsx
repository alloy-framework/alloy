import { List, Output, refkey, render } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { assertFileContents, TestPackage } from "../../../test/utils.js";
import { ModuleDirectory } from "../ModuleDirectory.js";
import { SourceDirectory } from "../SourceDirectory.js";
import { SourceFile } from "../SourceFile.js";
import { TypeConstraint } from "../interface/declaration.jsx";
import { Pointer } from "../pointer/pointer.js";
import { TypeDeclaration } from "../type/declaration.js";
import {
  StructDeclaration,
  StructEmbed,
  StructMember,
} from "./declaration.jsx";

function Wrapper(props: { children: any }) {
  return (
    <TestPackage>
      <TypeDeclaration name="TestStruct">
        <StructDeclaration>{props.children}</StructDeclaration>
      </TypeDeclaration>
    </TestPackage>
  );
}

it("declares struct with no members", () => {
  expect(
    <TestPackage>
      <TypeDeclaration name="test">
        <StructDeclaration />
      </TypeDeclaration>
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    type test struct{}
  `);
});

it("specify doc comment", () => {
  expect(
    <TestPackage>
      <TypeDeclaration name="test" doc="This is a test">
        <StructDeclaration />
      </TypeDeclaration>
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    // This is a test
    type test struct{}
  `);
});

// describe("with type parameters", () => {
//   it("reference parameters", () => {
//     const typeParameters: TypeParameterProps[] = [
//       {
//         name: "T",
//         refkey: refkey(),
//       },
//       {
//         name: "U",
//         refkey: refkey(),
//       },
//     ];
//
//     expect(
//       <TestPackage>
//         <TypeDeclaration name="Test">
//           <StructDeclaration public name="Test" typeParameters={typeParameters}>
//             <List>
//               <Property name="PropA" type={typeParameters[0].refkey} get set />
//               <Property name="PropB" type={typeParameters[1].refkey} get set />
//             </List>
//           </StructDeclaration>
//         </TypeDeclaration>
//       </TestPackage>,
//     ).toRenderTo(`
//       public struct Test<T, U>
//       {
//           T PropA { get; set; }
//           U PropB { get; set; }
//       }
//     `);
//   });
//
//   it("defines with constraints", () => {
//     const typeParameters: TypeParameterProps[] = [
//       {
//         name: "T",
//         constraints: "IFoo",
//       },
//       {
//         name: "U",
//         constraints: "IBar",
//       },
//     ];
//
//     expect(
//       <TestPackage>
//         <TypeDeclaration name="Test">
//           <StructDeclaration public name="Test" typeParameters={typeParameters}>
//             // Body
//           </StructDeclaration>
//         </TypeDeclaration>
//       </TestPackage>,
//     ).toRenderTo(`
//       public struct Test<T, U>
//           where T : IFoo
//           where U : IBar
//       {
//           // Body
//       }
//     `);
//   });
// });

it("defines fields", () => {
  expect(
    <TestPackage>
      <TypeDeclaration name="TestStruct">
        <StructDeclaration>
          <List>
            <StructMember name="MemberOne" type="string" />
            <StructMember name="memberTwo" type="int" />
          </List>
        </StructDeclaration>
      </TypeDeclaration>
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    type TestStruct struct {
      MemberOne string
      memberTwo int
    }
  `);
});

it("nested struct", () => {
  const Member1 = refkey("Member1");
  const Member2 = refkey("Member2");
  const Member3 = refkey("Member3");
  const Member4 = refkey("Member4");

  expect(
    <TestPackage>
      <TypeDeclaration name="TestStruct">
        <StructDeclaration>
          <List>
            <StructMember name="MemberOne" type="string" refkey={Member1} />
            <StructMember
              name="MemberTwo"
              refkey={Member2}
              type={
                <StructDeclaration>
                  <List>
                    <StructMember
                      name="MemberOne"
                      type="string"
                      refkey={Member3}
                    />
                    <StructMember
                      name="NestedMemberTwo"
                      type="int"
                      refkey={Member4}
                    />
                  </List>
                </StructDeclaration>
              }
            />
          </List>
        </StructDeclaration>
      </TypeDeclaration>
      <hbr />
      {Member1}
      <hbr />
      {Member2}
      <hbr />
      {Member3}
      <hbr />
      {Member4}
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    type TestStruct struct {
      MemberOne string
      MemberTwo struct {
        MemberOne string
        NestedMemberTwo int
      }
    }
    TestStruct.MemberOne
    TestStruct.MemberTwo
    TestStruct.MemberTwo.MemberOne
    TestStruct.MemberTwo.NestedMemberTwo
  `);
});

it("declares multiple fields", () => {
  expect(
    <Wrapper>
      <List>
        <StructMember name="MemberOne" type="string" />
        <StructMember name="MemberTwo" type="int" />
      </List>
    </Wrapper>,
  ).toRenderTo(`
    package alloy

    type TestStruct struct {
      MemberOne string
      MemberTwo int
    }
  `);
});

it("declares multiple fields with tags", () => {
  expect(
    <Wrapper>
      <List>
        <StructMember
          name="MemberOne"
          type="string"
          tag="this is arbitrary tag #1"
        />
        <StructMember
          name="MemberTwo"
          type="int"
          tag="this is arbitrary tag #2"
        />
      </List>
    </Wrapper>,
  ).toRenderTo(`
    package alloy

    type TestStruct struct {
      MemberOne string "this is arbitrary tag #1"
      MemberTwo int "this is arbitrary tag #2"
    }
  `);
});

it("declares multiple fields with tag object", () => {
  expect(
    <Wrapper>
      <List>
        <StructMember
          name="MemberOne"
          type="string"
          tag={{ json: "member_one,omit_empty" }}
        />
        <StructMember
          name="MemberTwo"
          type="int"
          tag={{ xml: "member_two,omit_empty", yaml: "memberTwo" }}
        />
      </List>
    </Wrapper>,
  ).toRenderTo(`
    package alloy

    type TestStruct struct {
      MemberOne string \`json:"member_one,omit_empty"\`
      MemberTwo int \`xml:"member_two,omit_empty" yaml:"memberTwo"\`
    }
  `);
});

describe("naming", () => {
  it("public field is PascalCase", () => {
    expect(
      <Wrapper>
        <List>
          <StructMember name="MemberOne" type="string" />
        </List>
      </Wrapper>,
    ).toRenderTo(`
      package alloy

      type TestStruct struct {
        MemberOne string
      }
    `);
  });

  it("private field are camelCase", () => {
    expect(
      <Wrapper>
        <List>
          <StructMember name="memberOne" type="string" />
        </List>
      </Wrapper>,
    ).toRenderTo(`
    package alloy

    type TestStruct struct {
      memberOne string
    }
  `);
  });
});

describe("embedded", () => {
  it("embed using children", () => {
    const TestStructEmbed = refkey("TestStructEmbed");
    expect(
      <TestPackage>
        <TypeDeclaration name="TestStruct">
          <StructDeclaration>
            <List>
              <StructMember name="MemberOne" type="string" />
            </List>
          </StructDeclaration>
        </TypeDeclaration>
        <hbr />
        <TypeDeclaration name="TestStruct2">
          <StructDeclaration>
            <List>
              <StructEmbed refkey={TestStructEmbed}>TestStruct</StructEmbed>
              <StructMember name="MemberOne" type="string" />
            </List>
          </StructDeclaration>
        </TypeDeclaration>
        <hbr />
        {TestStructEmbed}
      </TestPackage>,
    ).toRenderTo(`
      package alloy

      type TestStruct struct {
        MemberOne string
      }
      type TestStruct2 struct {
        TestStruct
        MemberOne string
      }
      TestStruct2.TestStruct
    `);
  });

  it("embed using refkey", () => {
    const TestStruct = refkey("TestStruct");
    const TestStructEmbed = refkey("TestStructEmbed");

    expect(
      <TestPackage>
        <TypeDeclaration name="TestStruct" refkey={TestStruct}>
          <StructDeclaration>
            <List>
              <StructMember name="MemberOne" type="string" />
            </List>
          </StructDeclaration>
        </TypeDeclaration>
        <hbr />
        <TypeDeclaration name="TestStruct2">
          <StructDeclaration>
            <List>
              <StructEmbed refkey={TestStructEmbed}>{TestStruct}</StructEmbed>
              <StructMember name="MemberOne" type="string" />
            </List>
          </StructDeclaration>
        </TypeDeclaration>
        <hbr />
        {TestStructEmbed}
      </TestPackage>,
    ).toRenderTo(`
      package alloy

      type TestStruct struct {
        MemberOne string
      }
      type TestStruct2 struct {
        TestStruct
        MemberOne string
      }
      TestStruct2.TestStruct
    `);
  });

  it("embed using cross-package refkey", () => {
    const TestStruct = refkey("TestStruct");
    const TestStructEmbed = refkey("TestStructEmbed");

    const res = render(
      <Output>
        <ModuleDirectory name="github.com/alloy-framework/alloy">
          <SourceDirectory path=".">
            <SourceDirectory path="hello">
              <SourceFile path="types.go">
                <TypeDeclaration name="TestStruct" refkey={TestStruct}>
                  <StructDeclaration>
                    <List>
                      <StructMember name="MemberOne" type="string" />
                    </List>
                  </StructDeclaration>
                </TypeDeclaration>
              </SourceFile>
            </SourceDirectory>
            <SourceFile path="Test.go">
              <TypeDeclaration name="TestStruct2">
                <StructDeclaration>
                  <List>
                    <StructEmbed refkey={TestStructEmbed}>
                      {TestStruct}
                    </StructEmbed>
                    <StructMember name="MemberOne" type="string" />
                  </List>
                </StructDeclaration>
              </TypeDeclaration>
              <hbr />
              {TestStructEmbed}
            </SourceFile>
          </SourceDirectory>
        </ModuleDirectory>
      </Output>,
    );

    assertFileContents(res, {
      "hello/types.go": `
        package hello

        type TestStruct struct {
          MemberOne string
        }
      `,
      "Test.go": `
        package alloy

        import "github.com/alloy-framework/alloy/hello"

        type TestStruct2 struct {
          hello.TestStruct
          MemberOne string
        }
        TestStruct2.TestStruct
      `,
    });
  });

  it("embed using cross-package refkey pointer", () => {
    const TestStruct = refkey("TestStruct");
    const TestStructEmbed = refkey("TestStructEmbed");

    const res = render(
      <Output>
        <ModuleDirectory name="github.com/alloy-framework/alloy">
          <SourceDirectory path=".">
            <SourceDirectory path="hello">
              <SourceFile path="types.go">
                <TypeDeclaration name="TestStruct" refkey={TestStruct}>
                  <StructDeclaration>
                    <List>
                      <StructMember name="MemberOne" type="string" />
                    </List>
                  </StructDeclaration>
                </TypeDeclaration>
              </SourceFile>
            </SourceDirectory>
            <SourceFile path="Test.go">
              <TypeDeclaration name="TestStruct2">
                <StructDeclaration>
                  <List>
                    <StructEmbed refkey={TestStructEmbed}>
                      <Pointer>{TestStruct}</Pointer>
                    </StructEmbed>
                    <StructMember name="MemberOne" type="string" />
                  </List>
                </StructDeclaration>
              </TypeDeclaration>
              <hbr />
              {TestStructEmbed}
            </SourceFile>
          </SourceDirectory>
        </ModuleDirectory>
      </Output>,
    );

    assertFileContents(res, {
      "hello/types.go": `
        package hello

        type TestStruct struct {
          MemberOne string
        }
      `,
      "Test.go": `
        package alloy

        import "github.com/alloy-framework/alloy/hello"

        type TestStruct2 struct {
          *hello.TestStruct
          MemberOne string
        }
        TestStruct2.TestStruct
      `,
    });
  });
});

describe("type parameters", () => {
  it("single type parameter", () => {
    const T = refkey("T");

    expect(
      <TestPackage>
        <TypeDeclaration
          name="TestStruct"
          typeParameters={[{ name: "T", constraint: "any", refkey: T }]}
        >
          <StructDeclaration>
            <List>
              <StructMember name="MemberOne" type={T} />
            </List>
          </StructDeclaration>
        </TypeDeclaration>
      </TestPackage>,
    ).toRenderTo(`
      package alloy

      type TestStruct[T any] struct {
        MemberOne T
      }
    `);
  });

  it("multiple type parameters", () => {
    const TestStructType = refkey("TestStructType");
    const U = refkey("U");

    expect(
      <TestPackage>
        <TypeDeclaration name="TestStructType" refkey={TestStructType}>
          <StructDeclaration>
            <List>
              <StructMember name="MemberOne" type="string" />
            </List>
          </StructDeclaration>
        </TypeDeclaration>
        <hbr />
        <TypeDeclaration
          name="TestStruct"
          typeParameters={[
            {
              name: "T",
              constraint: <TypeConstraint constraints={["string", "int"]} />,
            },
            { name: "U", constraint: TestStructType, refkey: U },
          ]}
        >
          <StructDeclaration>
            <List>
              <StructMember name="MemberOne" type={U} />
            </List>
          </StructDeclaration>
        </TypeDeclaration>
      </TestPackage>,
    ).toRenderTo(`
    package alloy

    type TestStructType struct {
      MemberOne string
    }
    type TestStruct[T string | int, U TestStructType] struct {
      MemberOne U
    }
  `);
  });

  it("type parameter overflow", () => {
    expect(
      <TestPackage>
        <TypeDeclaration
          name="TestStruct"
          typeParameters={[
            {
              name: "T",
              constraint: <TypeConstraint constraints={["string", "int"]} />,
            },
            {
              name: "T",
              constraint: <TypeConstraint constraints={["string", "int"]} />,
            },
            {
              name: "T",
              constraint: <TypeConstraint constraints={["string", "int"]} />,
            },
            {
              name: "T",
              constraint: <TypeConstraint constraints={["string", "int"]} />,
            },
            {
              name: "T",
              constraint: <TypeConstraint constraints={["string", "int"]} />,
            },
          ]}
        >
          <StructDeclaration>
            <List>
              <StructMember name="MemberOne" type="string" />
            </List>
          </StructDeclaration>
        </TypeDeclaration>
      </TestPackage>,
    ).toRenderTo(`
    package alloy

    type TestStruct[
      T string | int,
      T_2 string | int,
      T_3 string | int,
      T_4 string | int,
      T_5 string | int,
    ] struct {
      MemberOne string
    }
  `);
  });
});
