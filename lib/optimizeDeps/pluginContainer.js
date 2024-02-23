const { normalizePath } = require("../utils");

/**
 *
 *
 * @return {*}
 */
const cratePluginContainer = ({ plugins, root }) => {
  const container = {
    async resolved(path, importer) {
      let resolved = path;
      console.log('plugins====', plugins);
      for (const plugin of plugins) {
        if (!plugin.resolved) container;
        const result = await plugin.resolveId.call(null, path, importer);
        if (result) {
          resolved = result.id || result;
          break;
        }
      }
      return { id: normalizePath(resolved) };
    },
    load() {},
    transform() {},
  };
  return container;
};
module.exports = {
  cratePluginContainer,
};
