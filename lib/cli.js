
const { createServer } = require('./server');

(async function(){
    const server = await createServer();
    server.listen(9999,()=>{
        console.log('Server listening on http://localhost:9999');
    });
})()