'use strict';

/**
 * Directive for the top toolbar on the webtop. Contains a search bar.
 *
 * @class ozpTopToolbar
 * @constructor
 */
angular.module('ozpWebtopApp.directives').directive('ozpTopToolbar', function () {
    return {
        templateUrl: 'templates/ozptoptoolbar.html',
        restrict: 'AE'
    };
});