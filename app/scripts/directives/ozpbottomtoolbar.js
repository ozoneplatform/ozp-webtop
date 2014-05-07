'use strict';

/**
 * Directive for the bottom toolbar on the webtop. Contains a Windows '95 style heirarchical menu
 * and buttons.
 */
angular.module('ozpWebtopApp.directives').directive('ozpBottomToolbar', function () {
    return {
        templateUrl: 'templates/ozpbottomtoolbar.html',
        restrict: 'AE'
    };
});