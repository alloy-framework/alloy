function multipleIndentComponent() {
  return <Hi>
    hello!
      <Foo />
      <Foo />
  </Hi>;
}

function multipleIndentComponentAndText() {
  return <Hi>
    hello!
      a
      <Foo />
      b
      <Foo />
      c
  </Hi>;
}