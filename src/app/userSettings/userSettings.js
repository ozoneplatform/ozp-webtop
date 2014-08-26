'use strict';

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used below.

var ModalInstanceCtrl = function ($scope, $modalInstance, dashboardApi, userSettingsApi) {

  $scope.preferences = userSettingsApi.getUserSettings();
  $scope.dashboards = dashboardApi.getDashboards();
  $scope.preferences.defaultDashboard = dashboardApi.getDefaultDashboardName();
  $scope.themes = ['light', 'dark'];
  $scope.validNamePattern = /^[a-z_][a-z0-9_ ]+\w$/i; // jshint ignore:line

  $scope.ok = function () {
    for (var i=0; i < $scope.dashboards.length; i++) {
      var dashboard = dashboardApi.getDashboardById($scope.dashboards[i].id);
      dashboard.name = $scope.dashboards[i].name;
      dashboardApi.saveDashboard(dashboard);
    }
    dashboardApi.updateDefaultDashboardName($scope.preferences.defaultDashboard);
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
    alert('Attempting to delete dashboard ' + dashboard.id);
    console.log('delete dashboard ' + dashboard.name);
  };
};
// Required to make minification-safe
ModalInstanceCtrl.$inject = ['$scope', '$modalInstance', 'dashboardApi', 'userSettingsApi'];

angular.module( 'ozpWebtopApp.userSettings')
.controller('UserSettingsCtrl', function($scope, $rootScope, $modal, $log) {

  $scope.$on('launchSettingsModal', function(/*event, data*/) {
    $scope.open();
  });

  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'userSettings/settingsModal.tpl.html',
      controller: ModalInstanceCtrl,
      windowClass: 'app-modal-window',
      scope: $rootScope
    });

    modalInstance.result.then(function () {
    }, function () {
      $log.info('Modal dismissed');
    });
  };
});

