const { normalizePath } = require("./utils");
const path = require("path");
const { resolvePlugins } = require("./plugins");
async function resolveConfig() {
  // 当前命令所在的目录
  const root = normalizePath(process.cwd());
  const catchDir = normalizePath(path.resolve("node_modules/.vite50"));
  const config = {
    root,
    catchDir,
  };
  return config;
}
module.exports = resolveConfig;
