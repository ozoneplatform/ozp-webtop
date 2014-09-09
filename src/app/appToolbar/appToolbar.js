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
      var isOnDashboard = dashboardApi.isAppOnDashboard(
        $scope.currentDashboardId, app.id);
      if (isOnDashboard) {
        alert('This application is already on your dashboard');
      } else {
        // add this app to the dashboard
        // TODO: use message broadcast to get grid max rows and grid max cols
        dashboardApi.createFrame($scope.currentDashboardId, app.id, 10);
        // reload this dashboard
        $state.go($state.$current, null, { reload: true });
      }
    };
  });

angular.module( 'ozpWebtopApp.appToolbar')
    .directive('appToolbar',function(){
    return {
        restrict: 'E',
        templateUrl: 'appToolbar/appToolbar.tpl.html'
    };
});