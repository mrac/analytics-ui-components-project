requirejs(['./node_modules/analytics-ui-components/dist/analytics-ui-components.amd.js'], function (analyticsUiComponents) {

    angular.module('app', [
        analyticsUiComponents.name
    ]);

    angular.element(function () {
        angular.bootstrap(document, ['app']);
    });

});
