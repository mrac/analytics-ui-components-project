import rollupPluginIncludepaths from 'rollup-plugin-includepaths';
import rollupPluginTypescript from 'rollup-plugin-typescript';
import typescript from 'typescript';


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
const d3packages = ['d3', 'd3-array', 'd3-collection', 'd3-random', 'd3-ease', 'd3-polygon', 'd3-path', 'd3-quadtree', 'd3-queue', 'd3-shape', 'd3-color', 'd3-interpolate', 'd3-dispatch', 'd3-dsv', 'd3-request', 'd3-timer', 'd3-time', 'd3-format', 'd3-time-format', 'd3-scale', 'd3-selection', 'd3-transition', 'd3-axis', 'd3-hierarchy', 'd3-force', 'd3-drag', 'd3-voronoi', 'd3-zoom', 'd3-brush', 'd3-chord', 'd3-geo'];
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
