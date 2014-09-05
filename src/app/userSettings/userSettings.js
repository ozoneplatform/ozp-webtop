'use strict';

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used below.

var ModalInstanceCtrl = function ($scope, $modalInstance, currentDashboardId,
                                  dashboardApi, userSettingsApi) {

  $scope.preferences = userSettingsApi.getUserSettings();
  dashboardApi.getDashboards().then(function(dashboards) {
    $scope.dashboards = dashboards;
  }).catch(function(error) {
    console.log('should not have happened: ' + error);
  });

  dashboardApi.getDefaultDashboardName().then(function(name) {
    $scope.preferences.defaultDashboard = name;
  }).catch(function(error) {
    console.log('should not have happened: ' + error);
  });

  $scope.themes = ['light', 'dark'];
  $scope.validNamePattern = /^[a-z_]+[a-z0-9_ ]*\w$/i;
  $scope.currentDashboardId = currentDashboardId;
  $scope.newDashboardName = {
    'name': ''
  };
  $scope.addingNewBoard = false;

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

        // TODO: fix this
        var currentDashboardName = 'not working yet';
        if (currentDashboardName === dashboard.name) {
          // arbitrarily set the default dashboard name to the first one found
          return dashboardApi.getDashboards().then(function(dashboards) {
            var newDefaultDashboardName = dashboards[0].name;
            $scope.preferences.defaultDashboard = newDefaultDashboardName;
          }).catch(function(error) {
            console.log('should not have happened: ' + error);
          });
        }

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

  $scope.ok = function () {
    // Save all dashboards
    dashboardApi.getDashboardById($scope.currentDashboardId).then(function(/*currentDashboard*/) {
      // var currentDashboardName = currentDashboard.name;

      $scope.dashboards.reduce(function(previous, current) {
        return previous.then(function() {
          var promise = $scope.updateExistingDashboard(current.id);
          return promise;
        });
        }, Promise.resolve()).then(function() {
          // finished updating all frames
          // Update default dashboard
          dashboardApi.updateDefaultDashboardName($scope.preferences.defaultDashboard).then(function() {
            // update complete
            // Check for new dashboard
            if ($scope.addingNewBoard) {
              dashboardApi.createDashboard($scope.newDashboardName.name).then(function() {
                // update complete
                // Don't need defaultDashboard in preferences
                delete $scope.preferences.defaultDashboard;
                userSettingsApi.updateAllUserSettings($scope.preferences);

                // broadcast message that user's preferences have changed
                // Can't seem to DI $rootScope in here without errors, so accessing
                // $rootScope using $parent instead
                $scope.$parent.$broadcast('UserSettingsChanged', {});

                $modalInstance.close();
              }).catch(function(error) {
                console.log('should not have happened: ' + error);
              });
            } else {
              $scope.$parent.$broadcast('UserSettingsChanged', {});
              $modalInstance.close();
            }
          }).catch(function(error) {
            console.log('should not have happened: ' + error);
          });
      });
    });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

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

  $scope.undoDeleteClicked = function(dashboard) {
    for (var i=0; i < $scope.dashboards.length; i++) {
      if ($scope.dashboards[i].id === dashboard.id) {
        $scope.dashboards[i].flaggedForDelete = false;
      }
    }
  };

  $scope.addDashboardClicked = function() {
    $scope.addingNewBoard = true;
  };

  $scope.undoAddDashboardClicked = function() {
    $scope.addingNewBoard = false;
    $scope.newDashboardName.name = '';
  };
};
// Required to make minification-safe
ModalInstanceCtrl.$inject = ['$scope', '$modalInstance', 'currentDashboardId',
  'dashboardApi', 'userSettingsApi'];

angular.module( 'ozpWebtopApp.userSettings')
.controller('UserSettingsCtrl', function($scope, $rootScope, $modal, $log,
                                         $state, dashboardApi) {

  $scope.$on('launchSettingsModal', function(/*event, data*/) {
    $scope.open();
  });

  $scope.$on('dashboardChange', function(event, data) {
    $scope.currentDashboardId = data.dashboardId;
  });

  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'userSettings/settingsModal.tpl.html',
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
          dashboardApi.getDashboards().then(function(dashboards) {
            var goToBoard = dashboards[0].id;
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
});

