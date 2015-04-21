'use strict';
/**
*
* @module ozpWebtop.profileModal
*
* @requires ui.bootstrap
*
*/
angular.module('ozpWebtop.profileModal', ['ui.bootstrap',
'ozpWebtop.models']);
/**
* Controller for profile modal
*
* @param $scope
* @param $modalInstance
* @constructor
*/
angular.module('ozpWebtop.profileModal').controller(
'profileModalInstanceCtrl', function($scope, $modalInstance) {

	// TODO: get data from restInterface
	$scope.profileName = 'John Smith';
	$scope.profileUsername = 'johnSmith1';
	$scope.profileEmail = 'johnSmith@nowhere.com';

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// methods
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
