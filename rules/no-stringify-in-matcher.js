"use strict";

const t = require("match-ast");

const isStringify = t.isCallExpression({
  callee: t.isMemberExpression({
    object: t.isIdentifier("JSON"),
    property: t.isIdentifier("stringify")
  })
});

const isExpect = t.isCallExpression({
  callee: t.isMemberExpression({
    object: t.either(
      t.isIdentifier("expect"),
      t.isCallExpression({ callee: t.isIdentifier("expect") })
    )
  })
});

function inJestMatcher(ancestors) {
  let i = ancestors.length;
  while (--i >= 0) {
    const node = ancestors[i];
    if (isExpect(node) && node.arguments.indexOf(ancestors[i + 1]) > -1) {
      return true;
    }
  }
  return false;
}

module.exports = {
  meta: {
    docs: {
      description: "Prevent using `JSON.stringify` in Jest matchers",
      category: "Best Practices",
      recommended: true
    },
    schema: []
  },

  create(context) {
    return {
      CallExpression(node) {
        if (isStringify(node) && inJestMatcher(context.getAncestors())) {
          context.report({
            message: "Should not use JSON.stringify inside a Jest matcher",
            node
          });
        }
      }
    };
  }
};
