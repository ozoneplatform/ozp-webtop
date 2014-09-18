'use strict';

angular.module( 'ozpWebtopApp.appToolbar')
  .controller('appToolbarCtrl', function($scope, $rootScope, $state,
                                       marketplaceApi, dashboardApi,
                                       dashboardChangeMonitor, userSettingsApi) {

    $scope.currentDashboardId = dashboardChangeMonitor.dashboardId;

    $scope.appboardhide = false;

    $scope.$on('dashboard-change', function() {
      dashboardApi.getDashboards().then(function(dashboards) {
        for (var i=0; i < dashboards.length; i++) {
          if (dashboards[i].id === dashboardChangeMonitor.dashboardId) {
            $scope.frames = dashboards[i].frames;
            var allApps = marketplaceApi.getAllApps();
            dashboardApi.mergeApplicationData($scope.frames, allApps);
            $scope.myPinnedApps = $scope.frames;
            $scope.layout = dashboardChangeMonitor.layout;
          }
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });

    });
    // register to receive notifications if dashboard changes
    dashboardChangeMonitor.run();

    $scope.$on('dashboardChange', function(event, dashboardChange) {
      if($scope.currentDashboardId !== dashboardChange.dashboardId){
        $scope.currentDashboardId = dashboardChange.dashboardId;
      }

    });

     $scope.maximizeFrame = function(e) {
      dashboardApi.toggleFrameKey(e.id, 'isMinimized').then(function() {
        $rootScope.$broadcast('dashboard-change');
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
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
              // $state.go($state.$current, null, { reload: true });
              $rootScope.$broadcast('dashboard-change');
            }
          }).catch(function(error) {
            console.log('should not have happened: ' + error);
          });
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    };

    $scope.appboardhider = function() {
      if ((!$scope.appboardhide) || ($scope.appboardhide = false)) {
        $scope.appboardhide = true;
        userSettingsApi.updateUserSettingByKey('isAppboardHidden', true);
      }
      else {
        $scope.appboardhide = false;
        userSettingsApi.updateUserSettingByKey('isAppboardHidden', false);
      }
      $rootScope.$broadcast('userSettings-change');
    };

  });

angular.module( 'ozpWebtopApp.appToolbar')
    .directive('appToolbar',function(){
    return {
        restrict: 'E',
        templateUrl: 'appToolbar/appToolbar.tpl.html'
    };
});
