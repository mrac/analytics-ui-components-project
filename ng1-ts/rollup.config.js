var rollupPluginIncludepaths = require('rollup-plugin-includepaths');
var rollupPluginTypescript = require('rollup-plugin-typescript');
var typescript = require('typescript');

var includePathOptions = {
    include: {},
    paths: [
        '.',
        'node_modules/analytics-ui-components/src'
    ],
    external: [
    ],
    extensions: ['.ts']
};

var typescriptOptions = {
    module: 'es6',
    typescript: typescript
};

var config = {
    entry: 'src/index.ts',
    format: 'iife',
    dest: './build/index.js',
    plugins: [
        rollupPluginIncludepaths(includePathOptions),
        rollupPluginTypescript(typescriptOptions)
    ]
};

module.exports = config;
