import { Indent as _$Indent } from "@alloy-js/core:Indent";
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