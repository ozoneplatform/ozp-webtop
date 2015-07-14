'use strict';
/**
*
* @module ozpWebtop.deleteDashboardModal
*
* @requires ui.bootstrap
*
*/
angular.module('ozpWebtop.deleteDashboardModal', ['ui.bootstrap',
'ozpWebtop.models']);


/**
* Controller for delete dashboard modal
*
* @param $scope
* @param $modalInstance
* @constructor
*/
angular.module('ozpWebtop.deleteDashboardModal').controller(
'deleteDashboardModalCtrl', function($scope, $modalInstance) {

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// methods
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	if ($scope.dashboards.length === 1) {
		$scope.titletext = 'You may not delete ';
		$scope.message = 'You must have at least one dashboard in Webtop.';
		$scope.disableDeleteMessage = true;
	}
	if($scope.dashboards.length > 1) {
		$scope.titletext = 'Are you sure you want to delete the dashboard ';
		$scope.message = 'This action cannot be undone. Any apps on this dashboard'+
										 ' will still be accessible from your Bookmarks.';
		$scope.disableDeleteMessage = false;
	}

	/**
	* Handler invoked when dialog is closed via deleteDashboard button
	*
	* TODO @method for deleteDashboard button
	*/
	$scope.deleteDashboard = function () {
		//responde delete
	  $modalInstance.close('delete');
	};

	/**
	* Handler invoked when modal is dismissed via the cancel button
	*
	* @method cancel
	*/
	$scope.cancel = function () {
		//dont send a response/undefined
		$modalInstance.close();
	};

});
