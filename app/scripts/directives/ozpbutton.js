'use strict';

angular.module('ozpWebtopApp.directives')
    .directive('ozpButton', function () {
        return {
            templateUrl: 'templates/ozpbutton.html',
            restrict: 'EA'
        };
    });
