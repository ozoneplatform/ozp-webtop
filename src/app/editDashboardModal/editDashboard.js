'use strict';

/**
 * Edit Dashboard modal dialog
 *
 * @module ozpWebtop.editDashboardModal
 *
 * @requires ui.bootstrap
 *
 */

angular.module('ozpWebtop.editDashboardModal', ['ui.bootstrap',
  'ozpWebtop.models']);

/**
 * Controller for Edit Dashboard modal
 *
 * @param $scope
 * @param $modalInstance
 * @constructor
 */
angular.module('ozpWebtop.editDashboardModal').controller(
  'EditDashboardModalInstanceCtrl', function($scope, $modalInstance,
                                             models, dashboard) {

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                            $scope properties
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $scope.dashboard = angular.copy(dashboard);
    $scope.originalLayout = dashboard.layout;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                           initialization
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                          methods
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $scope.layoutChanged = function() {
      return $scope.dashboard.layout !== $scope.originalLayout;
    };

    /**
     * Handler invoked when dialog is closed via Ok button
     *
     *
     * @method openApps
     */
    $scope.ok = function () {
      // update the dashboard layout and name
      models.saveDashboard($scope.board);
      var response = {
        'layout': $scope.dashboard.layout,
        'stickyIndex': $scope.dashboard.stickyIndex,
        'id': $scope.dashboard.id,
        'name': $scope.dashboard.name
      };
      $modalInstance.close(response);
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
