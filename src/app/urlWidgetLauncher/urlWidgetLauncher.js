'use strict';

/**
 * The url widget launcher launches a new widget in the user's current dashboard
 * (a new dashboard is created containing this widget if no dashboards for the
 * user exist). This is a stop gap solution - ultimately, this functionality
 * needs to be handled via IWC Intents
 *
 * @module ozpWebtop.urlWidgetLauncher
 */
angular.module('ozpWebtop.urlWidgetLauncher', []);

var app = angular.module( 'ozpWebtop.urlWidgetLauncher');
/**
 * Controller for url widget launcher
 *
 * ngtype: controller
 *
 * @class UrlWidgetLauncherCtrl
 * @constructor
 * @param $scope ng $scope
 * @param $rootScope ng $rootScope
 * @namespace urlWidgetLauncher
 *
 */
app.controller('UrlWidgetLauncherCtrl',
  function($scope, $state, $log, $interval, models) {

    $scope.$on('$stateChangeSuccess',
      function(event, toState, toParams) {
        if (toState.name === 'url-launch-app') {
         $scope.handleStateChange(toParams);
        }
    });

    $scope.handleStateChange = function(toParams) {
      if (!models.dataCached()) {
        $log.warn('UrlWidgetLauncherCtrl: delaying call to handleStateChange by 500ms - no data yet');
        $scope.handleStateChangeInterval = $interval(function() {
          $scope.handleStateChange(toParams);
        }, 500, 1);
        return;
      }
      if ($scope.handleStateChangeInterval) {
        $interval.cancel($scope.handleStateChangeInterval);
      }
      $log.debug('Opening app ' + toParams.appId);
      var dashboard = models.getCurrentDashboard();
      if (!dashboard) {
        $log.error('Error: cannot open widget - no current dashboard');
      } else {
        // redirect user to this dashboard after adding this app to the board
        models.createFrame(dashboard.id, toParams.appId, 25);
        $log.debug('Adding app ' + toParams.appId + ' to existing dashboard ' + dashboard.id + ' and redirecting ...');
        $state.go('dashboardview.' + dashboard.layout + '-sticky-' +
          dashboard.stickyIndex, {dashboardId: dashboard.id});
        }
    };
  }
);