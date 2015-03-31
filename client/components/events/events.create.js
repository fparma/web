var angular = require('angular');

module.exports = function(name) {
	angular.module(name)
	.controller('eventsCreateCtrl', ['$scope', function($scope) {
		
		var data = $scope.data = {
			slots: {
				blufor: {
					groups: [
						{
							name: 'Group 01',
							units: [{},{}]
						}
					]
				}
			}
		};

		$scope.selectableSides = ['blufor', 'opfor', 'greenfor', 'civ'];

		$scope.addGroupToSide = function(side) {
			if (!data.slots[side]) {
				data.slots[side] = {};
			}
			side = data.slots[side];
			
			if (!side.groups) side.groups = [];

			side.groups.push({});
		};

		$scope.addOrClearGroupsFromSide = function(side, evt) {
			// if box was unchecked
			if (!evt.target.checked) {
				data.slots[side].groups = [];
				return;
			}

			$scope.addGroupToSide(side);
			
		};

		$scope.getGroupsFromSide = function(side) {
			side = data.slots[side];
			if (!side) return;

			return side.groups;
		};

		$scope.sideHaveGroups = function(side){
			side = data.slots[side];
			return side && side.groups && side.groups.length;
		};

		$scope.anySideHaveGroups = function() {
			return Object.keys(data.slots).some(function(slot) {
				var grps = data.slots[slot].groups;
				return grps && grps.length;
			});
		};

	}]);
};