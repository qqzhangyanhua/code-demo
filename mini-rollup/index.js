
const fs = require('fs');
const path = require('path');
const acorn = require('acorn');
const code = fs.readFileSync('./source.js', 'utf-8').toString();

const  ast = acorn.parse(code, {
    sourceType: 'module',
    ecmaVersion: 7
});
console.log('ast', ast);
const { body } = ast;
const dependencies = [];
body.filter(node => node.type === 'ImportDeclaration').forEach(node => {
    dependencies.push(node.source.value);
});