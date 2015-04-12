var angular = require('angular');

module.exports = function(name) {
    angular.module(name)
    .controller('appNavigationMenu', ['$scope', '$location', '$window', '$timeout',
        function($scope, $location, $window, $timeout) {

            $scope.mobileMenuActive = false;
            $scope.links = [{
                url: 'news'
            }, {
                url: 'events'
            }, {
                divider: true,
                url: 'contact'
            }, {
                url: 'about'
            }];

            $scope.toggleMobileMenu = function(linkedClicked) {
                if (linkedClicked) {
                    if ($scope.mobileMenuActive) {
                        $scope.mobileMenuActive = false;
                    }
                } else {
                    $scope.mobileMenuActive = !$scope.mobileMenuActive;
                }
            };

            $scope.isActive = function(page) {
                var currentRoute = $location.path().substring(1).split('/')[0] || 'news';
                return page === currentRoute;
            };

            // In case the menu is open and the window resized, we need  to manually remove the
            // active class from the layout
            var mql;
            var handleMatchMedia = function(mql) {
                if (mql.matches) {
                    $scope.mobileMenuActive = false;
                    $timeout(function() {
                        $scope.$apply();
                    }, 1);
                }
            };

            if ($window.matchMedia) {
                mql = $window.matchMedia('(min-width: 48em)');
                mql.addListener(handleMatchMedia);
                handleMatchMedia(mql);
            }
            // else? who cares about IE

            $scope.$on('$destroy', function() {
              if (mql) {
                mql.removeListener(handleMatchMedia);
              }
            });

        }
    ]);
};