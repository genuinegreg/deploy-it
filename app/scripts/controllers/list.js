(function () {

    'use strict';

    angular.module('dployApp').controller('ListCtrl', ['$scope', 'dployApi', function ($scope, dployApi) {

        // get apps
        $scope.apps = dployApi.getApps();

    }]);

})();
