'use strict';

dployApp.factory('dployApi', ['$http', function($http) {
    // Service logic
    // ...
    var meaningOfLife = 42;

    // Public API here
    return {
        getApps: function() {

            return [
                {
                    name: "MyApp",
                    upload: new Date(2013, 1, 12, 15, 32,0),
                    version: 5,
                    hash: "654321",
                    download: 6
                },
                {
                    name: "OtherApp",
                    upload: new Date(2013, 0, 29, 14, 10),
                    version: 1,
                    hash: "123456",
                    download: 15
                },
                {
                    name: "SomeApp",
                    upload: new Date(2013, 1, 19, 9, 59),
                    version: 16,
                    hash: "abc54d",
                    download: 46
                }
            ];

            // $http.post(conf.http.host + 'getApp', {})
        }
    };
}]);
