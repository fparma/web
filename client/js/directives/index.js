var angular = require('angular');
var name = 'app.directives';

// TODO: Maybe move these into own files

angular.module(name, [])
.directive('appMenu', function() {
    return {
        templateUrl: 'views/menu.html'
    };
})
.directive('blurAfterClick', function() {
    return {
        link: function(scope, element) {
            element.bind('click', function() {
                element[0].blur();
            });
        }
    };
})
.directive('markdown', function() {
	//var converter = new Showdown.converter();
	return {
	    restrict: 'A',
	    scope: {
	        md: '='
	    },
	    link: function(scope, element, attrs) {
	        //var htmlText = converter.makeHtml(scope.md);
	        //element.html(htmlText);
	    }
	};
})
.directive('imgLoading', function(){
    return {
        template: '<div class="pure-g"><div class="pure-u-1-3"></div> <div class="pure-u-1-3"><img class="pure-img-responsive" style="display: block; margin: auto;" src="img/ajaxload.gif" alt="loading..."/></div> <div class="pure-u-1-3"></div></div>'
    };
});

module.exports = exports = name;