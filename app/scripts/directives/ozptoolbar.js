'use strict';

angular.module('ozpWebtopApp.directives')
    .directive('ozpToolbar', function (WorkspaceState) {
        return {
            templateUrl: 'templates/toolbar.html',
            restrict: 'EA',
            scope: true,
            link: function ($scope, $element, $attrs) {
                console.log(WorkspaceState);
                var position = $attrs.ozpToolbar.toLowerCase();

                // Based on position specified, include the correct template
                $scope.contentUrl = 'templates/ozp' + position + 'toolbar.html';

                var state;

                if (position === 'top') {
                    state = WorkspaceState.getTopToolbarState();
                } else {
                    state = WorkspaceState.getBottomToolbarState();
                }

                console.log(state);
            }
        };
    });
