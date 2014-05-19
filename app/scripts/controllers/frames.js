'use strict';

angular.module('ozpWebtopApp.controllers')
    .controller('FramesController', function ($scope, WorkspaceState) {
        WorkspaceState.getStateFile('frames').then(function(data) {
            $scope.frames = data.frames;
        });
    });
