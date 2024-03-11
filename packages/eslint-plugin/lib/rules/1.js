module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "disallow declared but unused variables",
      category: "Variables",
      recommended: false,
    },
    schema: [], // 如果你的规则有选项，你可以在这里定义它们的模式
  },

  create(context) {
    return {
      "Program:exit"() {
        // 在程序退出时（即遍历完AST），检查所有变量
        const globalScope = context.getScope();

        // 递归检查作用域中的所有变量
        function checkScope(scope) {
          scope.variables.forEach((variable) => {
            // `variable` 是一个 `Variable` 对象，包含 `name` 和 `references`
            if (variable.references.length === 0 && variable.defs.length > 0) {
              // `defs` 是定义该变量的节点数组
              // `references` 是所有引用该变量的节点数组
              // 如果没有引用，报告未使用的变量
              context.report({
                node: variable.defs[0].name,
                message: `'${variable.name}' is defined but never used.`,
              });
            }
          });

          // 递归检查子作用域
          scope.childScopes.forEach(checkScope);
        }

        // 从全局作用域开始检查
        checkScope(globalScope);
      },
    };
  },
};
