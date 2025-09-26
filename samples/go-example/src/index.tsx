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
          <go.Function
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
          </go.Function>
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
          <go.Function
            name={namekey("AgeSum")}
            receiver={
              <go.FuncReceiver name={employeeRecRef1} type={employeeRef} />
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
          </go.Function>
          <hbr />
          <go.Function
            name={namekey("NameSum")}
            receiver={
              <go.FuncReceiver
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
          </go.Function>
          <hbr />
          <go.Function
            name={namekey("Generic")}
            typeParameters={[{ name: typeParamRef, constraint: "any" }]}
            parameters={[{ name: paramRef3, type: typeParamRef }]}
            returns={typeParamRef}
          >
            {code`
              return ${paramRef3}
            `}
          </go.Function>
          <hbr />
          <go.VarDeclarationGroup>
            <go.VarDeclaration name={namekey("Version")} type="string">
              "1.0.0"
            </go.VarDeclaration>
            <go.VarDeclaration name={aliceRef} type={personRef}>
              {code`${personRef}{Name: "Alice", Age: 30}`}
            </go.VarDeclaration>
          </go.VarDeclarationGroup>
          <hbr />
          <go.VarDeclaration name={namekey("Bob")} type={personRef}>
            {code`${personRef}{Name: "Bob", Age: 29}`}
          </go.VarDeclaration>
          <hbr />
          <go.VarDeclaration name={namekey("Version2")} type="string" const>
            "1.0.0"
          </go.VarDeclaration>
          <hbr />
          <go.TypeDeclaration name={variantRef}>uint8</go.TypeDeclaration>
          <hbr />
          <go.VarDeclarationGroup const>
            <go.VarDeclaration name={namekey("VariantA")} type={variantRef}>
              iota
            </go.VarDeclaration>
            <go.VarDeclaration name={namekey("VariantB")} />
          </go.VarDeclarationGroup>
          <hbr />
        </go.SourceFile>
      </go.SourceDirectory>
      <go.SourceDirectory path="cmd" name="main">
        <go.SourceFile path="main.go">
          <go.Function name={namekey("main")}>
            {code`
              ${go.std.fmt.Println}("Hello, World!")
              person := ${aliceRef}
              person.Age += 1
            `}
          </go.Function>
        </go.SourceFile>
      </go.SourceDirectory>
    </go.ModuleDirectory>
  </Output>,
  { tabWidth: 4 },
);

writeOutput(output, "./alloy-output");
