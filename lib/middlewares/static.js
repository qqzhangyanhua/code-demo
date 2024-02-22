const static = require("serve-static");

function createStaticMiddleware({ root }) {
  return static(root);
}
module.exports = {
    createStaticMiddleware
};
