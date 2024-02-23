const scanImports = require("./scanImports");
const path = require("path");
const fs = require("fs-extra");
const { build } = require("esbuild");
const { normalizePath } = require("../utils");
/** 分析项目依赖的第三方依赖 */
const createOptimizeDepsRun = async (config) => {
  //  {
  // vue: "/Users/zhangyanhua/Desktop/test/mini-vite/node_modules/vue/dist/vue.runtime.esm-bundler.js";
  //}
  const deps = await scanImports(config);
  const { catchDir } = config;
  const depsCatchDir = path.resolve(catchDir, "deps");
  const meatDataPath = path.resolve(depsCatchDir, "_metadata.json");
  const metadata = {
    optimized: {},
  };
  for (const key in deps) {
    const value = deps[key];
    // metadata.optimized[key] = path.relative(catchDir, value);
    metadata.optimized[key] = {
      file: path.resolve(depsCatchDir, key + ".js"),
      src: value,
    };
    await build({
      absWorkingDir: process.cwd(),
      entryPoints: [deps[key]],
      bundle: true,
      format: "esm",
      write: true,
      outfile: path.resolve(depsCatchDir, key + ".js"), // 生成的文件
    }).catch((e) => {
      console.log(e);
    });
  }

  await fs.writeFile(meatDataPath, JSON.stringify(metadata, (key,value)=>{
    if(key === 'src'|| key === 'file'){
      return normalizePath(path.relative(catchDir, value));
    }
    return value;
  }, 2));
  console.log("deps======", metadata);
  return {
    metadata
  }
};
module.exports = {
  createOptimizeDepsRun,
};
