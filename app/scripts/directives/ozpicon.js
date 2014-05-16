'use strict';

angular.module('ozpWebtopApp.directives')
    .directive('ozpIcon', function () {
        return {
            replace: true,
            templateUrl: 'templates/ozpicon.html',
            restrict: 'EA'
        };
    });
