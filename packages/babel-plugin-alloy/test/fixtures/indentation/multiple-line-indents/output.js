function multipleIndentComponent() {
  return <Hi>hello!<Indent>
<Foo />
<Foo /></Indent></Hi>;
}
function multipleIndentComponentAndText() {
  return <Hi>hello!<Indent>
a
<Foo />
b
<Foo />
c</Indent></Hi>;
}