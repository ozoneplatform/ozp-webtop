'use strict';

angular.module('ozpWebtopApp.dashboardView')
  .controller('DesktopController', function ($scope, WorkspaceState, $rootScope) {

    // GET the state of the frames
    WorkspaceState.getStateFile('frames').then(function (data) {
      $rootScope.activeFrames = data.frames;
      $scope.max = {};
      $scope.frames = data.frames;

      $scope.frames.sort(function(a, b) {
        return ((a.zIndex < b.zIndex) ? -1 :
              ((a.zIndex > b.zIndex) ? 1 : 0));
      });
      console.log($scope.frames);
      for (var i = 0, len = $scope.frames.length; i < len; i++) {
        $scope.frames[i].zIndex = i;
      }

      $scope.max.zIndex = $scope.frames.length - 1;
    });

    // GET the state of the icons
    WorkspaceState.getStateFile('icons').then(function (data) {
      $scope.icons = data.icons;
    });
  });