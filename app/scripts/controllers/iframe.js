'use strict';

angular.module('ozpWebtopApp.controllers')
    .controller('IframeController', function ($scope, $sce) {
        $scope.frame.trustedUrl = $sce.trustAsResourceUrl($scope.frame.url);
    });
