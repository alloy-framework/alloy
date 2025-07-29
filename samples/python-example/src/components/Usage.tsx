import { List, memberRefkey, refkey } from "@alloy-js/core";
import * as py from "@alloy-js/python";

export function Usage() {
  const vRkey = refkey();
  const classInstantiation = (
    <py.ClassInstantiation target={refkey("PetstoreClient")} />
  );
  return (
    <>
      <List>
        <py.VariableDeclaration
          name="body"
          initializer={<py.Atom jsValue={{ name: "Bidu" }} />}
        />
        <py.VariableDeclaration
          name={"client"}
          type={refkey("PetstoreClient")}
          initializer={classInstantiation}
          refkey={vRkey}
        />
        <py.FunctionCallExpression
          target={memberRefkey(vRkey, refkey("create_pet"))}
          args={["body"]}
        />
      </List>
    </>
  );
}
