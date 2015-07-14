'use strict';

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
'profileModalInstanceCtrl', function($scope, $window, $modalInstance, restInterface) {


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
	restInterface.getProfile().then(function(data){
		var getProfile = data;

		$scope.profileName = getProfile.displayName;
		$scope.profileUsername = getProfile.username;
		$scope.profileEmail = getProfile.email;
	});

/**
	* Gets user listing data
	*
	*/
	restInterface.getUserListings().then(function(data){
		  $scope.getUserListings = data._embedded.item;

		 $scope.listingImg = data.imageMediumUrl;
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
