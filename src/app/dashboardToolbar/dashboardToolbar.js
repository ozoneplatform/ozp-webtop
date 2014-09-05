'use strict';

angular.module( 'ozpWebtopApp.dashboardToolbar')
.controller('dashboardToolbarCtrl',
  function($scope, $rootScope, dashboardApi, dashboardChangeMonitor) {

    dashboardApi.getDashboards().then(function(dashboards) {
      $scope.dashboards = dashboards;
      // default board is 0
      if (dashboards) {
        $scope.currentDashboard = $scope.dashboards[0];
      } else {
        console.log('WARNING: No dashboards found');
      }
      // default layout is grid
      $scope.layout = 'grid';
    }).catch(function(error) {
      console.log('should not have happened: ' + error);
    });

    // register to receive notifications if dashboard layout changes
    dashboardChangeMonitor.run();

    $scope.$on('dashboardChange', function(event, dashboardChange) {
      $scope.layout = dashboardChange.layout;
      $scope.dashboardId = dashboardChange.dashboardId;
      dashboardApi.getDashboardById($scope.dashboardId).then(function(dashboard) {
        if (dashboard) {
          $scope.currentDashboard = dashboard;
        } else {
          console.log('Got dashboard changed message for non-existent dashboard');
        }

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

    $scope.user = {
      'name': 'J Smith',
      'username': 'J Smith'
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
  }
);
