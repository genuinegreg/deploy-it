(function() {
	'use strict';

	dployApp.controller('InstallCtrl',['$scope', '$routeParams', function ($scope, $routeParams) {
		$scope.hash = $routeParams.hash;
	}]);

})();