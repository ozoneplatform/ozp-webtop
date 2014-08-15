'use strict';

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used below.

var ModalInstanceCtrl = function ($scope, $modalInstance, dashboardApi, userSettingsApi) {

  $scope.preferences = userSettingsApi.getUserSettings();
  $scope.dashboards = dashboardApi.getAllDashboards().dashboards;
  $scope.preferences.defaultDashboard = dashboardApi.getDefaultDashboardName();
  $scope.themes = ['light', 'dark'];

  $scope.ok = function () {
    $modalInstance.close();
    dashboardApi.updateDefaultDashboard($scope.preferences.defaultDashboard);
    // Don't need defaultDashboard in preferences
    delete $scope.preferences.defaultDashboard;
    userSettingsApi.updateAllUserSettings($scope.preferences);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.editClicked = function(dashboard) {
    alert('Sorry, this functionality is not yet implemented');
    console.log('change name of dashboard ' + dashboard.name);
  };

  $scope.deleteClicked = function(dashboard) {
    alert('Sorry, this functionality is not yet implemented');
    console.log('delete dashboard ' + dashboard.name);
  };
};

angular.module( 'ozpWebtopApp.userSettings')
.controller('UserSettingsCtrl', function($scope, $modal, $log) {

  $scope.$on('launchSettingsModal', function(/*event, data*/) {
    $scope.open();
  });

  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'userSettings/settingsModal.tpl.html',
      controller: ModalInstanceCtrl,
      windowClass: 'app-modal-window'
    });

    modalInstance.result.then(function () {
    }, function () {
      $log.info('Modal dismissed');
    });
  };
});

