
const pluginBabel = require("rollup-plugin-babel");
const pluginNodeResolve = require("rollup-plugin-node-resolve");

// https://github.com/rollup/rollup-plugin-node-resolve#usage
const nodeResolveConfig = {
    module: true,
    main: false
};

const config = {
    entry: 'index.js',
    format: 'iife',
    dest: './build/index.js',
    plugins: [
        pluginBabel(),
        pluginNodeResolve(nodeResolveConfig)
    ]
};

module.exports = config;
