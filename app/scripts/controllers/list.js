(function () {

    'use strict';

    angular.module('dployApp').controller('ListCtrl', ['$scope', 'dployApi', function ($scope, dployApi) {

        $scope.apps = dployApi.getApps();

    }]);
})();
