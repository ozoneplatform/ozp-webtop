'use strict';
/**
*
* @module ozpWebtop.helpModal
*
* @requires ui.bootstrap
*
*/
angular.module('ozpWebtop.helpModal', ['ui.bootstrap',
'ozpWebtop.models']);


/**
* Controller for help modal
*
* @param $scope
* @param $window
* @param $modalInstance
* @constructor
*/
angular.module('ozpWebtop.helpModal').controller(
'helpModalInstanceCtrl', function($scope, $modalInstance, $window, $sce, restInterface) {

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                           initialization
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	var UserRole = {
		USER: 0,
		ORG_STEWARD: 1,
		ADMIN: 2,
		APPS_MALL_STEWARD: 2,
	};

	restInterface.getProfile().then(function(userObject){
		$scope.APPLICATION_NAME = $window.OzoneConfig.APPLICATION_NAME;
		$scope.HELPDESK_ADDRESS = $window.OzoneConfig.HELPDESK_ADDRESS;
		$scope.HELP_URL = $sce.trustAsResourceUrl($window.OzoneConfig.HELP_URL + UserRole[userObject.highestRole]);
	});

	// console.log($scope.HELP_URL);


	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	//                               methods
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	/**
	* Handler invoked when dialog is closed via Ok button
	*
	* TODO @method for ok button
	*/
	$scope.ok = function () {
	  $modalInstance.close();
	};

	/**
	* Handler invoked when modal is dismissed via the cancel button
	*
	* @method cancel
	*/
	$scope.cancel = function () {
	  $modalInstance.dismiss('cancel');
	};

});
