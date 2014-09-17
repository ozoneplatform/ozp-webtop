'use strict';

angular.module( 'ozpWebtopApp.appToolbar')
  .controller('appToolbarCtrl', function($scope, $rootScope, $state,
                                       marketplaceApi, dashboardApi,
                                       dashboardChangeMonitor, userSettingsApi) {

    $scope.currentDashboardId = dashboardChangeMonitor.dashboardId;

    $scope.appboardhide = false;

    $scope.$on('dashboard-change', function() {
      $scope.frames = dashboardApi.getDashboards()[dashboardChangeMonitor.dashboardId].frames;
      var allApps = marketplaceApi.getAllApps();
      dashboardApi.mergeApplicationData($scope.frames, allApps);
      $scope.myPinnedApps = $scope.frames;
      $scope.layout = dashboardChangeMonitor.layout;
    });
    // register to receive notifications if dashboard changes
    dashboardChangeMonitor.run();

    $scope.$on('dashboardChange', function(event, dashboardChange) {
      if($scope.currentDashboardId !== dashboardChange.dashboardId){
        $scope.currentDashboardId = dashboardChange.dashboardId;
      }

    });

     $scope.maximizeFrame = function(e) {
      dashboardApi.toggleFrameKey(e.id, 'isMinimized');
      $rootScope.$broadcast('dashboard-change');
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
        //$state.go($state.$current, null, { reload: false });
        $rootScope.$broadcast('dashboard-change');
      }
    };
    $scope.appboardhider = function() {
      if ((!$scope.appboardhide) || ($scope.appboardhide = false)){
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
