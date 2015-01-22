'use strict';

/**
 * Dashboard view controller
 *
 * Parent controller for Sticky State (ui-router-extras)
 *
 * @module ozpWebtop.dashboardView
 *
 */
angular.module('ozpWebtop.dashboardView', ['ozpWebtop.models.dashboard']);

/**
 * Dashboard view controller
 *
 * ngtype: controller
 *
 * @namespace dashboardView
 * @class DashboardViewCtrl
 * @constructor
 * @param {Object} $scope an Angular scope
 */
angular.module('ozpWebtop.dashboardView')

.controller('DashboardViewCtrl', function ($scope, $state, dashboardApi) {

    $scope.$on('$stateChangeSuccess',
      function(event, toState/*, toParams, fromState, fromParams*/){
        if (toState.name.indexOf('grid-sticky') > -1) {
          $scope.layout = 'grid';
        } else if (toState.name.indexOf('desktop-sticky') > -1) {
          $scope.layout = 'desktop';
        } else {
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
                  // redirect user to new dashboard (grid view by default)
                  $state.go('dashboardview.grid-sticky-' + stickyIndex, {
                    'dashboardId': dashboardId});
                });
              });
            } else {
              // TODO: shouldn't arbitrarily use grid mode
              $state.go('dashboardview.' + dashboard.layout + '-sticky-' +
                dashboard.stickyIndex, {dashboardId: dashboard.id});
            }
          });
        }
    });

  });