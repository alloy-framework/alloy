import * as ay from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { writeOutput } from "./write-output.js";
 
const fs = ts.node.fs;
const readFile = fs["./promises"].readFile;


let frag = <>
  a
    {"sub"}
    b
    c
  d
</>

console.log(ay.render(frag));