var angular = require('angular')
var name = 'app.directives'

// TODO: Maybe move these into own files

angular.module(name, [])
.directive('appMenu', function () {
  return {
    templateUrl: 'views/menu.html'
  }
})
.directive('blurAfterClick', function () {
  return {
    link: function (scope, element) {
      element.bind('click', function () {
        element[0].blur()
      })
    }
  }
})
.directive('imgLoading', function () {
  return {
    template: '<div class="pure-g loading-img">' +
    '<div class="pure-u-1-3"></div> ' +
    '<div class="pure-u-1-3"> ' +
    '<img class="pure-img-responsive" style="display: block margin: auto" src="img/ajaxload.gif" alt="loading..."/> ' +
    '</div> <div class="pure-u-1-3"></div></div>'
  }
})

module.exports = exports = name
