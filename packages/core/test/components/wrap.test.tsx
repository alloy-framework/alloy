import { ref } from "@vue/reactivity";
import { expect, it } from "vitest";
import { Wrap } from "../../src/components/Wrap.jsx";
import { printTree, renderTree } from "../../src/render.js";
import "../../testing/extend-expect.js";

function Wrapper(props: any) {
  return <>[{props.children}]</>;
}

it("conditionally wraps", () => {
  const template = (
    <>
      <Wrap when={true} with={Wrapper}>
        testing
      </Wrap>
      <Wrap when={false} with={Wrapper}>
        testing
      </Wrap>
    </>
  );

  expect(template).toRenderTo(`[testing]testing`);
});

it("works reactively", () => {
  const doWrap = ref(false);
  const template = (
    <>
      <Wrap when={doWrap.value} with={Wrapper}>
        testing
      </Wrap>
    </>
  );

  const tree = renderTree(template);
  expect(printTree(tree)).toEqual(`testing`);

  doWrap.value = true;

  expect(printTree(tree)).toEqual(`testing`);
});
