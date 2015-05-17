var angular = require('angular')
var FastClick = require('fastclick').FastClick

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

var controllers = require('./controllers')
var directives = require('./directives')
var filters = require('./filters')

angular.module('app', [
  'ngRoute',
  'ngModal',
  'ngSanitize',
  '720kb.tooltips',
  'angular-datepicker',
  'angularFileUpload',
  controllers,
  directives,
  filters
  ])
.config(['$locationProvider', '$routeProvider', 'ngModalDefaultsProvider',
  function ($locationProvider, $routeProvider, ngModalDefaultsProvider) {

    ngModalDefaultsProvider.set('closeButtonHtml', "<i class='fa fa-times'></i>")

    $locationProvider.html5Mode(true)
    $locationProvider.hashPrefix('')

    $routeProvider
    .when('/contact', {
      templateUrl: 'views/contact.html'
    })
    .otherwise({
      redirectTo: '/news'
    })
  }
])
