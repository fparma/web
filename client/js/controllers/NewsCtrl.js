var angular = require('angular');

module.exports = function(name) {
    angular.module(name)
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/news', {
                    templateUrl: 'views/news.html',
                    controller: 'newsCtrl'
                });
        }
    ])
    .controller('newsCtrl', ['$scope',
        function($scope) {
            $scope.posts = [{
                title: 'Hello world',
                body: 'An h1 header ============<br/>' +
                    'Paragraphs are separated by a blank line. 2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists look like: * this one * that one * the other one Note that --- not considering the asterisk --- the actual text content starts at 4-columns in. > Block quotes are > written like so. > > They can span multiple paragraphs, > if you like. Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "its all in chapters 12--14"). Three dots ... will be converted to an ellipsis. Unicode is supported. ☺',
                author: 'Cuel',
                created: new Date()
            }];
        }
    ]);
};
