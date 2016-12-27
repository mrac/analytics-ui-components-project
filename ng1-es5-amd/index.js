requirejs(['analytics-ui-components'], function (analyticsUiComponents) {

    angular.module('app', [
        analyticsUiComponents.name
    ]);

    angular.element(function () {
        angular.bootstrap(document, ['app']);
    });

});
