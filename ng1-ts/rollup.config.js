import rollupPluginIncludepaths from 'rollup-plugin-includepaths';
import rollupPluginTypescript from 'rollup-plugin-typescript';
import typescript from 'typescript';
import d3packages from './node_modules/analytics-ui-components/config/d3-packages';


const includePathOptions = {
    include: {},
    paths: [
        '.',
        'node_modules/analytics-ui-components/src',
    ],
    external: [],
    extensions: ['.ts', '.js']
};

const typescriptOptions = {
    module: 'es6',
    typescript: typescript,
    paths: {}
};


// map all d3 external packages to node_modules
d3packages.forEach(pck => typescriptOptions.paths[pck] = ['node_modules/' + pck + '/index.js']);


const config = {
    entry: 'src/index.ts',
    format: 'iife',
    dest: './build/index.js',
    plugins: [
        rollupPluginIncludepaths(includePathOptions),
        rollupPluginTypescript(typescriptOptions)
    ]
};

export default config;
