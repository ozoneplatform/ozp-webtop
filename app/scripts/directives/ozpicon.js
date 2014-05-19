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
            restrict: 'EA'
        };
    });
