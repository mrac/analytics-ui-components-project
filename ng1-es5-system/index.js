
var analyticsUiComponents = require('analytics-ui-components').default;

angular.module('app', [
    analyticsUiComponents.name
]);

angular.element(function () {
    angular.bootstrap(document, ['app']);
});

