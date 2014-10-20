'use strict';

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used below.
/**
 * Controller for User Settings modal dialog
 *
 * ngtype: controller
 *
 * @namespace userSettings
 * @class ModalInstanceCtrl
 * @constructor
 * @param $scope Scope used by controller
 * @param $modalInstance Service from ui.bootstrap
 * @param currentDashboardId Id of dashboard to use
 * @param dashboardApi Dashboard API
 * @param userSettingsApi User Settings API
 * @param userPreferencesUpdatedEvent event name
 */
var ModalInstanceCtrl = function ($scope, $modalInstance, currentDashboardId,
                                  dashboardApi, userSettingsApi,
                                  userPreferencesUpdatedEvent) {

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                            $scope properties
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /**
   * @property preferences The user's preferences
   * @type {{}}
   */
  $scope.preferences = {};
  /**
   * @property dashboards The user's dashboards
   * @type {Array}
   */
  $scope.dashboards = [];

  /**
   * @property themes Available themes for the application (e.g light,
   * dark)
   * @type {Array}
   */
  $scope.themes = ['light', 'dark'];

  /**
   * @property validNamePattern Regex for valid dashboard names
   * @type {RegExp}
   */
  $scope.validNamePattern = /^[a-z_]+[a-z0-9_ ]*\w$/i;

  /**
   * @property currentDashboardId User's current dashboard id
   * @type {String}
   */
  $scope.currentDashboardId = currentDashboardId;

  /**
   * @property newDashboardName Name of new dashboard to create. An
   * object to support ng data binding
   * @type {{name: string}}
   */
  $scope.newDashboardName = {
    'name': ''
  };

  /**
   * @property addingNewBoard Flag indicating if a new dashboard is being
   * added
   * @type {boolean}
   */
  $scope.addingNewBoard = false;

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                           initialization
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  userSettingsApi.getUserSettings().then(function(settings) {
    $scope.preferences = settings;
  }).catch(function(error) {
    console.log('should not have happened: ' + error);
  });

  dashboardApi.getDashboards().then(function(dashboards) {
    $scope.dashboards = dashboards;
  }).catch(function(error) {
    console.log('should not have happened: ' + error);
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                          methods
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  /**
   * Makes changes to an existing dashboard
   *
   * Invoked after user 'submits' the modal. Checks to see if this dashboard
   * was flagged for deletion or renamed. If so, the corresponding changes
   * are made
   *
   * @method updateExistingDashboard
   * @param {String} dashboardId Id of dashboard to update
   * @returns {*}
   */
  $scope.updateExistingDashboard = function(dashboardId) {
    return dashboardApi.getDashboardById(dashboardId).then(function(dashboard) {
      var scopeDashboard = '';
      for (var k=0; k < $scope.dashboards.length; k++) {
        if ($scope.dashboards[k].id === dashboardId) {
          scopeDashboard = $scope.dashboards[k];
        }
      }
      if (scopeDashboard.flaggedForDelete) {
        dashboardApi.removeDashboard(dashboard.id).then(function() {
          // dashboard removed
        }).catch(function(error) {
          console.log('should not have happened: ' + error);
        });
      } else {
        dashboard.name = scopeDashboard.name;
        return dashboardApi.saveDashboard(dashboard).then(function() {
          // dashboard saved
        }).catch(function(error) {
          console.log('should not have happened: ' + error);
        });
      }
    }).catch(function(error) {
      console.log('should not have happened: ' + error);
    });

  };

  /**
   * Handler invoked when dialog is closed via OK button
   *
   * - Makes changes to any existing dashboards (deletions or renames)
   * - Adds a new dashboard (if indicated by user)
   * - Updates user preferences
   * - Broadcasts userPreferencesUpdatedEvent event
   *
   * @method ok
   */
  $scope.ok = function () {
    // First, update any existing dashboard that may have changed
    $scope.dashboards.reduce(function(previous, current) {
      return previous.then(function() {
        var promise = $scope.updateExistingDashboard(current.id);
        return promise;
      });
      }, Promise.resolve()).then(function() {
        // finished updating all dashboards
        // update complete
        // Check for new dashboard
        if ($scope.addingNewBoard) {
          dashboardApi.createDashboard($scope.newDashboardName.name).then(function() {
            // update complete
            userSettingsApi.updateAllUserSettings($scope.preferences).then(function() {
              // broadcast message that user's preferences have changed
              // Can't seem to DI $rootScope in here without errors, so accessing
              // $rootScope using $parent instead
              $scope.$parent.$broadcast(userPreferencesUpdatedEvent, {});

              $modalInstance.close();
            }).catch(function(error) {
              console.log('should not have happened: ' + error);
            });
          }).catch(function(error) {
            console.log('should not have happened: ' + error);
          });
        } else {
          userSettingsApi.updateAllUserSettings($scope.preferences).then(function() {
            $scope.$parent.$broadcast(userPreferencesUpdatedEvent, {});
            $modalInstance.close();
          }).catch(function(error) {
            console.log('should not have happened: ' + error);
          });
        }
    });
  };

  /**
   * Handler invoked when modal is dismissed via the cancel button
   *
   * @method cancel
   */
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  /**
   * Handler invoked when the delete button is clicked for a given dashboard
   *
   * Ensures user is not going to delete their last dashboard, then flags
   * the given dashboard for deletion
   *
   * @method deleteClicked
   * @param dashboard
   */
  $scope.deleteClicked = function(dashboard) {
    // Don't let user delete all of their dashboards
    var totalBoards = $scope.dashboards.length;
    var numToRemove = 0;
    for (var i=0; i < $scope.dashboards.length; i++) {
      if ($scope.dashboards[i].flaggedForDelete) {
        numToRemove++;
      }
    }
    if (totalBoards - numToRemove < 2) {
      alert('You must have at least one dashboard');
      return;
    }

    for (i=0; i < $scope.dashboards.length; i++) {
      if ($scope.dashboards[i].id === dashboard.id) {
        $scope.dashboards[i].flaggedForDelete = true;
      }
    }
  };

  /**
   * Handler invoked when the undo delete button is clicked for a given
   * dashboard
   *
   * Resets the deletion flag for the dashboard
   *
   * @method undoDeleteClicked
   * @param {Object} dashboard The dashboard to unflag for deletion
   */
  $scope.undoDeleteClicked = function(dashboard) {
    for (var i=0; i < $scope.dashboards.length; i++) {
      if ($scope.dashboards[i].id === dashboard.id) {
        $scope.dashboards[i].flaggedForDelete = false;
      }
    }
  };

  /**
   * Handler invoked when the add dashboard button is clicked
   *
   * @method addDashboardClicked
   */
  $scope.addDashboardClicked = function() {
    $scope.addingNewBoard = true;
  };

  /**
   * Handler invoked when the undo add dashboard button is clicked
   *
   * @method undoAddDashboardClicked
   */
  $scope.undoAddDashboardClicked = function() {
    $scope.addingNewBoard = false;
    $scope.newDashboardName.name = '';
  };
};

// Required to make minification-safe
ModalInstanceCtrl.$inject = ['$scope', '$modalInstance', 'currentDashboardId',
  'dashboardApi', 'userSettingsApi'];

/**
 * ng Directive for User Settings modal dialog
 *
 * Usage:
 *
 *     <user-settings></user-settings>
 *
 * ngtype: directive
 *
 * @class userSettings
 * @static
 * @namespace userSettings
 */
angular.module( 'ozpWebtopApp.userSettings').directive('userSettings', function(){
    return {
        restrict: 'E',
        templateUrl: 'userPreferencesModal/settingsModal.tpl.html',
        controller: function($scope, $rootScope, $modal, $log,
                             $state, dashboardApi, dashboardSwitchedEvent,
                             launchUserPreferencesModalEvent) {
            $scope.validNamePattern = /^[a-z_]+[a-z0-9_ ]*\w$/i;
            $scope.$on(launchUserPreferencesModalEvent, function() {
                $scope.open();
            });

            $scope.$on(dashboardSwitchedEvent, function(event, data) {
                $scope.currentDashboardId = data.dashboardId;
            });

            $scope.open = function () {

                var modalInstance = $modal.open({
                    templateUrl: 'userPreferencesModal/settingsModal.tpl.html',
                    controller: ModalInstanceCtrl,
                    windowClass: 'app-modal-window',
                    scope: $rootScope,
                    resolve: {
                        currentDashboardId: function () {
                            return $scope.currentDashboardId;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    dashboardApi.getDashboardById($scope.currentDashboardId).then(function(dashboard) {
                      if (!dashboard) {
                        // arbitrarily redirect user to their first valid board using grid layout
                        dashboardApi.getDashboards().then(function(dashboard) {
                          var goToBoard = dashboard[0].id;
                          $state.go('grid', {'dashboardId': goToBoard});
                        }).catch(function(error) {
                          console.log('should not have happened: ' + error);
                        });
                      }
                    }).catch(function(error) {
                      console.log('should not have happened: ' + error);
                    });

                }, function () {
                    $log.info('Modal dismissed');
                });
            };
        },
        controllerAs: 'UserSettingsCtrl'
    };
});
