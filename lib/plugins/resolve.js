const pathLib = require("path");
const fs = require("fs-extra");
const resolve = require("resolve");
const resolvePlugin = ({ root }) => {
  return {
    name: "resolve-plugin",
    resolveId(path, importer) {
      if (path.startsWith("/") && path.includes("main.js")) {

        // 以/开头
        return { id: pathLib.resolve(root, path.slice(1)) };
      }
      // 绝对路径
      if (pathLib.isAbsolute(path)) {
        return { id: path };
      }
      // 相对路径
      if (path.startsWith(".")) {
        const baseDir = pathLib.dirname(importer);
        const fsPath = pathLib.resolve(baseDir, path);
        return { id: fsPath };
      }
      // 如果是第三方
      let res = tryNodeResolve(path, importer, root);
      return res;
    },
  };
};
const tryNodeResolve = (path, importer, root) => {
  const pkgPath = resolve.sync(`${path}/package.json`, {
    baseDir: root,
  });
  const pkgDir = pathLib.dirname(pkgPath);
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  const entryPoints = pkg.module || pkg.main; // module字段指定的是ES6模块的入口文件，main字段指定的是CommonJS模块的入口文件
  const enterPath = pathLib.join(pkgDir, entryPoints);
  return {
    id: enterPath,
  };
};
module.exports = resolvePlugin;
