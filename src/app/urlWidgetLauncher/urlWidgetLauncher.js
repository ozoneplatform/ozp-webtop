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
  function($scope, $state, dashboardApi) {

    $scope.$on('$stateChangeSuccess',
      function(event, toState, toParams) {
        if (toState.name === 'url-launch-app') {
          console.log('Opening app ' + toParams.appId);
          // Get user's dashboard data - if it's present, redirect to first
          // board. If not present, create a default board
          dashboardApi.getCurrentDashboard().then(function(dashboard) {
            if (!dashboard) {
              console.log('No dashboards found, creating a default one');
              dashboardApi.createInitialDashboardData().then(function() {
                // now get this dashboard id
                dashboardApi.getDashboards().then(function(dashboards) {
                  // we know we only have one dashboard
                  var dashboardId = dashboards[0].id;
                  var stickyIndex = dashboards[0].stickyIndex;
                  // redirect user to new dashboard (grid view by default) after
                  // adding this app to the board
                  dashboardApi.createFrame(dashboardId, toParams.appId, 25).then(function() {
                    console.log('Adding app ' + toParams.appId + ' to default dashboard and redirecting ...');
                    $state.go('dashboardview.grid-sticky-' + stickyIndex, {
                      'dashboardId': dashboardId});
                  });
                });
              });
            } else {
              // redirect user to this dashboard after adding this app to the board
              dashboardApi.createFrame(dashboard.id, toParams.appId, 25).then(function() {
                console.log('Adding app ' + toParams.appId + ' to existing dashboard ' + dashboard.id + ' and redirecting ...');
                $state.go('dashboardview.' + dashboard.layout + '-sticky-' +
                  dashboard.stickyIndex, {dashboardId: dashboard.id});
              });
            }
          });
        }
    });
  }
);