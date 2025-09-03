import { ModuleDirectory } from "#components/ModuleDirectory.jsx";
import { SourceDirectory } from "#components/SourceDirectory.jsx";
import { SourceFile } from "#components/SourceFile.jsx";
import { List, Output, refkey, render } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { assertFileContents, TestPackage } from "../../../test/utils.js";
import { TypeDeclaration } from "../type/declaration.js";
import {
  InterfaceDeclaration,
  InterfaceEmbed,
  InterfaceFunction,
  TypeConstraint,
} from "./declaration.jsx";

function Wrapper(props: { children: any }) {
  return (
    <TestPackage>
      <TypeDeclaration name="TestInterface" exported>
        <InterfaceDeclaration>{props.children}</InterfaceDeclaration>
      </TypeDeclaration>
    </TestPackage>
  );
}

it("declares interface with no members", () => {
  expect(
    <TestPackage>
      <TypeDeclaration name="Test">
        <InterfaceDeclaration />
      </TypeDeclaration>
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    type test interface{}
  `);
});

it("specify doc comment", () => {
  expect(
    <TestPackage>
      <TypeDeclaration name="Test" doc="This is a test">
        <InterfaceDeclaration />
      </TypeDeclaration>
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    // This is a test
    type test interface{}
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
//           <InterfaceDeclaration public name="Test" typeParameters={typeParameters}>
//             <List>
//               <Property name="PropA" type={typeParameters[0].refkey} get set />
//               <Property name="PropB" type={typeParameters[1].refkey} get set />
//             </List>
//           </InterfaceDeclaration>
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
//           <InterfaceDeclaration public name="Test" typeParameters={typeParameters}>
//             // Body
//           </InterfaceDeclaration>
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
      <TypeDeclaration exported name="TestInterface">
        <InterfaceDeclaration>
          <List>
            <InterfaceFunction
              exported
              name="FunctionOne"
              parameters={[{ name: "hi", type: "string" }]}
              returns={"string"}
            />
            <InterfaceFunction name="functionTwo" returns="int" />
          </List>
        </InterfaceDeclaration>
      </TypeDeclaration>
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    type TestInterface interface {
      func FunctionOne(hi string) string
      func functionTwo() int
    }
  `);
});

describe("naming", () => {
  it("public field is PascalCase", () => {
    expect(
      <Wrapper>
        <List>
          <InterfaceFunction exported name="memberOne" returns="string" />
        </List>
      </Wrapper>,
    ).toRenderTo(`
      package alloy

      type TestInterface interface {
        func MemberOne() string
      }
    `);
  });

  it("private field are camelCase", () => {
    expect(
      <Wrapper>
        <List>
          <InterfaceFunction name="MemberOne" returns="string" />
        </List>
      </Wrapper>,
    ).toRenderTo(`
    package alloy

    type TestInterface interface {
      func memberOne() string
    }
  `);
  });
});

