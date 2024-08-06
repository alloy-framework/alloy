function simple() {
  return <Hi>hello!<Indent>
indented!</Indent></Hi>;
}
function indentedComponent() {
  return <Hi>hello!<Indent>
<Bye>content</Bye></Indent></Hi>;
}
function multipleIndent() {
  return <Hi>hello!<Indent>
indented!</Indent>
another<Indent>
indented?</Indent></Hi>;
}
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