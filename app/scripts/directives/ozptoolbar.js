'use strict';

angular.module('ozpWebtopApp.directives')
    .directive('ozpToolbar', function (WorkspaceState) {

        var findToolbar = function(toolbars, location) {
            var toolbar = {};
            angular.forEach(toolbars, function(value){
                if (value.location === location){
                    toolbar = value;
                }
            });
            return toolbar;
        };

        return {
            templateUrl: 'templates/toolbar.html',
            restrict: 'EA',
            scope: true,
            link: function ($scope, $element, $attrs) {

                var location = $attrs.ozpToolbar.toLowerCase();

                // Based on location specified, include the correct template
                $scope.contentUrl = 'templates/ozp' + location + 'toolbar.html';

                WorkspaceState.getStateFile('toolbars').then(function(data) {
                    if (location === 'top') {
                        $scope.state = findToolbar(data.toolbars, 'top');
                    } else if (location === 'bottom') {
                        $scope.state = findToolbar(data.toolbars, 'bottom');
                    }
                });

            }
        };
    });
