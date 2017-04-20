"use strict";

const eslint = require("eslint");
const rule = require("../no-stringify-in-matcher");

const ruleTester = new eslint.RuleTester();

ruleTester.run("no-expect-json-stringify", rule, {
  valid: [`expect(call(JSON.stringify(foo))).toEqual("abc")`],
  invalid: [
    {
      code: `expect(foo).toEqual({ foo: JSON.stringify(bar) })`,
      errors: [
        { message: "Should not use JSON.stringify inside a Jest matcher" }
      ]
    },
    {
      code: `expect(foo).toEqual(expect.objectContaining({ foo: JSON.stringify(bar) }))`,
      errors: [
        { message: "Should not use JSON.stringify inside a Jest matcher" }
      ]
    }
  ]
});
