'use strict';

/**
 * ozpManagedFrame includes an html document in the webtop
 *
 * @namespace directives
 * @class ozpManagedFrame
 * @constructor
 */
angular.module('ozpWebtopApp.directives')
    .directive('ozpManagedFrame', function (compareUrl) {

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
            templateUrl: 'templates/ozpmanagedframe.html',
            restrict: 'E',
            scope: {
                frame: '='
            },
            link: function (scope, element) {

                // Is the origin the same as the webtop?
                var origin = compareUrl(scope.frame.url);

                // Load template based on the origin
                scope.contentUrl = getTemplate(origin);

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
