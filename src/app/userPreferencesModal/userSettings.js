'use strict';

/**
 * The modal encompassing user settings functionality.
 *
 * @module ozpWebtop.userSettings
 * @requires ozpWebtop.models.dashboard
 * @requires ozpWebtop.models.userSettings
 */
angular.module('ozpWebtop.userSettings', ['ozpWebtop.models.dashboard',
  'ozpWebtop.models.userSettings']);

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
 * @param maxStickyBoards number of sticky slots available
 */
var ModalInstanceCtrl = function ($scope, $modalInstance, currentDashboardId,
                                  dashboardApi, userSettingsApi,
                                  userPreferencesUpdatedEvent, maxStickyBoards) {

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

  // [{'dashboardId': '0', 'stickyIndex': 1}, ...]
  var preferredStickyIndexes = [];

  var freeStickySlots = 0;

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
    preferredStickyIndexes = [];
    for (var i=0; i < dashboards.length; i++) {
      if (dashboards[i].stickyIndex > -1) {
        preferredStickyIndexes.push({'dashboardId': dashboards[i].id,
          'stickyIndex': dashboards[i].stickyIndex});
        dashboards[i].sticky = true;
      } else {
        dashboards[i].sticky = false;
      }
    }
    freeStickySlots = maxStickyBoards - preferredStickyIndexes.length;
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
        dashboard.stickyIndex = scopeDashboard.stickyIndex;
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
    var freeStickySlots = [];
    for (var z=0; z < maxStickyBoards; z++) {
      freeStickySlots[z] = z;
    }
    // update sticky indexes for boards that were sticky before
    var updatedBoardIds = [];
    for (var n=0; n < $scope.dashboards.length; n++) {
      var scopeDashboard = $scope.dashboards[n];
      if (scopeDashboard.stickyIndex > -1 && scopeDashboard.sticky === true) {
        for (var i = 0; i < preferredStickyIndexes.length; i++) {
          if (preferredStickyIndexes[i].dashboardId === scopeDashboard.id) {
            scopeDashboard.stickyIndex = preferredStickyIndexes[i].stickyIndex;
            var idx = freeStickySlots.indexOf(preferredStickyIndexes[i].stickyIndex);
            freeStickySlots.splice(idx, 1);
            updatedBoardIds.push(scopeDashboard.id);
          }
        }
      }
    }

    // update sticky indexes for boards that were unsticky before
    freeStickySlots.sort();
    var freeSlotIdx = 0;
    for (var m=0; m < $scope.dashboards.length; m++) {
      if ($scope.dashboards[m].sticky === true && updatedBoardIds.indexOf($scope.dashboards[m].id) < 0) {
        $scope.dashboards[m].stickyIndex = freeStickySlots[freeSlotIdx];
        freeSlotIdx++;
      }
    }
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

  $scope.makeSticky = function(dashboard) {
    if (freeStickySlots > 0) {
      dashboard.sticky = true;
      freeStickySlots--;
    } else {
      alert('Limit of sticky dashboards reached: ' + maxStickyBoards);
      dashboard.sticky = false;
    }
  };

  $scope.makeNonstick = function(dashboard) {
    dashboard.sticky = false;
    dashboard.stickyIndex = -1;
    freeStickySlots++;
  };
};

// Required to make minification-safe
ModalInstanceCtrl.$inject = ['$scope', '$modalInstance', 'currentDashboardId',
  'dashboardApi', 'userSettingsApi', 'userPreferencesUpdatedEvent',
  'maxStickyBoards'];

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
angular.module( 'ozpWebtop.userSettings').directive('userSettings', function(){
    return {
        restrict: 'E',
        templateUrl: 'userPreferencesModal/settingsModal.tpl.html',
        controller: function($scope, $rootScope, $modal,
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
                      // if this dashboard has been deleted, redirect user
                      if (!dashboard) {
                        // arbitrarily redirect user to their first valid board using grid layout
                        dashboardApi.getDashboards().then(function(dashboard) {
                          // TODO: this is broken now (sticky state)
                          var goToBoard = dashboard[0].id;
                          $state.go('dashboardview.grid-nonstick', {'dashboardId': goToBoard});
                        }).catch(function(error) {
                          console.log('should not have happened: ' + error);
                        });
                      }
                      // it's possible our stickySlot changed during the update
                      // note that if this happens, existing state (internal to
                      // widgets) will be reset
                      if (dashboard.stickyIndex > -1) {
                        if (dashboard.layout === 'grid') {
                          $state.go('dashboardview.grid-sticky-' + dashboard.stickyIndex, {'dashboardId': dashboard.id});
                        } else if (dashboard.layout === 'desktop') {
                          $state.go('dashboardview.desktop-sticky-' + dashboard.stickyIndex, {'dashboardId': dashboard.id});
                        }
                      } else {
                          if (dashboard.layout === 'grid') {
                          $state.go('dashboardview.grid-nonstick', {'dashboardId': dashboard.id});
                        } else if (dashboard.layout === 'desktop') {
                          $state.go('dashboardview.desktop-nonstick', {'dashboardId': dashboard.id});
                        }
                      }
                    }).catch(function(error) {
                      console.log('should not have happened: ' + error);
                    });

                }, function () {
                  // modal dismissed
                });
            };
        },
        controllerAs: 'UserSettingsCtrl'
    };
});
