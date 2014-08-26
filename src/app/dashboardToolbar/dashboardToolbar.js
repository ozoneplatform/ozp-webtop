'use strict';

angular.module( 'ozpWebtopApp.dashboardToolbar')
.controller('dashboardToolbarCtrl',
  function($scope, $rootScope, dashboardApi, dashboardChangeMonitor) {

    $scope.dashboards = dashboardApi.getDashboards();
    // default board is 0
    $scope.currentDashboard = $scope.dashboards[0];
    // default layout is grid
    $scope.layout = 'grid';

    // register to receive notifications if dashboard layout changes
    dashboardChangeMonitor.run();

    $scope.$on('dashboardChange', function(event, dashboardChange) {
      $scope.layout = dashboardChange.layout;
      $scope.dashboardId = dashboardChange.dashboardId;
    });

    $scope.$on('UserSettingsChanged', function() {
      $scope.dashboards = dashboardApi.getDashboards();
      $scope.currentDashboard.name =
        dashboardApi.getDashboardById($scope.dashboardId).name;
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
      'name': 'Joe Bloe',
      'username': 'jbloe'
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
      console.log('broadcasting launchSettingsModal event...');
      $rootScope.$broadcast('launchSettingsModal', {
        launch: 'true'
      });
    };
  }
);
