'use strict';

angular.module('ozpWebtop.profileModal', ['ui.bootstrap',
'ozpWebtop.models','ozpWebtop.services.ozpInterface']);
/**
* Controller for profile modal
*
* @param $scope
* @param $modalInstance
* @param ozpInterface interface for backend communication
* @constructor
*/
angular.module('ozpWebtop.profileModal').controller(
'profileModalInstanceCtrl', function($scope, $window, $modalInstance, ozpInterface) {

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                           initialization
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	$scope.centerUrl = $window.OzoneConfig.CENTER_URL;


	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// methods
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	/**
	* Gets user profile data
	*
	*/

	ozpInterface.getProfile().then(function(data){
		var getProfile = data;

		$scope.profileName = getProfile.displayName;
		$scope.profileUsername = getProfile.user.username;
		$scope.profileEmail = getProfile.user.email;
	});

	/**
	* Gets user listing data
	*/
	ozpInterface.getUserListings().then(function(data){
		$scope.getUserListings = data;
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
