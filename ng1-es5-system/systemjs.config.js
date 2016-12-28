/**
 * System.js configuration
 *
 * https://github.com/systemjs/systemjs/blob/master/docs/config-api.md
 */
(function (global) {

    var map = {
        'app': ''
    };

    var packages = {
        'app': {
            main: 'index',
            format: 'cjs',
            defaultExtension: 'js'
        },
        'analytics-ui-components': {
            main: '../node_modules/analytics-ui-components/build/src/analytics-ui-components.module',
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