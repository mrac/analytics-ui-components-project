/**
 * System.js configuration
 *
 * https://github.com/systemjs/systemjs/blob/master/docs/config-api.md
 */
(function (global) {

    var map = {
        'app': '',
        'analytics-ui-components': 'node_modules/analytics-ui-components/build/src'
    };

    // map all d3 external packages to node_modules
    var d3packages = ['d3', 'd3-array', 'd3-collection', 'd3-random', 'd3-ease', 'd3-polygon', 'd3-path', 'd3-quadtree', 'd3-queue', 'd3-shape', 'd3-color', 'd3-interpolate', 'd3-dispatch', 'd3-dsv', 'd3-request', 'd3-timer', 'd3-time', 'd3-format', 'd3-time-format', 'd3-scale', 'd3-selection', 'd3-transition', 'd3-axis', 'd3-hierarchy', 'd3-force', 'd3-drag', 'd3-voronoi', 'd3-zoom', 'd3-brush', 'd3-chord', 'd3-geo'];
    d3packages.forEach(function (pck) {
        map[pck] = 'node_modules/' + pck + '/build/' + pck + '.js';
    });

    var packages = {
        'app': {
            main: 'index',
            format: 'cjs',
            defaultExtension: 'js'
        },
        'analytics-ui-components': {
            main: 'analytics-ui-components.module',
            format: 'register',
            defaultExtension: 'js'
        }
    };

    var config = {
        map: map,
        packages: packages,
        baseURL: '.'
    };

    System.config(config);

})(this);