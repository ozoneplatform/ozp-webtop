'use strict';

/**
 * ozpManagedFrame includes an html document in the webtop
 *
 * @namespace directives
 * @class ozpManagedFrame
 * @constructor
 */
angular.module('ozpWebtopApp.directives')
    .directive('ozpManagedFrame', function (compareUrl, $http, $compile) {

        /**
         * Decides which template to use.
         *
         * @method getTemplate
         * @private
         * @param {Boolean} sameOrigin True if the frame comes from the same origin as the webtop,
         *     false otherwise.
         */
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

        // Directive definition object
        return {

            restrict: 'E',

            link: function (scope, element) {

                // Is the origin the same as the webtop?
                var origin = compareUrl(scope.frame.url);

                // Instead of templateUrl, use $http to load one of two templates
                $http.get(getTemplate(origin)).then(function(response) {
                    element.html($compile(response.data)(scope));
                });

                scope.styles = {
                    'top': scope.frame.size.top,
                    'left': scope.frame.size.left,
                    'height': scope.frame.size.verticalSize,
                    'width': scope.frame.size.horizontalSize,
                    'z-index': scope.frame.zIndex
                };

            }

        };

    });
