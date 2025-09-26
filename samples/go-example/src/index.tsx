import {
  code,
  List,
  namekey,
  Output,
  render,
  writeOutput,
} from "@alloy-js/core";
import * as go from "@alloy-js/go";

const aRef = namekey("a");
const bRef = namekey("b");
const personRef = namekey("Person");
const employeeRef = namekey("Employee");
const employeeRecRef1 = namekey("e");
const employeeRecRef2 = namekey("e2");
const paramRef1 = namekey("param");
const paramRef2 = namekey("param");
const paramRef3 = namekey("param");
const paramRef4 = namekey("param");
const typeParamRef = namekey("T");
const variantRef = namekey("Variants");
const aliceRef = namekey("Alice");
const output = render(
  <Output>
    <go.ModuleDirectory name="github.com/alloy-framework/alloy">
      <go.SourceDirectory path="lib">
        <go.SourceFile path="file1.go">
          <go.LineComment>This is a line comment</go.LineComment>
          <hbr />
          <go.BlockComment>This is a block comment</go.BlockComment>
          <hbr />
          <go.FunctionDeclaration
            name="Add"
            parameters={[
              { name: aRef, type: "int" },
              { name: bRef, type: "int" },
            ]}
            returns={"int"}
          >
            {code`
              return ${aRef} + ${bRef}
            `}
          </go.FunctionDeclaration>
          <hbr />
          <go.StructTypeDeclaration name={personRef}>
            <List>
              <go.StructMember name={namekey("Name")} type="string" />
              <go.StructMember name={namekey("Age")} type="int" />
            </List>
          </go.StructTypeDeclaration>
          <hbr />
          <go.StructTypeDeclaration name={employeeRef}>
            <List>
              <go.StructEmbed>{personRef}</go.StructEmbed>
              <go.StructMember name={namekey("Company")} type="string" />
              <go.StructMember
                name={namekey("Coordinates")}
                tag={{ json: "coordinates" }}
                type={
                  <go.StructDeclaration>
                    <List>
                      <go.StructMember name={namekey("Lat")} type="float64" />
                      <go.StructMember name={namekey("Long")} type="float64" />
                    </List>
                  </go.StructDeclaration>
                }
              />
            </List>
          </go.StructTypeDeclaration>
          <hbr />
          <go.FunctionDeclaration
            name={namekey("AgeSum")}
            receiver={
              <go.FunctionReceiver name={employeeRecRef1} type={employeeRef} />
            }
            parameters={[
              { name: paramRef1, type: "int" },
              { name: paramRef2, type: "int" },
            ]}
            returns={"int"}
          >
            {code`
              return ${employeeRecRef1}.Age + ${paramRef1} + ${paramRef2}
            `}
          </go.FunctionDeclaration>
          <hbr />
          <go.FunctionDeclaration
            name={namekey("NameSum")}
            receiver={
              <go.FunctionReceiver
                name={employeeRecRef2}
                type={<go.Pointer>{employeeRef}</go.Pointer>}
              />
            }
            parameters={[{ name: paramRef4, type: "string" }]}
            returns={"string"}
          >
            {code`
              return ${employeeRecRef2}.Name + ${paramRef4}
            `}
          </go.FunctionDeclaration>
          <hbr />
          <go.FunctionDeclaration
            name={namekey("Generic")}
            typeParameters={[{ name: typeParamRef, constraint: "any" }]}
            parameters={[{ name: paramRef3, type: typeParamRef }]}
            returns={typeParamRef}
          >
            {code`
              return ${paramRef3}
            `}
          </go.FunctionDeclaration>
          <hbr />
          <go.VariableDeclarationGroup>
            <go.VariableDeclaration name={namekey("Version")} type="string">
              "1.0.0"
            </go.VariableDeclaration>
            <go.VariableDeclaration name={aliceRef} type={personRef}>
              {code`${personRef}{Name: "Alice", Age: 30}`}
            </go.VariableDeclaration>
          </go.VariableDeclarationGroup>
          <hbr />
          <go.VariableDeclaration name={namekey("Bob")} type={personRef}>
            {code`${personRef}{Name: "Bob", Age: 29}`}
          </go.VariableDeclaration>
          <hbr />
          <go.VariableDeclaration
            name={namekey("Version2")}
            type="string"
            const
          >
            "1.0.0"
          </go.VariableDeclaration>
          <hbr />
          <go.TypeDeclaration name={variantRef}>uint8</go.TypeDeclaration>
          <hbr />
          <go.VariableDeclarationGroup const>
            <go.VariableDeclaration
              name={namekey("VariantA")}
              type={variantRef}
            >
              iota
            </go.VariableDeclaration>
            <go.VariableDeclaration name={namekey("VariantB")} />
          </go.VariableDeclarationGroup>
          <hbr />
        </go.SourceFile>
      </go.SourceDirectory>
      <go.SourceDirectory path="cmd" name="main">
        <go.SourceFile path="main.go">
          <go.FunctionDeclaration name={namekey("main")}>
            {code`
              ${go.std.fmt.Println}("Hello, World!")
              person := ${aliceRef}
              person.Age += 1
            `}
          </go.FunctionDeclaration>
        </go.SourceFile>
      </go.SourceDirectory>
    </go.ModuleDirectory>
  </Output>,
  { tabWidth: 4 },
);

writeOutput(output, "./alloy-output");
