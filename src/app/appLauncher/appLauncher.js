'use strict';

angular.module( 'ozpWebtopApp.appLauncher')
  .controller('AppLauncherCtrl', function($scope, $rootScope, $state, $stateParams,
                                       marketplaceApi, dashboardApi) {

    $scope.appId = $stateParams.appId;
    marketplaceApi.getAllApps().then(function(apps) {
      var validApp = false;
      for (var i=0; i < apps.length; i++) {
        if (apps[i].id === $scope.appId) {
          validApp = true;
        }
      }
      if (!validApp) {
        console.log('ERROR: App with id ' + $scope.appId + ' was not found');
        return;
      }

      // is this app already on our current dashboard?
      dashboardApi.getCurrentDashboard().then(function(dashboard) {
        dashboardApi.isAppOnDashboard(dashboard.id, $scope.appId).then(function(resp) {
          if (resp) {
            console.log('this app is already on our current board - redirecting');
            $state.go('grid', {'dashboardId': dashboard.id});
          } else {
            console.log('this app is not on our current board - will add');
            dashboardApi.createFrame(dashboard.id, $scope.appId, 10).then(function(resp) {
              if (resp) {
                $state.go('grid', {'dashboardId': dashboard.id});
              } else {
                console.log('ERROR: creating frame on dashboard');
              }
            });
          }
        });
      });
    });

  });
