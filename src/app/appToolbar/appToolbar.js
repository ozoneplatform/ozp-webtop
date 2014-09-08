'use strict';

angular.module( 'ozpWebtopApp.appToolbar')
.controller('appToolbarCtrl', function($scope, $rootScope, $state,
                                       marketplaceApi, dashboardApi,
                                       dashboardChangeMonitor) {

    $scope.currentDashboardId = '0';
    $scope.superfunframe = 'chris hogan';
    // TODO: clean this up
    // $rootScope.$watch('activeFrames', function () {

    //   if ($rootScope.activeFrames) {
    //     $scope.myPinnedApps = $rootScope.activeFrames;
    //   }
    // });
    $scope.$on('activeFrames', function(event, data){
      $scope.myPinnedApps = data;
    });

    $scope.$on('dashboard-change', function(){
      //
    });
    // register to receive notifications if dashboard changes
    dashboardChangeMonitor.run();

    $scope.$on('dashboardChange', function(event, dashboardChange) {
      $scope.currentDashboardId = dashboardChange.dashboardId;
      // $rootScope.currentDashboardId = dashboardChange.dashboardId;
    });
    // $scope.$on('dashboard-change', function() {
    //   // $scope.currentDashboardId = dashboardChange.dashboardId;
    //   // $rootScope.currentDashboardId = dashboardChange.dashboardId;
    //   $scope.currentDashboardId = dashboardChange.dashboardId;
    // });
     $scope.maximizeFrame = function(e) {
      dashboardApi.updateFrameKey(e.id, 'isMinimized', 'toggle');
      // return false;
       // if(e.isMinimized === true){
       //   e.isMinimized = false;
       // }
     };

    $scope.myApps = marketplaceApi.getAllApps();

    $scope.appClicked = function(app) {
      console.log($scope);
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
      console.log(app);
    };
  });
