
const glob = require('fast-glob');

(async function(){
    const entries = await glob('**/*.js', { cwd: __dirname });
    console.log(entries);
})()