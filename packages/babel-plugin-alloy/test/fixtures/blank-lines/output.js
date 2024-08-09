import { Indent as _$Indent } from "@alloy-js/core:Indent";
function blankLines() {
  return <Hi>
hello

how


are you</Hi>;
}
function blankLinesWithIndent() {
  return <Hi>
hello
<_$Indent>
how</_$Indent>

<_$Indent>
are you</_$Indent>

there</Hi>;
}