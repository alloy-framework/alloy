function multipleIndentComponent() {
  return <>hello!<Indent>
<Foo />
<Foo /></Indent></>;
}
function multipleIndentComponentAndText() {
  return <>hello!<Indent>
a
<Foo />
b
<Foo />
c</Indent></>;
}