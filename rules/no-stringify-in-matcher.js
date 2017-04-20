'use strict';

const match = require('tree-matcher');

const stringifyMatcher = {
  type: 'MemberExpression',
  object: { type: 'Identifier', name: 'JSON' },
  property: { type: 'Identifier', name: 'stringify' }
};

function inJestMatcher(ancestors) {
  const expectMatcher = {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      object: node =>
        match({ type: 'Identifier', name: 'expect' }, node) ||
        match(
          {
            type: 'CallExpression',
            callee: { type: 'Identifier', name: 'expect' }
          },
          node
        )
    },
    arguments: args => args.indexOf(ancestors[i + 1]) > -1
  };

  let i = ancestors.length;
  while (--i >= 0) {
    if (match(expectMatcher, ancestors[i])) {
      return true;
    }
  }
  return false;
}

module.exports = {
  meta: {
    docs: {
      description: 'Prevent using `JSON.stringify` in Jest matchers',
      category: 'Best Practices',
      recommended: true
    },
    schema: []
  },

  create(context) {
    return {
      CallExpression(node) {
        if (!match(stringifyMatcher, node.callee)) {
          return;
        }
        if (inJestMatcher(context.getAncestors())) {
          context.report({
            message: 'Should not use JSON.stringify inside a Jest matcher',
            node
          });
        }
      }
    };
  }
};
