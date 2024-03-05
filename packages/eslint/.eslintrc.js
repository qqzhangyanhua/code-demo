module.exports = {
  env: {
    // 当前可以使用哪个环境的全局变量
    browser: true,
    es2021: true,
    node: true,
  },
//   "plugin:@typescript-eslint/recommended"
  // extends: ["eslint:recommended",], // 继承后就可以使用别人写好的规则
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest", // 语法版本
    sourceType: "module",
  },
  rules: {
    quotes: ["error", "double"],
  },
  // // ts解析器
  // plugins:[
  //   "@typescript-eslint/eslint-plugin"
  // ],
  plugins:["z-lint"],
  rules: {
    "z-lint/no-var": "error",
  },
  parser: "@typescript-eslint/parser",
  globals: {
    custom: "writable", // 全局变量
  },
};
