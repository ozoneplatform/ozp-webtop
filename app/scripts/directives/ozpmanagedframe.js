'use strict';

angular.module('ozpWebtopApp.directives')
    .directive('ozpManagedFrame', function (WorkspaceState) {
        return {
            template: '<iframe src={{frame.url}}></iframe>',
            restrict: 'EA',
            scope: true
        };
    });
