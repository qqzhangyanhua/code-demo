const fs = require("fs-extra");
/**
 *转换请求
 *
 * @param {*} url  请求的资源
 * @param {*} server
 */
const transformRequest = async (url, server) => {
  //resolveId
  const { pluginContainer } = server;
  //
  const { id } = pluginContainer.resolveId(url);
  const loadResult =await pluginContainer.load(id)
  // 如果容器里返回结果
  let code
  if(loadResult){
    code = loadResult.code
  }else{
    code = await fs.readFile(url, "utf8");
  }
  return code;
  //load
  // transform
};
module.exports = transformRequest;
