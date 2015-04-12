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
				response.data.forEach(function(event) {
					event.date = new Date(event.date);
				});

				$scope.events = response.data;
			});
		}
		init();

	}]);
};