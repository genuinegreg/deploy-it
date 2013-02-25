'use strict';

var dployApp = angular.module('dployApp', [])
    .constant('apiUrl', 'http://paprika.dev:3000')
    .constant('staticUrl', 'http://paprika.dev:3501')
    .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl:'views/main.html',
            controller:'MainCtrl'
        })
        .when('/list', {
            templateUrl:'views/list.html',
            controller:'ListCtrl'
        })
        .when('/:hash', {
            templateUrl:'views/install.html',
            controller:'InstallCtrl'
        })
        .otherwise({
            redirectTo:'/'
        });
}]);

