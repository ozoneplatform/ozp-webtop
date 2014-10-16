'use strict';

/**
 * Launch applications in Webtop via URL
 *
 * This is really for demo purposes and will likely be removed
 *
 * ngtype: controller
 *
 * @class AppLauncherCtrl
 * @constructor
 * @param $scope ng $scope
 * @param $rootScope ng $rootScope
 * @param $state ng $state
 * @param $stateParams ng $stateParams
 * @param marketplaceApi marketplace data
 * @param dashboardApi dashboard data
 * @namespace appLauncher
 */
angular.module( 'ozpWebtopApp.appLauncher')
  .controller('AppLauncherCtrl', function($scope, $rootScope, $state,
                                          $stateParams, marketplaceApi,
                                          dashboardApi) {

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                            properties
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /**
     * @property Id of the application to launch in Webtop
     * @type {String}
     */
    $scope.appId = $stateParams.appId;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                           initialization
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    marketplaceApi.getAllApps().then(function(apps) {
      var validApp = false;
      for (var i=0; i < apps.length; i++) {
        if (apps[i].id === $scope.appId) {
          validApp = true;
        }
      }
      if (!validApp) {
        console.log('ERROR: App with id ' + $scope.appId + ' was not found');
        return;
      }

      // is this app already on our current dashboard?
      dashboardApi.getCurrentDashboard().then(function(dashboard) {
        dashboardApi.isAppOnDashboard(dashboard.id, $scope.appId).then(function(resp) {
          if (resp) {
            console.log('app is already on our current board - redirecting');
            $state.go('grid', {'dashboardId': dashboard.id});
          } else {
            console.log('this app is not on our current board - will add');
            dashboardApi.createFrame(dashboard.id, $scope.appId, 10).then(function(resp) {
              if (resp) {
                $state.go('grid', {'dashboardId': dashboard.id});
              } else {
                console.log('ERROR: creating frame on dashboard');
              }
            });
          }
        });
      });
    });

  });
