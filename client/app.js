var angular = require('angular');

var FastClick = require('fastclick').FastClick;

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
// test
var menu = require('./components/menu/menu');
var news = require('./components/news/news');
var events = require('./components/events');

angular.module('app', [
    'ngRoute',
    menu,
    news,
    events
])

.config(['$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/contact', {
          templateUrl: "views/contact.html"
        })
        .otherwise({
            redirectTo: '/news'
        });
    }
])
.filter('capitalize', function() {
    return function(str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    };
});
