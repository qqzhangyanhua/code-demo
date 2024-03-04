const esprima = require('esprima');
const estraveser = require('estraverse');
const escodegen = require('escodegen');

const code = `function foo() {
  return 1;
}`

// 讲代码转成ast语法树
const ast =esprima.parseScript(code);

estraveser.traverse(ast, {
  enter(node, parent) {
    // console.log('enter====',node);
    if(node.type === 'FunctionDeclaration'){
        node.id.name = 'bar';
    }
  },
  leave(node, parent) {
    // console.log('leave=====',node);
  }
});
const newCode =escodegen.generate(ast);
console.log(newCode);