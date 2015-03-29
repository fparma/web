var angular = require('angular');

module.exports = function(name) {
	angular.module(name)
	.controller('eventsCreateCtrl', ['$scope', function($scope) {
		console.log($scope.event);
	}]);
};