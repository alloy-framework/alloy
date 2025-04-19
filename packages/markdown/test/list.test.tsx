import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { List } from "../src/components/List.jsx";
import { mdTest } from "./utils.jsx";

it("renders ordered lists", () => {
  const template = mdTest(
    <List ordered>
      <>Item 1</>
      <>Item 2</>
      <>
        Item 3<hbr />
        <List ordered start={10}>
          <>Item 3.1</>
          <>Item 3.2</>
        </List>
      </>
    </List>,
  );

  expect(template).toRenderTo(d`
    1. Item 1
    2. Item 2
    3. Item 3
       10. Item 3.1
       11. Item 3.2
  `);
});

it("renders task lists", () => {
  const template = mdTest(
    <List tasks bullet="-">
      <>Item 1</>
      <>Item 2</>
      <>
        Item 3<hbr />
        <List tasks ordered>
          <>Item 3.1</>
          <>Item 3.2</>
        </List>
      </>
    </List>,
  );

  expect(template).toRenderTo(d`
    - [ ] Item 1
    - [ ] Item 2
    - [ ] Item 3
      1. [ ] Item 3.1
      2. [ ] Item 3.2
  `);
});
