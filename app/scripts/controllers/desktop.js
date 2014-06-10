'use strict';

angular.module('ozpWebtopApp.controllers')
    .controller('DesktopController', function ($scope, WorkspaceState) {
        // GET the state of the frames
        WorkspaceState.getStateFile('frames').then(function(data) {
            $scope.frames = data.frames;
        });
    });
