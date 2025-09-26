import {
  code,
  List,
  Output,
  refkey,
  render,
  writeOutput,
} from "@alloy-js/core";
import * as go from "@alloy-js/go";

const aRef = refkey("a");
const bRef = refkey("b");
const personRef = refkey("Person");
const employeeRef = refkey("Employee");
const employeeRecRef1 = refkey("e1");
const employeeRecRef2 = refkey("e2");
const paramRef1 = refkey("param1");
const paramRef2 = refkey("param2");
const paramRef3 = refkey("param3");
const paramRef4 = refkey("param4");
const typeParamRef = refkey("T");
const variantRef = refkey("Variants");
const aliceRef = refkey("Alice");
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
              { name: "a", type: "int", refkey: aRef },
              { name: "b", type: "int", refkey: bRef },
            ]}
            returns={"int"}
            exported
          >
            {code`
              return ${aRef} + ${bRef}
            `}
          </go.Function>
          <hbr />
          <go.StructTypeDeclaration name="Person" exported refkey={personRef}>
            <List>
              <go.StructMember name="Name" type="string" exported />
              <go.StructMember name="Age" type="int" exported />
            </List>
          </go.StructTypeDeclaration>
          <hbr />
          <go.StructTypeDeclaration
            name="Employee"
            exported
            refkey={employeeRef}
          >
            <List>
              <go.StructEmbed>{personRef}</go.StructEmbed>
              <go.StructMember name="Company" type="string" exported />
              <go.StructMember
                name="Coordinates"
                tag={{ json: "coordinates" }}
                exported
                type={
                  <go.StructDeclaration>
                    <List>
                      <go.StructMember name="Lat" type="float64" exported />
                      <go.StructMember name="Long" type="float64" exported />
                    </List>
                  </go.StructDeclaration>
                }
              />
            </List>
          </go.StructTypeDeclaration>
          <hbr />
          <go.Function
            name="AgeSum"
            receiver={
              <go.FuncReceiver
                name="e"
                type={employeeRef}
                refkey={employeeRecRef1}
              />
            }
            parameters={[
              { name: "param", type: "int", refkey: paramRef1 },
              { name: "param", type: "int", refkey: paramRef2 },
            ]}
            returns={"int"}
            exported
          >
            {code`
              return ${employeeRecRef1}.Age + ${paramRef1} + ${paramRef2}
            `}
          </go.Function>
          <hbr />
          <go.Function
            name="NameSum"
            receiver={
              <go.FuncReceiver
                name="e"
                type={<go.Pointer>{employeeRef}</go.Pointer>}
                refkey={employeeRecRef2}
              />
            }
            parameters={[{ name: "name", type: "string", refkey: paramRef4 }]}
            returns={"string"}
            exported
          >
            {code`
              return ${employeeRecRef2}.Name + ${paramRef4}
            `}
          </go.Function>
          <hbr />
          <go.Function
            name="Generic"
            typeParameters={[
              { name: "T", constraint: "any", refkey: typeParamRef },
            ]}
            parameters={[
              { name: "param", type: typeParamRef, refkey: paramRef3 },
            ]}
            returns={typeParamRef}
            exported
          >
            {code`
              return ${paramRef3}
            `}
          </go.Function>
          <hbr />
          <go.VarDeclarationGroup>
            <go.VarDeclaration name="Version" type="string" exported>
              "1.0.0"
            </go.VarDeclaration>
            <go.VarDeclaration
              name="Alice"
              type={personRef}
              exported
              refkey={aliceRef}
            >
              {code`${personRef}{Name: "Alice", Age: 30}`}
            </go.VarDeclaration>
          </go.VarDeclarationGroup>
          <hbr />
          <go.VarDeclaration name="Bob" type={personRef} exported>
            {code`${personRef}{Name: "Bob", Age: 29}`}
          </go.VarDeclaration>
          <hbr />
          <go.VarDeclaration name="Version2" type="string" exported const>
            "1.0.0"
          </go.VarDeclaration>
          <hbr />
          <go.TypeDeclaration name="Variants" refkey={variantRef} exported>
            uint8
          </go.TypeDeclaration>
          <hbr />
          <go.VarDeclarationGroup const>
            <go.VarDeclaration name="VariantA" type={variantRef} exported>
              iota
            </go.VarDeclaration>
            <go.VarDeclaration name="VariantB" exported />
          </go.VarDeclarationGroup>
          <hbr />
        </go.SourceFile>
      </go.SourceDirectory>
      <go.SourceDirectory path="cmd" name="main">
        <go.SourceFile path="main.go">
          <go.Function name="main">
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
