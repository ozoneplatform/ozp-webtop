'use strict';

angular.module('ozpWebtopApp.dashboardView')
  .controller('DesktopController', function ($scope, $rootScope, $location, dashboardApi, marketplaceApi, dashboardChangeMonitor) {

    $scope.dashboards = dashboardApi.getAllDashboards().dashboards;
    $scope.frames = $scope.dashboards[0].apps;  // to make tests happy

    dashboardChangeMonitor.run();
    $scope.$on('dashboardChange', function(/*event, data*/) {
      // console.log('desktop.js received dashboard change msg: ' + JSON.stringify(data));
    });

    // TODO: Originally tried sending broadcast events from dashboardChangeMonitor,
    // but that did not work out - led to lots of problems such as the desktop
    // and grid controllers not being loaded/unloaded properly. So instead, we'll
    // just reach into the internal state of the dashboardChangeMonitor to get
    // this info and use $watch on $location.path to trigger the update. To
    // see what happens, just uncomment the console.logs in $on.(...) in
    // grid.js and desktop.js
    $scope.$watch(function() {
      return $location.path();
    }, function() {
      updateDashboard();
    });

    function updateDashboard() {
      var dashboardIndex = dashboardChangeMonitor.dashboardIndex;
      for (var i=0; i < $scope.dashboards.length; i++) {
      if ($scope.dashboards[i].index.toString() === dashboardIndex) {
        $scope.currentDashboard = $scope.dashboards[i];
        $scope.icons = $scope.currentDashboard.desktopIcons;
        $scope.currentDashboardIndex = $scope.currentDashboard.index;
        $scope.apps = $scope.currentDashboard.apps;

        // TODO: There should be a method in Marketplace to get only my apps
        var allApps = marketplaceApi.getAllApps();
        // Merge application data (app name, icons, descriptions, url, etc)
        // with dashboard app data
        dashboardApi.mergeApplicationData($scope.apps, allApps);

        $scope.max = {};
        $scope.frames = $scope.apps;

        sortFrames();

        for (var k = 0, len = $scope.frames.length; k < len; k++) {
          $scope.frames[k].desktopLayout.zIndex = k;
        }
        $scope.max.zIndex = $scope.frames.length - 1;
      }
    }
    $rootScope.activeFrames = $scope.currentDashboard.apps;
    }

    $scope.isFrameMinimized = function(e) {
      // the isMinimized value is set in the chromecontroller.js controller, $scope.minimizeFrame is toggled when the minus button is clicked in the frames
      for (var i = 0; i < $rootScope.activeFrames.length; i++){
        if($rootScope.activeFrames[i].uuid === e.uuid){
          return $rootScope.activeFrames[i].isMinimized;
        }
      }
    };

    function sortFrames() {
      $scope.frames.sort(function(a, b) {
        return ((a.desktopLayout.zIndex < b.desktopLayout.zIndex) ? -1 :
          ((a.desktopLayout.zIndex > b.desktopLayout.zIndex) ? 1 : 0));
      });
    }

  });