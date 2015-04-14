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
                body: 'words',
                author: 'Cuel',
                created: new Date()
            }];
        }
    ]);
};
