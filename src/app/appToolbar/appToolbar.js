'use strict';

angular.module( 'ozpWebtopApp.appToolbar', [
])
.controller('appToolbarCtrl', ['$scope', '$rootScope',
  function($scope, $rootScope) {

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                      Data from services
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // TODO: all of this data will need to come from a real service, obviously
    // $scope.$on('gridVals', function(event,data){
    //   console.log(event);
    //   console.log(data);
    // });
    $rootScope.$watch('activeFrames', function(){
      // for (var i in $rootScope.gridVals.length){
      //   console.log($rootScope.gridVals[i]);
      // }
      if($rootScope.activeFrames){
        $scope.myPinnedApps = $rootScope.activeFrames;
      }
    });

    $scope.maximizeFrame = function(e) {
      if(e.isMinimized === true){
        e.isMinimized = false;
      }
    };
    //$scope.myPinnedApps = $rootScope.gridVals;
    $scope.myApps = [
      {'name': 'Music',
        'icon': '/path/to/icon'},
      {'name': 'Graph',
        'icon': '/path/to/icon'},
      {'name': 'Thermometer',
        'icon': '/path/to/icon'}
    ];
    // console.log($scope.$parent.$parent);
    //console.log($rootScope.gridVals);
    // $scope.myPinnedApps = [
    //   {
    //     'name': 'Music',
    //     'toolbarIndex': 0
    //   },
    //   {
    //     'name': 'Graph',
    //     'toolbarIndex': 1
    //   },
    //   {
    //     'name': 'Thermometer',
    //     'toolbarIndex': 2
    //   }
    // ];
  }

]);