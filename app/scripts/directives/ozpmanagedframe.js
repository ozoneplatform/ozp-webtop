'use strict';

/**
 * ozpManagedFrame includes an html document in the webtop
 *
 * @namespace directives
 * @class ozpManagedFrame
 * @constructor
 */
angular.module('ozpWebtopApp.directives')
    .directive('ozpManagedFrame', function () {
        return {
            // Temporary inline template
            template: '<iframe src={{frame.url}}></iframe>',
            restrict: 'EA',
            scope: true
        };
    });
