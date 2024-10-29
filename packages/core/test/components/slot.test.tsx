import { it } from "vitest";
import { Output } from "../../src/components/Output.jsx";
import { SourceFile } from "../../src/components/SourceFile.jsx";
import {
  Declaration,
  Name,
  OutputSymbol,
  Ref,
  refkey,
  Scope,
  useBinder,
} from "../../src/index.js";
import { render } from "../../src/render.js";
import { defineSlot, rename, replace } from "../../src/slot.js";
import "../../testing/extend-expect.js";

it("works with string keys", () => {
  interface FunctionSlotProps extends FunctionComponentProps {
    additionalProp: string;
  }

  const FunctionSlot = defineSlot<FunctionSlotProps>(
    (query: { name: string }) => query.name,
  );

  interface FunctionComponentProps {
    name: string;
  }

  function MyFunctionComponent(props: FunctionComponentProps) {
    const FunctionSlotInstance = FunctionSlot.create(
      props.name,
      { ...props, additionalProp: "hi" },
      <>
        function {props.name}() {"{"}
          console.log("hello world");
        {"}"}
      </>,
    );

    return <FunctionSlotInstance />;
  }

  // extension.tsx
  replace(FunctionSlot.find({ name: "foo" }), (props: any) => {
    return <>
      // original
      { props.original }
    </>;
  });

  const tree = render(
    <Output>
      <SourceFile path="test.ts" filetype="ts">
        <MyFunctionComponent name="foo" />
      </SourceFile>
    </Output>,
  );

  console.log(tree.contents[0].contents);
});

it("works with symbols", () => {
  interface FunctionSlotProps extends FunctionComponentProps {
    additionalProp: string;
  }

  const FunctionSlot = defineSlot<FunctionSlotProps>((query: {
    fqn: string;
  }) => {
    const binder = useBinder();
    return binder.resolveFQN(query.fqn);
  });

  interface FunctionComponentProps {
    name: string;
  }

  function MyFunctionComponent(props: FunctionComponentProps) {
    const binder = useBinder();
    const sym = binder.createSymbol({
      name: props.name,
      refkey: refkey(),
    });

    const FunctionSlotInstance = FunctionSlot.create(
      sym,
      { ...props, additionalProp: "hi" },
      <Declaration symbol={sym}>
        function <Name />() {"{"}
          console.log("hello world");
        {"}"}
      </Declaration>,
    );

    return <FunctionSlotInstance />;
  }

  // extension.tsx
  replace(FunctionSlot.find({ fqn: "foo.bar" }), (props: any) => {
    return <>
      // original
      { props.original }
    </>;
  });

  const tree = render(
    <Output>
      <SourceFile path="test.ts" filetype="ts">
        <Scope name="foo">
          <MyFunctionComponent name="bar" />
        </Scope>
      </SourceFile>
    </Output>,
  );

  console.log(tree.contents[0].contents);
});

it("can rename", () => {
  interface FunctionSlotProps extends FunctionComponentProps {
    additionalProp: string;
  }

  const FunctionSlot = defineSlot<FunctionSlotProps>((query: {
    fqn: string;
  }) => {
    const binder = useBinder();
    return binder.resolveFQN(query.fqn);
  });

  interface FunctionComponentProps {
    name: string;
  }

  function MyFunctionComponent(props: FunctionComponentProps) {
    const binder = useBinder();
    const sym = binder.createSymbol({
      name: props.name,
      refkey: refkey(),
    });

    const FunctionSlotInstance = FunctionSlot.create(
      sym,
      { ...props, additionalProp: "hi" },
      <Declaration symbol={sym}>
        function <Name />() {"{"}
          console.log("hello world");
        {"}"}
      </Declaration>,
    );

    return <FunctionSlotInstance />;
  }

  rename(() => {
    const binder = useBinder();
    return binder.resolveFQN("foo.bar") as Ref<OutputSymbol | undefined>;
  }, "bazxxx");

  const tree = render(
    <Output>
      <SourceFile path="test.ts" filetype="ts">
        <Scope name="foo">
          <MyFunctionComponent name="bar" />
        </Scope>
      </SourceFile>
    </Output>,
  );

  console.log(tree.contents[0].contents);
});
