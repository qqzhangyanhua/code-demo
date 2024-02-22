const {init,parse} = require('es-module-lexer');

(async function(){
    const source = `import {OS} from 'env';console.log(OS);`
    await init;
    const [imports,exports] =parse(source);
    console.log(imports);
    console.log(exports);

})()
 