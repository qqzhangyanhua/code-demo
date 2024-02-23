
const { normalizePath} = require('./utils');
async function resolveConfig() {
    // 当前命令所在的目录
    const root = normalizePath(process.cwd());
    const config = {
        root,
    }
    return config;
}
module.exports = resolveConfig;