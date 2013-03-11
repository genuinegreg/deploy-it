'use strict';

angular.module('dployApp').factory('dployApi', ['API_URL', '$resource', function (API_URL, $resource) {

    // -- Api data model

    // defined ressource with a litle hack to escape port
    var App = $resource(API_URL.replace(/(:[0-9]+)$/, '$1\\$1') + '/app.json/list');

    // -- Public API here
    return {
        getApps: function () {
            return App.query();
        }
    };
}]);
