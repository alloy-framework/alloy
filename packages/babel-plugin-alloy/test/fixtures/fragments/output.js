import { Indent as _$Indent } from "@alloy-js/core:Indent";
function multipleIndentComponent() {
  return <>hello!<_$Indent>
<Foo />
<Foo /></_$Indent></>;
}
function multipleIndentComponentAndText() {
  return <>hello!<_$Indent>
a
<Foo />
b
<Foo />
c</_$Indent></>;
}