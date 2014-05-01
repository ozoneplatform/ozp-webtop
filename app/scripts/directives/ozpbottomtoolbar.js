'use strict';

angular.module('ozpWebtopApp')
    .directive('ozpBottomToolbar', function () {
        return {
            templateUrl: 'templates/ozpbottomtoolbar.html',
            restrict: 'A'
        };
    });
