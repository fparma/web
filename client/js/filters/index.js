var angular = require('angular')
var name = 'app.filters'

// TODO: Maybe move these into own files

angular.module(name, [])
.filter('dateLocalize', function () {
  return function (utcDate) {
		// return new Date(utcDate + 'Z').getTime();
    return utcDate
  }
})
.filter('capitalize', function () {
  return function (str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase()
  }
})

module.exports = exports = name
