import { describe, expect, test } from 'vitest'
import {render} from "../../src/render.js";

test('blah', () => {
  
  function Bar() {
    return <>
      This is a test!
    </>
  }
  function Foo() {
    const s = 1;
    return <>
      hello! {s}
      <Bar />
    </>
  }
  console.log(JSON.stringify(render(<Foo />)));
})