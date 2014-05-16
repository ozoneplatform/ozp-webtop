'use strict';

angular.module('ozpWebtopApp.directives')
    .directive('ozpTbItem', function () {
        return {
            replace: true,
            template: '<div></div>',
            restrict: 'EA',
            link: function (scope, element, attrs) {
                element.text('this is the ozpTbItem directive');
            }
        };
    });
