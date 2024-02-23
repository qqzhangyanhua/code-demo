const connect = require("connect");
const { createStaticMiddleware } = require("./middlewares/static");
const resolveConfig = require("./config");
const { createOptimizeDepsRun } = require("./optimizeDeps");
async function createServer() {
  const config = await resolveConfig();
  const app = connect();
  app.use(createStaticMiddleware(config));

  const server = {
    async listen(port, cb) {
      // 在项目启动钱进行依赖预构建
      // 1 找到本项目的第三方目录
      // debugger
      await runOptimize(config);
      require("http").createServer(app).listen(port, cb);
    },
  };
  return server;
}
const runOptimize = async (config) => {
  await createOptimizeDepsRun(config);
};
exports.createServer = createServer;
