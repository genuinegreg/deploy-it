(function() {
	'use strict';

	dployApp.controller('MainCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
		$scope.hash = $routeParams.hash;
	}]);

})();