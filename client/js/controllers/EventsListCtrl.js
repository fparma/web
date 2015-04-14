var angular = require('angular');

module.exports = function(name) {
	angular.module(name)
	.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/events', {
            controller: 'eventsListCtrl',
            templateUrl: "views/events/list.html"
        });

    }])

	.controller('eventsListCtrl', ['$scope', '$http', function($scope, $http) {
		function init() {
			$http.get('/events/list')
			.success(function(response) {
				$scope.events = response.data;
			})
			.error(function(response) {
				$scope.error = response.error;
			});
		}
		
		init();

	}]);
};