const fs = require("fs");
const path = require("path");
const Koa = require("koa");
const app = new Koa();

function rewriteImport(content) {
  return content.replace(/ from ['"]([^'"]+)['"]/g, function (s0, s1) {
    if (s1.startsWith(".") || s1.startsWith("/")) {
      return s0;
    } else {
      return ` from '/@modules/${s1}'`;
    }
  });
}
app.use(async (ctx, next) => {
  const { url, query } = ctx.request;
  console.log("url", url);
  if (url === "/") {
    ctx.type = "text/html";
    const content = fs.readFileSync("./index.html", "utf-8");
    ctx.body = content;
  } else if (url.endsWith(".js")) {
    const p = path.resolve(__dirname, url.slice(1)); // 代码文件所在位置
    console.log("p", p);
    const content = fs.readFileSync(p, "utf-8");
    ctx.type = "application/javascript";
    ctx.body = rewriteImport(content);
  } else if (url.startsWith("/@modules")) {
    // 读取node_modules 下的包的module属性
    console.log("url=========", url);
    const prefix = path.resolve(__dirname, "node_modules", url.replace("/@modules/", ""));
    console.log('prefix',prefix);
    const module = require(prefix + "/package.json").module;
    const p = path.resolve(prefix, module);
    ctx.type = "application/javascript";
    ctx.body = rewriteImport(fs.readFileSync(p, "utf-8"));
    console.log("module", p);
  }
});
app.listen(3888, () => {
  console.log("server is running at http://localhost:3888");
});
