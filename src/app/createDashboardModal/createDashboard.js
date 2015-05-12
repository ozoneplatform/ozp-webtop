'use strict';

/**
 * Create Dashboard modal dialog
 *
 * @module ozpWebtop.createDashboardModal
 *
 * @requires ui.bootstrap
 *
 */

angular.module('ozpWebtop.createDashboardModal', ['ui.bootstrap',
  'ozpWebtop.models']);

/**
 * Controller for Create Dashboard modal
 *
 * @param $scope
 * @param $modalInstance
 * @constructor
 */
angular.module('ozpWebtop.createDashboardModal').controller(
  'CreateDashboardModalInstanceCtrl', function($scope, $modalInstance) {

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                            $scope properties
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $scope.newDashboard = {
      name: 'New Dashboard',
      layout: 'grid'
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                          methods
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

     /**
     * Handler invoked when dialog Create Dashboard is selected
     *
     *
     * @method createDashboard
     */
    $scope.createDashboard = function() {
        var response = {
          'layout': $scope.newDashboard.layout,
          'name': $scope.newDashboard.name
        };
        $modalInstance.close(response);
      // });
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
