'use strict';

angular.module('ozpWebtopApp.directives')
    .directive('ozpButton', function () {
        return {
            replace: true,
            templateUrl: 'templates/ozpbutton.html',
            restrict: 'EA'
        };
    });
