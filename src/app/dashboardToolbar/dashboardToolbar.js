'use strict';

angular.module( 'ozpWebtopApp.dashboardToolbar')
.controller('dashboardToolbarCtrl',
  function($scope, $rootScope, $location, dashboardApi) {

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                      Data from services
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $scope.dashboards = dashboardApi.getAllDashboards().dashboards;
    // default board is 0
    $scope.currentDashboard = $scope.dashboards[0];
    // default layout is grid
    $scope.layout = 'grid';

    $scope.$watch(function() {
      return $location.path();
    }, function() {
      console.log('url changed: ' + $location.path());
      var n = $location.path().indexOf('grid');
      if (n !== -1) {
        $scope.layout = 'grid';
      } else {
        $scope.layout = 'desktop';
      }

    });

    $rootScope.theme = 'light';

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

    $scope.themeToggle = function() {
      if($rootScope.theme === 'light'){
        $rootScope.theme = 'dark';
      }
      else{
        $rootScope.theme = 'light';
      }
    };
  }
);
