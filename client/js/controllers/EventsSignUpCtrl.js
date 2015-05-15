var angular = require('angular');

module.exports = function(name) {
	angular.module(name)
	.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/events/event/:eventId', {
            controller: 'eventsSignUpCtrl',
            templateUrl: "views/events/sign-up.html"
        });

    }])

	.controller('eventsSignUpCtrl', ['$scope', '$http', '$routeParams',
	function($scope, $http, $routeParams) {

		var eventId = $routeParams.eventId;
		$scope.selectableSides = ['blufor', 'opfor', 'greenfor', 'civilian'];

		$http.get('event/' + eventId)
		.success(function(response) {
			$scope.event = response.data;
		})
		.error(function(response) {
			$scope.error = response.error;
		});

		$scope.selectSlot = function(side, unit) {
			$http.post('event/select-slot', 
			{
				event: eventId,
				side: side,
				slot: unit._id,
			})
			.success(function(response) {
				$scope.event = response.data;
			})
			.error(function(response) {
				$scope.event = response.data;
			});

		};

		$scope.kickSlot = function() {

		};

	}]);
};