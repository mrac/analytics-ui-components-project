
import AppCtrl from './app.controller';
import uiComponentsModule from 'analytics-ui-components.module';


const appModule = angular
    .module('app', [
        uiComponentsModule.name
    ])
    .controller('AppCtrl', AppCtrl);

export default appModule;
