const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");
// TODO: 1. 读取文件内容
// TODO: 2. 将文件内容转为 ast
/** 分析单独模块 */
function getModuleInfo(file) {
  //读取文件
  const body = fs.readFileSync(file, "utf-8");
  // 转换为ast=>抽象语法树
  const ast = parser.parse(body, {
    sourceType: "module", //表示我们要解析的是ES模块
  });
  const deps = {};

  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(file);
      const absPath = "./" + path.join(dirname, node.source.value);
      console.log("ImportDeclaration==", absPath);
      deps[node.source.value] = absPath;
    },
  });
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });
  const moduleInfo = { file, deps, code };
  return moduleInfo;
}

// 解析模块
const parseModules = (file) => {
  const entry = getModuleInfo(file);
  const temp = [entry];
  const depsGraph = {};
  getDeps(temp, entry);
  // 构造依赖关系
  temp.forEach((moduleInfo) => {
    depsGraph[moduleInfo.file] = {
      deps: moduleInfo.deps,
      code: moduleInfo.code,
    };
  });
  return depsGraph;
};
// 获取依赖
const getDeps = (temp, { deps }) => {
  Object.keys(deps).forEach((key) => {
    const child = getModuleInfo(deps[key]);
    temp.push(child);
    getDeps(temp, child); // 递归调用
  });
};



const bundle = (file) => {
    const depsGraph = JSON.stringify(parseModules(file));
    return `(function (graph) {
        function require(file) {
          function absRequire(relPath) {
            return require(graph[file].deps[relPath]);
          }
          var exports = {};
          (function (require, exports, code) {
            eval(code);
          })(absRequire, exports, graph[file].code);
          return exports;
        }
        require('${file}');
      })(${depsGraph})`;
}
const content = bundle('./src/index.js')
console.log(content)
!fs.existsSync('./dist') && fs.mkdirSync('./dist')
fs.writeFileSync('./dist/bundle.js', content)