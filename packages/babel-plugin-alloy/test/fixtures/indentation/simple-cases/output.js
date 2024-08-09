import { Indent as _$Indent } from "@alloy-js/core:Indent";
function simple() {
  return <Hi>hello!<_$Indent>
indented!</_$Indent></Hi>;
}
function indentedComponent() {
  return <Hi>hello!<_$Indent>
<Bye>content</Bye></_$Indent></Hi>;
}
function multipleIndent() {
  return <Hi>hello!<_$Indent>
indented!</_$Indent>
another<_$Indent>
indented?</_$Indent></Hi>;
}
function multipleIndentComponent() {
  return <Hi>hello!<_$Indent>
<Foo />
<Foo /></_$Indent></Hi>;
}
function multipleIndentComponentAndText() {
  return <Hi>hello!<_$Indent>
a
<Foo />
b
<Foo />
c</_$Indent></Hi>;
}