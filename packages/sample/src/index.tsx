import * as ay from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { writeOutput } from "./write-output.js";
 
const fs = ts.node.fs;
const readFile = fs["./promises"].readFile;


let frag = <ay.Output>
  <ay.SourceFile filetype="text" path="foo.txt">
    <>
      one
      <ay.Indent>hi</ay.Indent>
    </>
  </ay.SourceFile>
</ay.Output>;

console.log(ay.render(frag));