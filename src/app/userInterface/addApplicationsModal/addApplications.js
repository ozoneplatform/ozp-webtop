'use strict';

/**
 * Add Applications modal dialog
 *
 * @module ozpWebtop.addApplicationsModal
 *
 * @requires ui.bootstrap
 *
 */

angular.module('ozpWebtop.addApplicationsModal', ['ui.bootstrap']);

/**
 * Controller for Add Applications modal
 *
 * @param $scope
 * @param $modalInstance
 * @param apps user's applications
 * @constructor
 */
angular.module('ozpWebtop.addApplicationsModal').controller(
  'AddApplicationsModalInstanceCtrl', function($scope, $modalInstance, $log, $window, apps) {

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                            $scope properties
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * Return a list of apps sorted in alphabetical order
     *
     * @method sortApps
     * @param apps Array of applications to sort
     * @returns {[]}
     */
    function sortApps(apps) {
      return apps.sort(function(a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }

    /**
     * @property applications The user's applications, sorted alphabetically
     * @type {[]}
     */
    $scope.applications = sortApps(apps);

    /**
     * @property selectedApps The applications selected to add
     * @type {Array}
     */
    $scope.selectedApps = [];

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                           initialization
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    $scope.centerUrl = $window.OzoneConfig.CENTER_URL;



    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                          methods
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /**
     * Handler invoked when an application is clicked
     *
     * @method appSelected
     * @param app application selected
     */
    $scope.appSelected = function(app) {
      updateSelectedApps(app);
    };

    /**
     * Returns true if one or more apps are selected
     *
     * @method areAnyAppsSelected
     * @returns {boolean}
     */
    $scope.areAnyAppsSelected = function() {
      return $scope.selectedApps.length !== 0;
    };

    /**
     * Adds or removes an application from the list of apps to open
     *
     * If the application was in the list previoulsy, it is removed. Otherwise,
     * it is added
     *
     * @method updateSelectedApps
     * @param app application to add or remove from the list
     */
    function updateSelectedApps(app) {
      for (var i=0; i < $scope.selectedApps.length; i++) {
        if ($scope.selectedApps[i].id === app.id) {
          // the app is already in the list, so now it will be removed
          $scope.selectedApps.splice(i, 1);
          return;
        }
      }
      // the app was not found in the list, so add it
      $scope.selectedApps.push(app);
    }

      /**
       * Returns true if the given app is in the list to be added, false
       * otherwise
       *
       * @method isAppSelected
       * @param app the application to check
       * @returns {boolean}
       */
    $scope.isAppSelected = function(app) {
      for (var i=0; i < $scope.selectedApps.length; i++) {
        if ($scope.selectedApps[i].id === app.id) {
          return true;
        }
      }
      return false;
    };

    /**
     * Handler invoked when dialog is closed via Open button
     *
     *
     * @method openApps
     */
    $scope.openApps = function () {
      var response = {'useNewDashboard': false,
        'appsToOpen': $scope.selectedApps};
      $modalInstance.close(response);
    };

     /**
     * Handler invoked when dialog is closed via Open apps in new dashboard
      * button
     *
     *
     * @method openAppsInNewDashboard
     */
    $scope.openAppsInNewDashboard = function() {
      var response = {'useNewDashboard': true,
        'appsToOpen': $scope.selectedApps};
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

