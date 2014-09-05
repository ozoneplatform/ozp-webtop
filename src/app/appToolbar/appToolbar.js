'use strict';

angular.module( 'ozpWebtopApp.appToolbar')
.controller('appToolbarCtrl', function($scope, $rootScope, $state,
                                       marketplaceApi, dashboardApi,
                                       dashboardChangeMonitor) {

    $scope.currentDashboardId = '0';

    // TODO: clean this up
    $rootScope.$watch('activeFrames', function () {

      if ($rootScope.activeFrames) {
        $scope.myPinnedApps = $rootScope.activeFrames;
      }
    });

    // register to receive notifications if dashboard changes
    dashboardChangeMonitor.run();

    $scope.$on('dashboardChange', function(event, dashboardChange) {
      $scope.currentDashboardId = dashboardChange.dashboardId;
      $rootScope.currentDashboardId = dashboardChange.dashboardId;
    });

     $scope.maximizeFrame = function(e) {
       if(e.isMinimized === true){
         e.isMinimized = false;
       }
     };

    $scope.myApps = marketplaceApi.getAllApps();

    $scope.appClicked = function(app) {
      // check if the app is already on the current dashboard
      // TODO: support non-singleton apps
      dashboardApi.isAppOnDashboard($scope.currentDashboardId, app.id).then(function(isOnDashboard) {
        if (isOnDashboard) {
          alert('This application is already on your dashboard');
        } else {
          // add this app to the dashboard
          // TODO: use message broadcast to get grid max rows and grid max cols
          dashboardApi.createFrame($scope.currentDashboardId, app.id, 10).then(function(response) {
            // reload this dashboard
            if (response) {
              $state.go($state.$current, null, { reload: true });
            }
          }).catch(function(error) {
            console.log('should not have happened: ' + error);
          });
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    };
  });
