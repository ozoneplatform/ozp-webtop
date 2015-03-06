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

.controller('DashboardViewCtrl', function ($scope, $state, $interval, $log,
                                           dashboardApi, initialDataReceivedEvent) {

    $scope.$on(initialDataReceivedEvent, function() {
      if(window.location.hash === '#/'){
        dashboardApi.getDashboards().then(function(dashboard) {
          var state = 'dashboardview.' + dashboard[0].layout + '-sticky-' +
            dashboard[0].stickyIndex;
          $log.info('DashboardViewCtrl: $state.go for board ' + state + ', id: ' + dashboard[0].id);
          $state.go(state, {dashboardId: dashboard[0].id});
        });
      }
      $scope.ready = true;
    });

    $scope.$on('$stateChangeSuccess',
      function(event, toState/*, toParams, fromState, fromParams*/){
        stateChangeHandler(event, toState);
    });

    function stateChangeHandler (event, toState) {
      if (!$scope.ready) {
        $log.warn('DashboardViewCtrl: delaying call to handleStateChange by 500ms - no data yet');
        $scope.readyPromise = $interval(function() {
          stateChangeHandler(event, toState);
        }, 500, 1);
        return;
      }

      if ($scope.readyPromise) {
        $interval.cancel($scope.readyPromise);
      }

      if (toState.name.indexOf('grid-sticky') > -1) {
          $scope.layout = 'grid';
      } else if (toState.name.indexOf('desktop-sticky') > -1) {
          $scope.layout = 'desktop';
      } else {
        $log.warn('DashboardViewCtrl received state change for neither grid nor desktop: loading default dashboard. toState.name: ' + toState.name);
        // Get user's dashboard data - if it's present, redirect to first
        // board. If not present, create a default board
        dashboardApi.getCurrentDashboard().then(function(dashboard) {
          // TODO: shouldn't arbitrarily use grid mode
          var state = 'dashboardview.' + dashboard.layout + '-sticky-' +
            dashboard.stickyIndex;
          $log.info('DashboardViewCtrl: $state.go for board ' + state + ', id: ' + dashboard.id);
          $state.go(state, {dashboardId: dashboard.id});
        });
      }
    }

  });