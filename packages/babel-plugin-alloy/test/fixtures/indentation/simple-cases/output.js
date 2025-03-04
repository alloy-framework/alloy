function simple() {
  return <Hi>hello! indented!</Hi>;
}
function indentedComponent() {
  return <Hi>hello!<Bye>content</Bye></Hi>;
}
function multipleIndent() {
  return <Hi>hello! indented! another indented?</Hi>;
}
function multipleIndentComponent() {
  return <Hi>hello!<Foo /><Foo /></Hi>;
}
function multipleIndentComponentAndText() {
  return <Hi>hello! a<Foo />b<Foo />c</Hi>;
}