'use strict';

angular.module('ozpWebtopApp.controllers')
    .controller('IframeController', function ($scope, $sce) {
        $scope.frame.url = $sce.trustAsResourceUrl($scope.frame.url);
    });
