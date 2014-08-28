'use strict';

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used below.

var ModalInstanceCtrl = function ($scope, $modalInstance, currentDashboardId,
                                  dashboardApi, userSettingsApi) {

  $scope.preferences = userSettingsApi.getUserSettings();
  $scope.dashboards = dashboardApi.getDashboards();
  $scope.preferences.defaultDashboard = dashboardApi.getDefaultDashboardName();
  $scope.themes = ['light', 'dark'];
  $scope.validNamePattern = /^[a-z_]+[a-z0-9_ ]*\w$/i;
  $scope.currentDashboardId = currentDashboardId;
  $scope.newDashboardName = {
    'name': ''
  };
  $scope.addingNewBoard = false;

  $scope.ok = function () {
    // Save all dashboards
    var currentDashboardName = dashboardApi.getDashboardById(
      $scope.currentDashboardId).name;

    for (var i=0; i < $scope.dashboards.length; i++) {
      var dashboard = dashboardApi.getDashboardById($scope.dashboards[i].id);
      if ($scope.dashboards[i].flaggedForDelete) {
        dashboardApi.removeDashboard(dashboard.id);

        if (currentDashboardName === dashboard.name) {
          // arbitrarily set the default dashboard name to the first one found
          var newDefaultDashboardName = dashboardApi.getDashboards()[0].name;
          $scope.preferences.defaultDashboard = newDefaultDashboardName;
        }

      } else {
        dashboard.name = $scope.dashboards[i].name;
        dashboardApi.saveDashboard(dashboard);
      }
    }
    // Update default dashboard
    dashboardApi.updateDefaultDashboardName($scope.preferences.defaultDashboard);

    // Check for new dashboard
    if ($scope.addingNewBoard) {
      dashboardApi.createDashboard($scope.newDashboardName.name);
    }

    // Don't need defaultDashboard in preferences
    delete $scope.preferences.defaultDashboard;
    userSettingsApi.updateAllUserSettings($scope.preferences);

    // broadcast message that user's preferences have changed
    // Can't seem to DI $rootScope in here without errors, so accessing
    // $rootScope using $parent instead
    $scope.$parent.$broadcast('UserSettingsChanged', {});

    $modalInstance.close();
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
      var dashboard = dashboardApi.getDashboardById($scope.currentDashboardId);
      if (!dashboard) {
        // arbitrarily redirect user to their first valid board using grid layout
        var goToBoard = dashboardApi.getDashboards()[0].id;
        $state.go('grid', {'dashboardId': goToBoard});
      }
    }, function () {
      $log.info('Modal dismissed');
    });
  };
});

