"use strict";

module.exports = {
  extends: ["eslint:recommended", "plugin:@geekie/rules"],

  rules: {
    // Possible Errors (http://eslint.org/docs/rules/#possible-errors)
    "no-await-in-loop": "error",

    // Best Practices (http://eslint.org/docs/rules/#best-practices)
    "array-callback-return": "error",
    "block-scoped-var": "error",
    curly: "error",
    eqeqeq: "error",
    "no-sequences": "error",
    radix: "error",
    yoda: "error",

    // Strict Mode (http://eslint.org/docs/rules/#strict-mode)
    strict: 2,

    // Variables (http://eslint.org/docs/rules/#variables)
    "no-unused-vars": [2, { args: "none" }]
  }
};
