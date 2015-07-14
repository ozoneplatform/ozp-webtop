'use strict';
/**
*
* @module ozpWebtop.settingsModal
*
* @requires ui.bootstrap
*
*/
angular.module('ozpWebtop.settingsModal', ['ui.bootstrap',
'ozpWebtop.models']);
/**
* Controller for settings modal
*
* @param $scope
* @param $modalInstance
* @constructor
*/
angular.module('ozpWebtop.settingsModal')
	.controller('settingsModalInstanceCtrl', function($scope, $modalInstance) {


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
