'use strict';

/**
 * ozpGridster is a wrapper around a 'ul' element used to manage the grid layout.
 *
 * @namespace directives
 * @class ozpGridster
 * @constructor
 */
angular.module('ozpWebtopApp.directives')

    /**
     * gridsterItem is a wrapper around a tile in the grid
     *
     * @namespace directives
     * @class gridsterItem
     * @constructor
     */
    .directive('ozpGridsterItem', function ($compile, $http, compareUrl) {

        var getTemplate = function (sameOrigin) {
            var template = '';

            // If different origin, use an iframe template
            if (!sameOrigin) {
                template = 'templates/managediframe.html';
            }
            // otherwise, use a 'frame' (div) template
            else {
                template = 'templates/managedframe.html';
            }
            return template;
        };

        return {

            replace: true,

            restrict: 'AE',

            // TODO: use controller for inter-directive communication
            // require: '^ozpGridster',

            scope: {
                frame: '='
            },

            link: function (scope, element) {

                // Is the origin the same as the webtop?
                var origin = compareUrl(scope.frame.url);

                // Instead of templateUrl, use $http to load one of two templates
                $http.get(getTemplate(origin)).then(function(response) {
                    element.html($compile(response.data)(scope));

                    // Add the managed frame class to take advantage of the styles
                    element.addClass('ozp-managed-frame');
                });

                // TODO: make these dynamic
                scope.styles = {
                    'height': 205,
                    'width': 205
                };

            }

        };

    });
