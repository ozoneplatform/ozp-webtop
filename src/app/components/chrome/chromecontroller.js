'use strict';

/**
 * ChromeController aids the ozpChrome directive in knowing its location (grid or desktop).
 */
angular.module('ozpWebtopApp.components')
.controller('ChromeController', function ($scope, $rootScope, dashboardApi, dashboardChangeMonitor) {

  // register to receive notifications if dashboard changes
  dashboardChangeMonitor.run();

  $scope.$on('dashboardChange', function(event, dashboardChange) {
    // Determine if chrome is being used in the grid view
    if (dashboardChange.layout === 'grid') {
      $scope.isGrid = true;
    } else {
      $scope.isGrid = false;
    }
  });

  $scope.isDisabled = function(e){
    console.log(e);
  	// Loop through the frames that are on rootScope, 
  	//   if the id of the frameId of the grid object matches the frameId of the object on rootScope, 
  	//    that oblect is removed from rootScope and changes are reflected in other things that are 
  	//    watching activeFrames on rootScope
    // for (var i = 0; i < $rootScope.activeFrames.length; i++){
    //   if($rootScope.activeFrames[i].id.indexOf(e) !== -1){
		  //   $rootScope.activeFrames.splice(i, 1);
    //   }
    // }
    // dashboardApi.removeFrame($scope.frame.id);
    dashboardApi.removeFrame(e.id);
    $rootScope.$broadcast('dashboard-change');
  };

  $scope.minimizeFrame = function(e){
    dashboardApi.updateFrameKey(e.id, 'isMinimized', 'toggle');
    $rootScope.$broadcast('dashboard-change');
    // for (var i = 0; i < $rootScope.activeFrames.length; i++){
    //   if($rootScope.activeFrames[i].id === e.id){
    //     // if the frame's isMinimized value is false or doesn't exist yet, set it to true (because the minus button was clicked)
    //     if(($rootScope.activeFrames[i].isMinimized === false) || (!$rootScope.activeFrames[i].isMinimized)){
    //       $rootScope.activeFrames[i].isMinimized = true;
    //     }
    //     else{
    //       $rootScope.activeFrames[i].isMinimized = false;
    //     }
    //   }
    // }
  };

  $scope.maximizeFrame = function(e){
    dashboardApi.updateFrameKey(e.id, 'isMaximized', 'toggle');
    $rootScope.$broadcast('dashboard-change');
    // for (var i = 0; i < $rootScope.activeFrames.length; i++){
    //   if(e.id === $rootScope.activeFrames[i].uuid){
    //     if(($rootScope.activeFrames[i].isMaximized === false) || (!$rootScope.activeFrames[i].isMaximized)){
    //       $rootScope.activeFrames[i].isMaximized = true;
    //     }
    //     else{
    //       $rootScope.activeFrames[i].isMaximized = false;
    //     }
    //   }
    //   else{
    // //reducing other frames to non-maximized size
    //     $rootScope.activeFrames[i].isMaximized = false;
    //   }
    // }
  };

});
