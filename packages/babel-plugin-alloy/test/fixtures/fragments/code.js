function multipleIndentComponent() {
  return <>
    hello!
      <Foo />
      <Foo />
  </>;
}

function multipleIndentComponentAndText() {
  return <>
    hello!
      a
      <Foo />
      b
      <Foo />
      c
  </>;
}