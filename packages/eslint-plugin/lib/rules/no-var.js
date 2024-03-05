/**
 * @fileoverview text
 * @author z-eslint
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "text",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: "code", // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      unexpected: "不能用var声明变量-{{type}}, use let or const instead",
    },
  },

  create(context) {
    const sourceCode = context.getSourceCode();
    return {
      VariableDeclaration(node) {
        if (node.kind === "var") {
          context.report({
            node,
            data: { type: "var" },
            messageId: "unexpected",
            fix: (fixer) => {
              // return fixer.replaceText(
              //   node,
              //   node.kind === "var" ? "let" : "const"
              // );
              const varToken = sourceCode.getFirstToken(node, {
                filter: (t) => t.value === "var",
              });
              return fixer.replaceText(varToken, "let");
            },
          });
        }
      },
    };
  },
};
