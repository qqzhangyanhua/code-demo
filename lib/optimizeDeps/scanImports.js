const { build } = require("esbuild");
const path = require("path");
const esBuildScanPlugin = require("./esBuildScanPlugin");
/** 扫描项目导入的第三方依赖 */
const scanImports = async (config) => {
  // 存放依赖
  const depImports = {};
  // 创建一个esbuild的扫描插件
  const esImportPlugin = await esBuildScanPlugin(config, depImports);
 await build({
    absWorkingDir: config.root, // 项目根目录
    entryPoints: [path.resolve("./index.html")],
    bundle: true,
    format: "esm",
    outfile: "./dist/bundle.js",
    write: true,
    plugins: [esImportPlugin],
  }).catch((e) => {
    console.log(e);
  });
  return depImports
};
module.exports = scanImports;
