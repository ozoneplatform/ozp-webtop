'use strict';

angular.module( 'ozpWebtopApp.appToolbar')
.controller('appToolbarCtrl', function($scope, $rootScope, $state,
                                       marketplaceApi, dashboardApi,
                                       dashboardChangeMonitor) {

    $scope.currentDashboardId = '0';

    $scope.$on('activeFrames', function(event, data){
      $scope.dashboards = dashboardApi.getDashboards();
      //if there is a localscope for myPinnedApps
      if($scope.myPinnedApps){
        //for item in the scope change
        for(var a in data){
          for(var b in $scope.myPinnedApps){
            if (($scope.myPinnedApps[b].appId === data[a].appId) && ($scope.myPinnedApps[b].isMinimized !== data[a].isMinimized)){
              //if there isn't a myPinnedApps.AppId OR it is equal to false, set it to be true

              if((!$scope.myPinnedApps[b].isMinimized) || ($scope.myPinnedApps[b].isMinimized === false)){

                $scope.myPinnedApps[b].isMinimized = true;
              }
              else {

                $scope.myPinnedApps[b].isMinimized = false;
              }
            }
          }
        }
      }
      // if there is no myPinnedApps on the local scope
      else {
        $scope.myPinnedApps = data;
      }

    });
    $scope.$on('dashboard-change', function() {
      $scope.dashboards = dashboardApi.getDashboards();
      if($scope.myPinnedApps !== $scope.dashboards[0].frames){
        console.debug('no match');
        console.debug($scope.myPinnedApps);
        console.debug($scope.dashboards[0].frames);
      }
    });

    // register to receive notifications if dashboard changes
    dashboardChangeMonitor.run();

    $scope.$on('dashboardChange', function(event, dashboardChange) {
      if($scope.currentDashboardId !== dashboardChange.dashboardId){
        $scope.currentDashboardId = dashboardChange.dashboardId;
      }

    });

     $scope.maximizeFrame = function(e) {
      dashboardApi.updateFrameKey(e.id, 'isMinimized', 'toggle');
      $rootScope.$broadcast('dashboard-change');
     };

    $scope.myApps = marketplaceApi.getAllApps();
    // $scope.isMinimized = function(e) {
    //   console.log(e.appId);
    //   console.log('is minimized fired');
    //   console.log(e);
    // };
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
        //$state.go($state.$current, null, { reload: false });
        $rootScope.$broadcast('dashboard-change');
      }
      console.log(app);
    };
  });
