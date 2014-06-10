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
    .directive('ozpToolbar', function (WorkspaceState, $http, $compile) {

        /**
         * Helper function to find either the top or bottom toolbar in the toolbar array.
         *
         * @method findToolbar
         * @private
         * @return {Object} toolbar the toolbar state object pertaining to the specified location
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

        /**
         * Decides which template to use based on a specified location
         *
         * @method getTemplate
         * @private
         * @param {String} location either a
         * @return {String} template a template's url
         */
        var getTemplate = function (location) {
            var template = '';

            // Use top or bottom template
            if (location === 'top') {
                template = 'templates/toptoolbar.html';
            } else if (location === 'bottom') {
                template = 'templates/bottomtoolbar.html';
            }
            return template;
        };

        // Directive definition object
        return {

            restrict: 'E',

            link: function (scope, element, attrs) {

                var location = attrs.location.toLowerCase();

                // Instead of templateUrl, use $http/$compile to load one of two templates
                $http.get(getTemplate(location)).then(function(response) {
                    element.html($compile(response.data)(scope));
                });

            },

            controller: function ($scope, $element, $attrs) {

                // Get the toolbar state file and set state on an Angular scope
                WorkspaceState.getStateFile('toolbars').then(function(data) {

                    $scope.top = findToolbar(data.toolbars, 'top');
                    $scope.bottom = findToolbar(data.toolbars, 'bottom');

                });

            }
        };
    });
