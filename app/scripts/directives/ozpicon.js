'use strict';

/**
 * ozpIcon Renders an icon as an anchor. It has an image on top and text below.
 *
 * @namespace directives
 * @class ozpIcon
 * @constructor
 */
angular.module('ozpWebtopApp.directives')

    .directive('ozpIcon', function () {

        return {

            replace: true,

            templateUrl: 'templates/ozpicon.html',

            restrict: 'E',

            // Controller is a placeholder, this may need to be removed/refactored...
            controller: function ($scope) {

                $scope.handleIconClick = function (icon) {

                    // Fire a scope event to notify other scopes of the icon click
                    $scope.$emit('iconClick', icon);

                };

            }

        };

    });
