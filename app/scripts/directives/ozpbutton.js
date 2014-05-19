'use strict';

/**
 * ozpButton Renders button with an icon to the left and text to the right.
 *
 * @namespace directives
 * @class ozpButton
 * @constructor
 */
angular.module('ozpWebtopApp.directives')
    .directive('ozpButton', function () {
        return {
            replace: true,
            templateUrl: 'templates/ozpbutton.html',
            restrict: 'EA'
        };
    });
