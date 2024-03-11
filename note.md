
## eslint


// 安装

 ```bash
 npm init @eslint/config
 ```

```js
// 单独校验一个文件
npx eslint index.js

// 多个文件
npx eslint file1.js  file2.js

// 目录
npx eslint src

// 多目录
npx eslint src script

// 多种类型文件 中间用,分割 后面跟文件类型 最后可以写目录 默认为.js文件类型
npx eslint --ext .js,.vue src

// 只针对error级别错误
npx eslint --quiet src

// 修复问题 使用该命令会自动对代码进行修复 
npx eslint --fix src

// 缓存  只对有改变的文件进行操作
npx eslint --cache src


// 启用/禁用彩色输出
npx eslint --no-color/--color index.js

// 设定检查报告输出的格式为html  也可以为json

// 这个选项指定了控制台的输出格式  需要安装插件 npm install -D eslint-formatter-codeframe
// https://eslint.bootcss.com/docs/user-guide/formatters/
npx eslint -f html index.js

// 通过交互式命令行界面创建一个新的ESLint配置文件
npx eslint --init

// 该选项将调试信息输出到控制台。在 ESLint 的命令行中加入这个标志，以便在命令运行时获得额外的调试信息。
npx eslint --debug test.js
```
