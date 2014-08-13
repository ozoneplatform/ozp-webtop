'use strict';

angular.module('ozpWebtopApp.dashboardView')
  .controller('DesktopController', function ($scope, $rootScope, $location, dashboardApi, marketplaceApi) {

    $scope.dashboards = dashboardApi.getAllDashboards().dashboards;
    $scope.frames = $scope.dashboards[0].apps;  // to make tests happy

    $scope.$watch(function() {
      return $location.path();
    }, function() {
      // TODO: use a regex or something less hacky
      var dashboardIndex = $location.path().slice(-1);
      for (var i=0; i < $scope.dashboards.length; i++) {
      if ($scope.dashboards[i].index.toString() === dashboardIndex) {
        $scope.currentDashboard = $scope.dashboards[i];
        $scope.icons = $scope.currentDashboard.desktopIcons;
        $scope.currentDashboardIndex = $scope.currentDashboard.index;
        console.log('loading dashboard ' + dashboardIndex);
        $scope.apps = $scope.currentDashboard.apps;
        console.log('reloadng GridCtrl for dashboard ' + $scope.currentDashboard);

        // get app data
        // TODO: There should be a method in Marketplace to get only my apps
        var allApps = marketplaceApi.getAllApps();
        for (i=0; i < allApps.length; i++) {
          // check if this app is on our dashboard
          for (var j=0; j < $scope.apps.length; j++) {
            if ($scope.apps[j].uuid === allApps[i].uuid) {
              // if it is, then get all relevant info
              $scope.apps[j].icon = allApps[i].icon;
              $scope.apps[j].url = allApps[i].url;
              $scope.apps[j].name = allApps[i].name;
              $scope.apps[j].shortDescription = allApps[i].shortDescription;
            }
          }
        }
        $scope.max = {};
        $scope.frames = $scope.apps;


        for (var k = 0, len = $scope.frames.length; k < len; k++) {
          $scope.frames[k].desktopLayout.zIndex = k;
        }
        $scope.max.zIndex = $scope.frames.length - 1;
      }
    }
    $rootScope.activeFrames = $scope.currentDashboard.apps;
    });

    $scope.isFrameMinimized = function(e) {
      // the isMinimized value is set in the chromecontroller.js controller, $scope.minimizeFrame is toggled when the minus button is clicked in the frames
      for (var i = 0; i < $rootScope.activeFrames.length; i++){
        if($rootScope.activeFrames[i].uuid === e.uuid){
          console.log($rootScope.activeFrames[i].isMinimized);
          return $rootScope.activeFrames[i].isMinimized;
        }
      }
    };

    $scope.frames.sort(function(a, b) {
      return ((a.desktopLayout.zIndex < b.desktopLayout.zIndex) ? -1 :
        ((a.desktopLayout.zIndex > b.desktopLayout.zIndex) ? 1 : 0));
    });
  });