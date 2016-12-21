
import appModule from './app.module';

angular.element(() => angular.bootstrap(document, [
    appModule.name
]));
