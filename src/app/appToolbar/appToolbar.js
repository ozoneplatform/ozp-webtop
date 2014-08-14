'use strict';

angular.module( 'ozpWebtopApp.appToolbar')
.controller('appToolbarCtrl', function($scope, $rootScope, $location, $state, marketplaceApi, dashboardApi) {

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                      Data from services
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  $rootScope.$watch('activeFrames', function () {

    if ($rootScope.activeFrames) {
      $scope.myPinnedApps = $rootScope.activeFrames;
    }
  });

   $scope.$watch(function() {
      return $location.path();
    }, function() {
     // TODO: use a regex or something less hacky
     $scope.currentDashboardIndex = $location.path().slice(-1);
   });

   $scope.maximizeFrame = function(e) {
     if(e.isMinimized === true){
       e.isMinimized = false;
     }
   };

  $scope.myApps = marketplaceApi.getAllApps();

  $scope.appClicked = function(app) {
    // check if the app is already on the current dashboard
    var isOnDashboard = dashboardApi.isAppOnDashboard($scope.currentDashboardIndex, app.uuid);
    if (isOnDashboard) {
      alert('This application is already on your dashboard');
    } else {
      // add this app to the dashboard
      // TODO: use message broadcast to get grid max rows and grid max cols
      dashboardApi.addApplication($scope.currentDashboardIndex, app.uuid, 10);
      // reload this dashboard
      $state.go($state.$current, null, { reload: true });

    }

  };

  });
