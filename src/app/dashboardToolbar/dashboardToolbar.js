'use strict';

var dashboardApp = angular.module( 'ozpWebtopApp.dashboardToolbar')
.controller('dashboardToolbarCtrl',
  function($scope, $rootScope, dashboardApi, dashboardChangeMonitor, userSettingsApi) {


    dashboardApi.getDashboards().then(function(dashboards) {
      $scope.dashboards = dashboards;
      //default dashboardToolbar is not hidden
      $scope.dashboardhide = false;
      // default board is 0
      if (dashboards) {
        $scope.currentDashboard = $scope.dashboards[0];
      } else {
        console.log('WARNING: No dashboards found');
      }
      // default layout is grid
      $scope.layout = 'grid';
      dashboardApi.getDashboardData().then(function(dashboardData) {
        $scope.user = dashboardData.user;
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    }).catch(function(error) {
      console.log('should not have happened: ' + error);
    });


    // register to receive notifications if dashboard layout changes
    dashboardChangeMonitor.run();

    $scope.$on('dashboardChange', function(event, dashboardChange) {
      $scope.layout = dashboardChange.layout;
      $scope.dashboardId = dashboardChange.dashboardId;

      //only change local scopes user if the dashboard api user changes
      dashboardApi.getDashboardData().then(function(dashboardData) {
        if ($scope.user !== dashboardData.user) {
          $scope.user = dashboardData.user;
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });

      dashboardApi.getDashboardById($scope.dashboardId).then(function(dashboard) {
        $scope.currentDashboard.name = dashboard.name;
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });

    });

    $scope.$on('UserSettingsChanged', function() {
      dashboardApi.getDashboards().then(function(dashboards) {
        $scope.dashboards = dashboards;
        dashboardApi.getDashboardById($scope.dashboardId).then(function(dashboard) {
          if (dashboard) {
            $scope.currentDashboard.name = dashboard.name;
          } else {
            console.log('WARNING: Dashboard ' + $scope.dashboardId + ' no longer exists');
          }
        }).catch(function(error) {
          console.log('should not have happened: ' + error);
        });
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    });

    $scope.messages = {
      'unread': 2,
      'messages': [
        {
          'subject': 'Photo Editing Tools',
          'message': 'Daryl just shared a dashboard with you! ' +
          'Click to add it to your webtop.'
        },
        {
          'subject': 'Math Tools',
          'message': 'Kay just shared a dashboard with you! It has some great' +
            ' things!'
        }
      ]
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                        Dashboard dropdown
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $scope.setCurrentDashboard = function(board) {
      $scope.currentDashboard = board;
    };

    $scope.useGridLayout = function() {
      $scope.layout = 'grid';
    };

    $scope.useDesktopLayout = function() {
      $scope.layout = 'desktop';
    };

    $scope.launchSettingsModal = function() {
      $rootScope.$broadcast('launchSettingsModal', {
        launch: 'true'
      });
    };
    $scope.dashboardhider = function() {
      if ((!$scope.dashboardhide) || ($scope.dashboardhide = false)){
        $scope.dashboardhide = true;
        userSettingsApi.updateUserSettingByKey('isDashboardHidden', true);
      }
      else {
        $scope.dashboardhide = false;
        userSettingsApi.updateUserSettingByKey('isDashboardHidden', false);
      }
      $rootScope.$broadcast('userSettings-change');
    };
  }
);


dashboardApp.directive('dashboardToolbar',function(){
   return {
       restrict: 'E',
       templateUrl: 'dashboardToolbar/dashboardToolbar.tpl.html'
   };
});
