'use strict';

angular.module('ozpWebtopApp.controllers')

    .controller('DesktopController', function ($scope, WorkspaceState) {

        // GET the state of the frames
        WorkspaceState.getStateFile('frames').then(function (data) {
            $scope.max = { zIndex : 0 };
            $scope.frames = data.frames;

            for (var i = 0, len = $scope.frames.length; i < len; i++) {
                var frame = $scope.frames[i];
                if ($scope.max.zIndex < frame.zIndex) {
                    $scope.max.zIndex = frame.zIndex;
                }
            }
        });

        // GET the state of the icons
        WorkspaceState.getStateFile('icons').then(function (data) {
            $scope.icons = data.icons;
        });

    });
