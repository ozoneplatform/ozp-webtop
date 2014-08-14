'use strict';

/**
 * ChromeController aids the ozpChrome directive in knowing its location (grid or desktop).
 */
angular.module('ozpWebtopApp.components')
.controller('ChromeController', function ($scope, $location, $rootScope) {
  // Determine if chrome is being used in the grid view
  $scope.isGrid = ($location.path() === '/grid');
  $scope.isDisabled = function(e){
  	// Loop through the frames that are on rootScope, 
  	//   if the id of the frameId of the grid object matches the frameId of the object on rootScope, 
  	//    that oblect is removed from rootScope and changes are reflected in other things that are 
  	//    watching activeFrames on rootScope
    for (var i = 0; i < $rootScope.activeFrames.length; i++){
      if($rootScope.activeFrames[i].uuid.indexOf(e) !== -1){
		    $rootScope.activeFrames.splice(i, 1);
      }
    }
  };

  $scope.minimizeFrame = function(e){
    for (var i = 0; i < $rootScope.activeFrames.length; i++){
      if($rootScope.activeFrames[i].uuid === e.uuid){
        // if the frame's isMinimized value is false or doesn't exist yet, set it to true (because the minus button was clicked)
        if(($rootScope.activeFrames[i].isMinimized === false) || (!$rootScope.activeFrames[i].isMinimized)){
          $rootScope.activeFrames[i].isMinimized = true;
        }
        else{
          $rootScope.activeFrames[i].isMinimized = false;
        }
      }
    }
  };

  $scope.maximizeFrame = function(){
    console.log('someone wants to maximize!');
  };

});
