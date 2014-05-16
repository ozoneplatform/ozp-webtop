'use strict';

angular.module('ozpWebtopApp.directives')
    .directive('ozpToolbar', function (WorkspaceState) {
        return {
            templateUrl: 'templates/toolbar.html',
            restrict: 'EA',
            scope: true,
            link: function ($scope, $element, $attrs) {
                console.log(WorkspaceState);
                var location = $attrs.ozpToolbar.toLowerCase();

                // Based on location specified, include the correct template
                $scope.contentUrl = 'templates/ozp' + location + 'toolbar.html';

                var state;

                if (location === 'top') {
                    state = WorkspaceState.getTopToolbarState();
                } else {
                    state = WorkspaceState.getBottomToolbarState();
                }

                console.log(state);
            }
        };
    });
