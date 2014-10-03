'use strict';

/**
 * ChromeCtrl aids the ozpChrome directive in knowing its location (grid or desktop).
 */
angular.module('ozpWebtopApp.components')
.controller('ChromeCtrl', function ($scope, $rootScope, dashboardApi,
                                          dashboardChangeMonitor) {

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
    dashboardApi.toggleFrameKey(e.id, 'isMinimized').then(function() {
      $rootScope.$broadcast('dashboard-change');
    }).catch(function(error) {
      console.log('should not have happened: ' + error);
    });

  };

  $scope.maximizeFrame = function(e){
    dashboardApi.toggleFrameKey(e.id, 'isMaximized').then(function() {
      $rootScope.$broadcast('dashboard-change');
    }).catch(function(error) {
      console.log('should not have happened: ' + error);
    });
  };

});
