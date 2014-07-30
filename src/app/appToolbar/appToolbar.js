'use strict';

angular.module( 'ozpwebtop.appToolbar', [
])
.controller('appToolbarCtrl', ['$scope',
  function($scope) {

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                      Data from services
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // TODO: all of this data will need to come from a real service, obviously
    $scope.myApps = [
      {'name': 'Music',
        'icon': '/path/to/icon'},
      {'name': 'Graph',
        'icon': '/path/to/icon'},
      {'name': 'Thermometer',
        'icon': '/path/to/icon'}
    ];

    $scope.myPinnedApps = [
      {
        'name': 'Music',
        'toolbarIndex': 0
      },
      {
        'name': 'Graph',
        'toolbarIndex': 1
      },
      {
        'name': 'Thermometer',
        'toolbarIndex': 2
      }
    ];
  }

]);