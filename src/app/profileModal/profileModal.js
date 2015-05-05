'use strict';
/**
*
* @module ozpWebtop.profileModal
*
* @requires ui.bootstrap
*
*/
angular.module('ozpWebtop.profileModal', ['ui.bootstrap',
'ozpWebtop.models','ozpWebtop.services.restInterface']);
/**
* Controller for profile modal
*
* @param $scope
* @param $modalInstance
* @param $restInterface
* @constructor
*/
angular.module('ozpWebtop.profileModal').controller(
'profileModalInstanceCtrl', function($scope, $modalInstance, restInterface) {



	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// methods
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	/**
	* Gets user profile data 
	*
	*/
	restInterface.getProfile().then(function(data){
		var getProfile = data;

		$scope.profileName = getProfile.displayName;
		$scope.profileUsername = getProfile.username;
		$scope.profileEmail = getProfile.email;
	});


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
