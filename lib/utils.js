const normalizePath = (path) => {
  return path.replace(/\\/g, "/");
};
const isJsRequest = (url) => {
  const jsRE = /\.js/
  return jsRE.test(url);
}
module.exports = {
  normalizePath,
  isJsRequest
};
