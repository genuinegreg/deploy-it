(function() {

	'use strict';

	dployApp.controller('ListCtrl', ['$scope', 'dployApi', function($scope, dployApi) {
		
		$scope.apps = dployApi.getApps();

	}]);
})();
