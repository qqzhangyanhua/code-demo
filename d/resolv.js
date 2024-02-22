
const resolve = require('resolve');
const res = resolve.sync('vue', { basedir: __dirname });
console.log(res);