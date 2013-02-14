'use strict';

dployApp.factory('dployApi', ['$http', function($http) {
    // Service logic
    // ...
    var meaningOfLife = 42;

    // Public API here
    return {
        getApps: function() {

            return [
                '123456',
                '654321',
                '789456',
                '897654'
            ]

            // $http.post(conf.http.host + 'getApp', {})
        }
    };
}]);
