"use strict";

const regex = /^eslint-disable(-line|-next-line)?$/;

module.exports = {
  meta: {
    docs: {
      description: "Prevent use of general `eslint-disable`",
      category: "Best Practices",
      recommended: true
    },
    schema: []
  },

  create(context) {
    function report(node) {
      context.report({
        loc: {
          line: 0,
          column: 0
        },
        message:
          "Specify the rules you want to disable at {{line}}:{{column}}.",
        data: node.loc.start
      });
    }

    return {
      Program(node) {
        node.comments.forEach(comment => {
          if (regex.test(comment.value.trim())) {
            report(comment);
          }
        });
      }
    };
  }
};
