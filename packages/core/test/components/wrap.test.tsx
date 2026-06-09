import { ref } from "@vue/reactivity";
import { expect, it } from "vitest";
import { Wrap } from "../../src/components/Wrap.jsx";

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

  const tree = template;
  expect(tree).toRenderTo("testing");

  doWrap.value = true;

  expect(tree).toRenderTo("testing");
});
