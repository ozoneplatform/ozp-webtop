'use strict';

angular.module('ozpWebtopApp')
    .directive('ozpChrome', function () {
        return {
            templateUrl: 'templates/ozpchrome.html',
            restrict: 'E',
            replace: true
        };
    });
