'use strict';

/**
 * ozpToolbar Renders a toolbar based on a state. It can be specified to be either 'top' or
 * 'bottom'.
 *
 * @example
 *     <ozp-toolbar location="top"></ozp-toolbar>
 *
 * @namespace directives
 * @class ozpToolbar
 * @constructor
 */
angular.module('ozpWebtopApp.directives')
    .directive('ozpToolbar', function (WorkspaceState) {

        /**
         * Helper function to find either the top or bottom toolbar in the toolbar array.
         *
         * @method findToolbar
         * @private
         */
        var findToolbar = function(toolbars, location) {
            var toolbar = {};
            angular.forEach(toolbars, function(value){
                if (value.location === location){
                    toolbar = value;
                }
            });
            return toolbar;
        };

        // Directive definition object
        return {
            templateUrl: 'templates/toolbar.html',
            restrict: 'E',
            scope: true,
            link: function ($scope, $element, $attrs) {

                var location = $attrs.location.toLowerCase();

                // Based on location specified, include the correct template
                $scope.contentUrl = 'templates/ozp' + location + 'toolbar.html';

                // Get the toolbar state file and set state on an Angular scope
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
