const esbuild = require('esbuild')

esbuild.buildSync({
    entryPoints:['main.js'],
    outfile:'bundle.js',
    loader: { '.js': 'jsx' },
})