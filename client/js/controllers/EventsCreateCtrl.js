var angular = require('angular');

module.exports = function(name) {
	angular.module(name)
	.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/events/create', {
            controller: 'eventsCreateCtrl',
            templateUrl: "views/events/create.html"
        });

    }])

	.controller('eventsCreateCtrl', ['$scope', '$http', '$upload', '$location',
		function($scope, $http, $upload, $location) {
		
		$scope.getSideTemplateURL = function() {
			return 'views/events/create.side.html';
		};

		$scope.getUserModalURL = function() {
			return 'views/events/create.user-modal.html';
		};

		var event = $scope.event = {
			slots: {},
		};

		$scope.selectableSides = ['blufor', 'opfor', 'greenfor', 'civilian'];
		//@const
		var MAX_UNITS_PER_GROUP = 20;
		var AMOUNT_UNITS_IN_NEW_GROUP = 8;

		var isArr = Array.isArray;

		var modal = $scope.modal = {
			visible: false,
			lastCallback: angular.noop,
			show: function(name, callback) {
				modal.name = name || '';
				modal.lastCallback = callback;
				modal.visible = true;
			},
			close: function(enteredName) {
				if (enteredName) modal.lastCallback(enteredName);
				modal.lastCallback = angular.noop;
				modal.visible = false;
			}
		};

		$scope.enterUserForUnit = function(unit) {
			modal.show(unit.player, function onEnteredName(name) {
				unit.player = name;
			});
		};

		$scope.addUnitToGroup = function(group) {
			if (group.units.length >= MAX_UNITS_PER_GROUP) return;
			group.units.push({});
		};

		$scope.removeUnitFromGroup = function(side, group, groupIndex) {
			if (group.units.length <= 1) return removeGroupFromSide(side, groupIndex);

			group.units.splice(group.units.length-1, 1);
		};

		function makeNewGroup() {
			var ret = {units: []};
			for (var i = 0; i < AMOUNT_UNITS_IN_NEW_GROUP; i++) {
				ret.units.push({});
			}
			return ret;
		}
		$scope.addGroupToSide = function(side) {
			if (!event.slots[side]) event.slots[side] = {};

			side = event.slots[side];

			
			if (!side.groups) side.groups = [];

			side.groups.push(makeNewGroup());
		};

		$scope.setImageChoice = function(choice) {
			if (!choice) $scope.imageUploadError = null;
			$scope.imageChoice = choice;
		};

		$scope.addOrClearGroupsFromSide = function(side) {
			if ($scope.sideHaveGroups(side)) {
				event.slots[side].groups = [];
				return;
			}
			$scope.addGroupToSide(side);
			
		};

		$scope.getGroupsFromSide = function(side) {
			side = event.slots[side];
			if (!side) return;

			return side.groups;
		};

		function removeGroupFromSide(side, idx) {
			return event.slots[side].groups.splice(idx, 1);
		}
		$scope.removeGroupFromSide = removeGroupFromSide;

		$scope.sideHaveGroups = function(side){
			side = event.slots[side];
			return !!(side && side.groups && side.groups.length);
		};

		$scope.anySideHaveGroups = function() {
			return Object.keys(event.slots).some(function(slot) {
				var grps = event.slots[slot].groups;
				return grps && grps.length;
			});
		};

		$scope.getTotalGroupAmount = function() {
			var i = 0;
			Object.keys(event.slots).forEach(function(slot){
				var side = event.slots[slot];
				if (!isArr(side.groups)) return;

				i += side.groups.length;
			});
			return i;
		};

		$scope.getTotalSlotAmount = function() {
			var i = 0;
			Object.keys(event.slots).forEach(function(slot){
				var side = event.slots[slot];
				if (isArr(side.groups)) {
					side.groups.forEach(function(group) {
						i += group.units.length;
					});
				}
			});
			return i;
		};

		$scope.uploadImage = function(file) {
			$scope.imageUploadError = null;
			event.imageUrl = null;
			
			$upload.upload({
	            url: 'upload/event-img',
	            file: file
            }).success(function(response) {
            	event.imageUrl = response.data;
            }).error(function(response) {
				$scope.imageUploadError = response.error;
            });
		};

		$scope.uploadSqmFile = function(file) {
			$scope.sqmUploadError = null;

			$upload.upload({
	            url: 'upload/event-sqm',
	            file: file
            }).success(function(response) {
            	$scope.event.slots = response.data;
            }).error(function(response) {
            	$scope.sqmUploadError = response.error;
            });
		};

		function getEventIsoDate() {
			var d = new Date($scope.eventDate);
			d.setHours(parseInt($scope.eventTime.split(':')[0]), 10);
			d.setMinutes(parseInt($scope.eventTime.split(':')[1]), 10);
			return d.toISOString();
		}

		$scope.submit = function() {
			$scope.sending = true;
			$scope.submitErrors = null;
			event.date = getEventIsoDate();
			event.amountSlots = $scope.getTotalSlotAmount();

			$http.post('/events/create-new', event)
			.success(function(result) {
				$scope = {};
				$location.path("/events");
			}).error(function(response) {
				$scope.submitErrors = response.error;
				$scope.sending = false;
			});
		};

	}]);
};