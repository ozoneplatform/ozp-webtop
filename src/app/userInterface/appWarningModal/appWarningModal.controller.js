'use strict';

angular.module('ozpWebtop.appWarningModal', ['ui.bootstrap',
'ozpWebtop.models','ozpWebtop.services.restInterface']);
/**
* Controller for app warning modal
*
* @param $scope
* @param $modalInstance
* @param $restInterface
* @constructor
*/
angular.module('ozpWebtop.appWarningModal').controller(
'appWarningModal', function($scope, $window, $modalInstance, dashboardMaxWidgets) {


	$scope.title = 'You\'ve reached your dashboard app limit';
	$scope.content = 'Only ' + dashboardMaxWidgets + ' apps can be loaded on each dashboard. Create a new dashboard to use more apps.';
	/**
	* Handler invoked when dialog is closed via Ok button
	*
	* TODO @method for ok button
	*/
	$scope.ok = function () {
	  $modalInstance.close();
	};


});
