'use strict';

var dployApp = angular.module('dployApp', []).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    }).
    when('/:hash', {
        templateUrl: 'views/install.html',
        controller: 'InstallCtrl'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);