describe("embedded", () => {
  it("embed using children", () => {
    const TestInterfaceEmbed = refkey("TestInterfaceEmbed");
    expect(
      <TestPackage>
        <TypeDeclaration name="TestInterface" exported>
          <InterfaceDeclaration>
            <List>
              <InterfaceFunction exported name="MemberOne" returns="string" />
            </List>
          </InterfaceDeclaration>
        </TypeDeclaration>
        <hbr />
        <TypeDeclaration name="TestInterface2" exported>
          <InterfaceDeclaration>
            <List>
              <InterfaceEmbed refkey={TestInterfaceEmbed}>
                TestInterface
              </InterfaceEmbed>
              <InterfaceFunction exported name="MemberOne" returns="string" />
            </List>
          </InterfaceDeclaration>
        </TypeDeclaration>
        <hbr />
        {TestInterfaceEmbed}
      </TestPackage>,
    ).toRenderTo(`
      package alloy

      type TestInterface interface {
        func MemberOne() string
      }
      type TestInterface2 interface {
        TestInterface
        func MemberOne() string
      }
      TestInterface2.TestInterface
    `);
  });

  it("embed using refkey", () => {
    const TestInterface = refkey("TestInterface");
    const TestInterfaceEmbed = refkey("TestInterfaceEmbed");

    expect(
      <TestPackage>
        <TypeDeclaration name="TestInterface" refkey={TestInterface} exported>
          <InterfaceDeclaration>
            <List>
              <InterfaceFunction exported name="MemberOne" returns="string" />
            </List>
          </InterfaceDeclaration>
        </TypeDeclaration>
        <hbr />
        <TypeDeclaration name="TestInterface2" exported>
          <InterfaceDeclaration>
            <List>
              <InterfaceEmbed refkey={TestInterfaceEmbed}>
                {TestInterface}
              </InterfaceEmbed>
              <InterfaceFunction exported name="MemberOne" returns="string" />
            </List>
          </InterfaceDeclaration>
        </TypeDeclaration>
        <hbr />
        {TestInterfaceEmbed}
      </TestPackage>,
    ).toRenderTo(`
      package alloy

      type TestInterface interface {
        func MemberOne() string
      }
      type TestInterface2 interface {
        TestInterface
        func MemberOne() string
      }
      TestInterface2.TestInterface
    `);
  });

  it("embed using cross-package refkey", () => {
    const TestInterface = refkey("TestInterface");
    const TestInterfaceEmbed = refkey("TestInterfaceEmbed");

    const res = render(
      <Output>
        <ModuleDirectory name="github.com/alloy-framework/alloy">
          <SourceDirectory path=".">
            <SourceDirectory path="hello">
              <SourceFile path="types.go">
                <TypeDeclaration
                  name="TestInterface"
                  refkey={TestInterface}
                  exported
                >
                  <InterfaceDeclaration>
                    <List>
                      <InterfaceFunction
                        exported
                        name="MemberOne"
                        returns="string"
                      />
                    </List>
                  </InterfaceDeclaration>
                </TypeDeclaration>
              </SourceFile>
            </SourceDirectory>
            <SourceFile path="Test.go">
              <TypeDeclaration name="TestInterface2" exported>
                <InterfaceDeclaration>
                  <List>
                    <InterfaceEmbed refkey={TestInterfaceEmbed}>
                      {TestInterface}
                    </InterfaceEmbed>
                    <InterfaceFunction
                      exported
                      name="MemberOne"
                      returns="string"
                    />
                  </List>
                </InterfaceDeclaration>
              </TypeDeclaration>
              <hbr />
              {TestInterfaceEmbed}
            </SourceFile>
          </SourceDirectory>
        </ModuleDirectory>
      </Output>,
    );

    assertFileContents(res, {
      "hello/types.go": `
        package hello

        type TestInterface interface {
          func MemberOne() string
        }
      `,
      "Test.go": `
        package alloy

        import "github.com/alloy-framework/alloy/hello"

        type TestInterface2 interface {
          hello.TestInterface
          func MemberOne() string
        }
        TestInterface2.TestInterface
      `,
    });
  });
});

describe("constraints", () => {
  it("test single constraint", () => {
    const TestInterface = refkey("TestInterface");
    expect(
      <TestPackage>
        <TypeDeclaration name="TestInterface" exported refkey={TestInterface}>
          <InterfaceDeclaration>
            <List>
              <InterfaceFunction exported name="MemberOne" returns="string" />
            </List>
          </InterfaceDeclaration>
        </TypeDeclaration>
        <hbr />
        <TypeDeclaration name="TestInterface2" exported>
          <InterfaceDeclaration>
            <List>
              <TypeConstraint>{TestInterface}</TypeConstraint>
              <InterfaceFunction exported name="MemberOne" returns="string" />
            </List>
          </InterfaceDeclaration>
        </TypeDeclaration>
      </TestPackage>,
    ).toRenderTo(`
      package alloy

      type TestInterface interface {
        func MemberOne() string
      }
      type TestInterface2 interface {
        TestInterface
        func MemberOne() string
      }
    `);
  });

  it("test multiple constraint", () => {
    const TestInterface = refkey("TestInterface");
    expect(
      <TestPackage>
        <TypeDeclaration name="TestInterface" exported refkey={TestInterface}>
          <InterfaceDeclaration>
            <List>
              <InterfaceFunction exported name="MemberOne" returns="string" />
            </List>
          </InterfaceDeclaration>
        </TypeDeclaration>
        <hbr />
        <TypeDeclaration name="TestInterface2" exported>
          <InterfaceDeclaration>
            <List>
              <TypeConstraint>{TestInterface}</TypeConstraint>
              <TypeConstraint constraints={[TestInterface, "string", "~int"]} />
              <InterfaceFunction exported name="MemberOne" returns="string" />
            </List>
          </InterfaceDeclaration>
        </TypeDeclaration>
      </TestPackage>,
    ).toRenderTo(`
      package alloy

      type TestInterface interface {
        func MemberOne() string
      }
      type TestInterface2 interface {
        TestInterface
        TestInterface | string | ~int
        func MemberOne() string
      }
    `);
  });
});
