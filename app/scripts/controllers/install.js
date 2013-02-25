(function () {
    'use strict';

    angular.module('dployApp').controller('InstallCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
        $scope.hash = $routeParams.hash;
    }]);

})();