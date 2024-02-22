const esbuild = require("esbuild");
/** esbuild 插件 */
const envPlugin = {
  name: "env", // 插件的名称
  setup(build) {
    build.onResolve({ filter: /^env$/ }, (args) => {
      return {
        external: false, // 是否是外部依赖
        path: args.path,
        namespace: "env",
      };
    });
    build.onLoad({ filter: /^env$/, namespace: "env" }, (args) => {
      return {
        contents: `export const OS = "windows"`,
        loader: "js",
      };
    });
  },
};
esbuild.build({
  entryPoints: ["entry.js"],
  bundle: true,
  outfile: "bundle.js",
  plugins: [envPlugin],
});
