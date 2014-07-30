'use strict';

angular.module( 'ozpwebtop.dashboardToolbar', [
])
.controller('dashboardToolbarCtrl', ['$scope',
  function($scope) {

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                      Data from services
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // TODO: all of this data will need to come from a real service, obviously
    $scope.dashboards = [
      {'name': 'dashboard one',
      'index': 0,
      'uuid': 'asdfdsa3'},
      {'name': 'dashboard two',
      'index': 1,
      'uuid': 'fds43'},
      {'name': 'dashboard three',
      'index': 2,
      'uuid': 'gher43'}
    ];

    $scope.clock = '15:30 GMT';

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
      $scope.currentDashboardName = board.name;
    };

    $scope.currentDashboardName = 'Dashboards';

    $scope.useGridLayout = function() {
      $scope.layout = 'grid';
    };

    $scope.useDesktopLayout = function() {
      $scope.layout = 'desktop';
    };

    $scope.layout = 'grid';
  }
]);