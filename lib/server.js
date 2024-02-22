const connect = require("connect");
const {createStaticMiddleware} = require("./middlewares/static");
const resolveConfig = require("./config");
async function createServer() {
    const config =await resolveConfig();
  const app = connect();
  app.use(createStaticMiddleware(config));
  const server = {
    async listen(port, cb) {
      require("http").createServer(app).listen(port, cb);
    },
  };
  return server;
}
exports.createServer = createServer;
