import "@alloyjs/core/testing";
import { expect, it } from "vitest";
import { render, Output, SourceFile, Declaration, OutputDirectory } from "@alloyjs/core";
import * as ts from "../src/components/index.js";
import { Reference } from "../src/components/Reference.js";