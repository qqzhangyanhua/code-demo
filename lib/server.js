const connect = require("connect");
const { createStaticMiddleware } = require("./middlewares/static");
const resolveConfig = require("./config");
const { createOptimizeDepsRun } = require("./optimizeDeps");
const  transformMiddleware = require("./middlewares/transform");
const  cratePluginContainer = require("./optimizeDeps/pluginContainer");
async function createServer() {
  const config = await resolveConfig();
  const app = connect();
  const pluginContainer = cratePluginContainer(config);
  const server = {
    pluginContainer,
    async listen(port, cb) {
      // 在项目启动钱进行依赖预构建
      // 1 找到本项目的第三方目录
      // debugger
      await runOptimize(config,server);
      require("http").createServer(app).listen(port, cb);
    },
  };
  app.use(createStaticMiddleware(config));
  app.use(transformMiddleware(server));

  return server;
}
const runOptimize = async (config,server) => {
  const deps = await createOptimizeDepsRun(config);
  server._optimizeDeps = deps.metadata;
};
exports.createServer = createServer;
