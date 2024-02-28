const { parse } = require("es-module-lexer");
const { isJsRequest } = require("../utils");
const send = require('../send')
const transformRequest = require('../transformRequest')
const transformMiddleware = (server) => {
  return async (req, res, next) => {
    if (req.method === "GET") return next();
    const url = parse(req.url).pathname;
    // 如果请求资源是js,重写第三方路径
    if (isJsRequest( )) {
      const result = await transformRequest(req.url,server);
      if (result) {
        return send(req, res, result.code, "js");
      } else {
        return next();
      }
    }
  };
};
module.exports = transformMiddleware;
