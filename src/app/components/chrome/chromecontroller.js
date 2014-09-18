'use strict';

/**
 * ChromeController aids the ozpChrome directive in knowing its location (grid or desktop).
 */
angular.module('ozpWebtopApp.components')
.controller('ChromeController', function ($scope, $rootScope, dashboardApi, dashboardChangeMonitor) {

  // register to receive notifications if dashboard changes
  dashboardChangeMonitor.run();

  $scope.$on('dashboardChange', function(event, dashboardChange) {
    // Determine if chrome is being used in the grid view
    if (dashboardChange.layout === 'grid') {
      $scope.isGrid = true;
    } else {
      $scope.isGrid = false;
    }
  });

  $scope.isDisabled = function(e){

    dashboardApi.removeFrame(e.id).then(function() {
      $rootScope.$broadcast('dashboard-change');
    }).catch(function(error) {
      console.log('should not have happened: ' + error);
    });

  };

  $scope.minimizeFrame = function(e){
    dashboardApi.toggleFrameKey(e.id, 'isMinimized');
    $rootScope.$broadcast('dashboard-change');
  };

  $scope.maximizeFrame = function(e){
    dashboardApi.toggleFrameKey(e.id, 'isMaximized');
    $rootScope.$broadcast('dashboard-change');
  };

});
