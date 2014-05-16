'use strict';

angular.module('ozpWebtopApp.directives')
    .directive('ozpToolbar', function (WorkspaceState) {

        return {
            templateUrl: 'templates/toolbar.html',
            restrict: 'EA',
            scope: {},
            link: function ($scope, $element, $attrs) {

                var location = $attrs.ozpToolbar.toLowerCase();

                // Based on location specified, include the correct template
                $scope.contentUrl = 'templates/ozp' + location + 'toolbar.html';

                if (location === 'top') {
                    $scope.state = WorkspaceState.getTopToolbarState();
                } else if (location === 'bottom') {
                    $scope.state = WorkspaceState.getBottomToolbarState();
                }

            }
        };
    });
