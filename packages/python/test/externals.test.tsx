import { code, refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as py from "../src/index.js";
import { createModule } from "../src/index.js";
import { toSourceText } from "./utils.js";

it("uses import from external library", () => {
  const requestsLib = createModule({
    name: "requests",
    descriptor: {
      ".": ["get", "post"],
      models: ["Response", "Request"],
      "models.anothermodule": ["something"],
    },
  });
  const result = toSourceText(
    [
      <py.StatementList>
        {requestsLib["."].get}
        {requestsLib["."].post}
        {requestsLib["models"].Request}
        {requestsLib["models"].Response}
        {requestsLib["models.anothermodule"].something}
      </py.StatementList>,
    ],
    { externals: [requestsLib] },
  );
  const expected = d`
    from requests import get
    from requests import post
    from requests.models import Request
    from requests.models import Response
    from requests.models.anothermodule import something

    get
    post
    Request
    Response
    something
  `;
  expect(result).toRenderTo(expected);
});

it("uses import from external library in multiple functions", () => {
  const functionDeclarations = [
    <py.FunctionDeclaration
      name={"getUser"}
      parameters={[{ name: "userId", type: "int" }]}
      returnType={py.requestsModule["models"]["Response"]}
    >
      <py.StatementList>
        <py.VariableDeclaration
          name="response"
          initializer={
            <py.FunctionCallExpression
              target={py.requestsModule["."]["get"]}
              args={[1]}
            />
          }
        />
        {code`
          return response.json()
        `}
      </py.StatementList>
    </py.FunctionDeclaration>,
    <py.FunctionDeclaration
      name={"createUser"}
      parameters={[{ name: "userName", type: "string" }]}
      returnType={py.requestsModule["models"]["Response"]}
    >
      <py.StatementList>
        <py.VariableDeclaration
          name="response"
          initializer={
            <py.FunctionCallExpression
              target={py.requestsModule["."]["post"]}
              args={[1]}
            />
          }
        />
        {code`
          return response.json()
        `}
      </py.StatementList>
    </py.FunctionDeclaration>,
  ];

  const result = toSourceText(functionDeclarations, {
    externals: [py.requestsModule],
  });
  const expected = d`
    from requests import get
    from requests import post
    from requests.models import Response


    def get_user(user_id: int) -> Response:
        response = get(1)
        return response.json()


    def create_user(user_name: string) -> Response:
        response = post(1)
        return response.json()


  `;
  expect(result).toRenderTo(expected);
});

it("uses import from external library in multiple class methods", () => {
  const functionDeclarations = [
    <py.ClassDeclaration name="UserClient">
      <py.StatementList>
        <py.VariableDeclaration
          name="some_var"
          initializer={12}
          instanceVariable
          refkey={refkey("some_var")}
        />
        <py.MethodDeclaration
          name={"getUser"}
          parameters={[{ name: "userId", type: "int" }]}
          returnType={py.requestsModule["models"]["Response"]}
        >
          <py.StatementList>
            <py.VariableDeclaration
              name="response"
              initializer={
                <py.FunctionCallExpression
                  target={py.requestsModule["."]["get"]}
                  args={[refkey("some_var")]}
                />
              }
            />
            {code`
              return response.json()
            `}
          </py.StatementList>
        </py.MethodDeclaration>
        <py.MethodDeclaration
          name={"createUser"}
          parameters={[{ name: "userName", type: "string" }]}
          returnType={py.requestsModule["models"]["Response"]}
        >
          <py.StatementList>
            <py.VariableDeclaration
              name="response"
              initializer={
                <py.FunctionCallExpression
                  target={py.requestsModule["."]["post"]}
                  args={[refkey("some_var")]}
                />
              }
            />
            {code`
              return response.json()
            `}
          </py.StatementList>
        </py.MethodDeclaration>
      </py.StatementList>
    </py.ClassDeclaration>,
  ];

  const result = toSourceText(functionDeclarations, {
    externals: [py.requestsModule],
  });
  const expected = d`
    from requests import get
    from requests import post
    from requests.models import Response


    class UserClient:
        some_var = 12
        def get_user(self, user_id: int) -> Response:
            response = get(self.some_var)
            return response.json()

        def create_user(self, user_name: string) -> Response:
            response = post(self.some_var)
            return response.json()



  `;
  expect(result).toRenderTo(expected);
});
