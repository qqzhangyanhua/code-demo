const fs = require("fs-extra");
const { normalizePath } = require("../utils.js");
const htmlTypesRE = /\.html$/;
const scriptTypesRE = /<script\s+type="module"\s+src="(.+?)">/;
const { cratePluginContainer } = require("./pluginContainer.js");
const resolvePlugin = require("../plugins/resolve.js");
/**
 *获取esbuild扫描的工厂方法
 *
 * @param {*} config 配制对象
 * @param {*} depImports 用来存放导入的模块
 */
const esBuildScanPlugin = async (config, depImports) => {
  // 创建插件容器
  const container = cratePluginContainer({
    plugins: [resolvePlugin(config)],
    root: config.root,
  });
  const resolve = async (path, importer) => {
    // 插件容器进行路径解析,返回绝对路径
    return await container.resolved(path, importer);
  };
  return {
    name: "esbuild-scan-plugin",
    setup(build) {
      // 从入口文件index.html 找到html的真实路径
      build.onResolve({ filter: htmlTypesRE }, async ({ path, importer }) => {
        const resolved = await resolve(path, importer);
        if (resolved) {
          return {
            path: resolved.id || resolved,
            namespace: "html",
          };
        }
      });
      build.onResolve({ filter: /.*/ }, async ({ path, importer }) => {
        console.log("匹配这里了path====", path);

        const resolved = await resolve(path, importer);
        if (resolved) {
          const id = resolved.id || resolved;
          if (id.includes("node_modules")) {
            depImports[path] = normalizePath(id);
            return {
              path: id,
              external: true, // 表示是一个外部模块
            };
          } else {
            return {
              path: id,
            };
          }
        }
      });
      build.onLoad(
        { filter: htmlTypesRE, namespace: "html" },
        async ({ path }) => {
          console.log("path=============", path);

          const html = await fs.readFileSync(path, "utf-8");
      
          let [, src] = html.match(scriptTypesRE);
          const jsContent = `import ${JSON.stringify(src)};`;
          console.log("jsContent=======", jsContent);
          return {
            contents: jsContent,
            loader: "js",
          };
        }
      );
    },
  };
};
module.exports = esBuildScanPlugin;
