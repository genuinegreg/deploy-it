(function () {
    'use strict';

    angular.module('dployApp').controller('MainCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {

        $scope.hash = $routeParams.hash;


    }]);

})();