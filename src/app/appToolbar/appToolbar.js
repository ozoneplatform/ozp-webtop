'use strict';

angular.module( 'ozpWebtopApp.appToolbar')
  .controller('ApplicationToolbarCtrl', function($scope, $rootScope, $state,
                                       marketplaceApi, dashboardApi,
                                       dashboardChangeMonitor, userSettingsApi,
                                        windowSizeWatcher) {

    windowSizeWatcher.run();

    $scope.$on('window-size-change', function(event, value) {
      // TODO: need further testing to validate these numbers
      if (value.deviceSize === 'sm') {
        $scope.maxAppsDisplayed = 3;
        $scope.setPinnedApps();
      } else if (value.deviceSize === 'md') {
        $scope.maxAppsDisplayed = 5;
        $scope.setPinnedApps();
      } else if (value.deviceSize === 'lg') {
        $scope.maxAppsDisplayed = 8;
        $scope.setPinnedApps();
      }
    });

    $scope.currentDashboardId = dashboardChangeMonitor.dashboardId;

    $scope.appboardhide = false;

    marketplaceApi.getAllApps().then(function(apps) {
      $scope.apps = apps;
    }).catch(function(error) {
      console.log('should not have happened: ' + error);
    });

    $scope.setPinnedApps = function() {
      if (!$scope.frames) {
        return;
      }
      var totalFrames = $scope.frames.length;
      if (totalFrames > $scope.maxAppsDisplayed) {
        $scope.myPinnedApps = $scope.frames.slice(0, $scope.maxAppsDisplayed);
        $scope.myPinnedAppsFirstDisplayedIndex = 0;
        $scope.nextAppsVisible = true;
        $scope.previousAppsVisible = false;
      } else {
        $scope.myPinnedApps = $scope.frames;
        $scope.nextAppsVisible = false;
        $scope.previousAppsVisible = false;
      }
    };

    $scope.updateApps = function() {
      dashboardApi.getDashboards().then(function(dashboards) {
        for (var i=0; i < dashboards.length; i++) {
          if (dashboards[i].id === dashboardChangeMonitor.dashboardId) {
            $scope.frames = dashboards[i].frames;
            dashboardApi.mergeApplicationData($scope.frames, $scope.apps);
            $scope.setPinnedApps();
            $scope.layout = dashboardChangeMonitor.layout;
          }
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    };

    $scope.$on('dashboard-change', function() {
      $scope.updateApps();
    });
    // register to receive notifications if dashboard changes
    dashboardChangeMonitor.run();

    $scope.$on('dashboardChange', function(event, dashboardChange) {
      if($scope.currentDashboardId !== dashboardChange.dashboardId){
        $scope.currentDashboardId = dashboardChange.dashboardId;
      }
      $scope.updateApps();

    });

     $scope.maximizeFrame = function(e) {
      dashboardApi.toggleFrameKey(e.id, 'isMinimized').then(function() {
        $rootScope.$broadcast('dashboard-change');
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
     };

    marketplaceApi.getAllApps().then(function(apps) {
      $scope.myApps = apps;
    }).catch(function(error) {
      console.log('should not have happened: ' + error);
    });

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
      var appboardHideVal = false;
      if ((!$scope.appboardhide) || ($scope.appboardhide = false)) {
        appboardHideVal = true;
      }
      $scope.appboardhide = appboardHideVal;
      userSettingsApi.updateUserSettingByKey('isAppboardHidden', appboardHideVal).then(function(resp) {
        if (resp) {
          $rootScope.$broadcast('userSettings-change');
        } else {
          console.log('ERROR failed to update isAppboardHidden in user settings');
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    };

    $scope.previousApps = function() {
      var start = $scope.myPinnedAppsFirstDisplayedIndex - $scope.maxAppsDisplayed;
      var end = start + $scope.maxAppsDisplayed;
      $scope.myPinnedApps = $scope.frames.slice(start, end);
      $scope.myPinnedAppsFirstDisplayedIndex = start;
      if (start > 0) {
        $scope.previousAppsVisible = true;
      } else {
        $scope.previousAppsVisible = false;
      }
      $scope.nextAppsVisible = true;
    };

    $scope.nextApps = function() {
      var start = $scope.myPinnedAppsFirstDisplayedIndex + $scope.maxAppsDisplayed;
      var end = start + $scope.maxAppsDisplayed;
      $scope.myPinnedApps = $scope.frames.slice(start, end);
      $scope.myPinnedAppsFirstDisplayedIndex = start;
      if ($scope.frames.length > end) {
        $scope.nextAppsVisible = true;
      } else {
        $scope.nextAppsVisible = false;
      }
      $scope.previousAppsVisible = true;
    };

  });


angular.module( 'ozpWebtopApp.appToolbar')
    .directive('appToolbar',function(){
    return {
        restrict: 'E',
        templateUrl: 'appToolbar/appToolbar.tpl.html'
    };
});
