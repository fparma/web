var angular = require('angular');
var name = 'app.events';

angular.module(name, ['angularFileUpload'])
.config(['$routeProvider',
    function($routeProvider) {

        $routeProvider
            .when('/events', {
                templateUrl: "components/events/events.list.html",
                controller: 'eventsListCtrl'
            })
            .when('/events/create', {
                templateUrl: "components/events/events.create.html",
            });
    }
]);

require('./events.create')(name);
require('./events.list')(name);

module.exports = name;