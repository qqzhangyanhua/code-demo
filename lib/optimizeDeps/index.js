const scanImports = require('./scanImports');
/** 分析项目依赖的第三方依赖 */
const createOptimizeDepsRun = async(config) => {
    const deps = await scanImports(config)
    console.log('deps======', deps);
};
module.exports = {
  createOptimizeDepsRun,
};
