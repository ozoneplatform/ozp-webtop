'use strict';

/**
 * Dashboard view controller
 *
 * Parent controller for Sticky State (ui-router-extras)
 *
 * @module ozpWebtop.dashboardView
 *
 */
angular.module('ozpWebtop.dashboardView', ['ozpWebtop.models', 'angularSpinner']);

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
                                           models, maxStickyBoards) {

    $scope.intervalCount = 0;
    $scope.$on('$stateChangeSuccess',
      function(event, toState, toParams/*, fromState, fromParams*/){
        stateChangeHandler(event, toState, toParams);
    });

    function stateChangeHandler (event, toState, toParams) {
      if(toState.url !== '/'){
        $scope.dataLoaded = 'true';
      }

      //if more than 40, half second intervals (20000 ms)
      if($scope.intervalCount >= 40){
        $scope.failToLoadMessage = 'true';
        $interval.cancel($scope.readyPromise);
      }

      if (!models.dataCached()) {
        $log.warn('DashboardViewCtrl: delaying call to handleStateChange by 500ms - no data yet');
        $scope.readyPromise = $interval(function() {
          $scope.intervalCount = $scope.intervalCount + 1;
          stateChangeHandler(event, toState, toParams);
        }, 500, 1);
        return;
      }

      if ($scope.readyPromise) {
        $interval.cancel($scope.readyPromise);
      }

      if(!toParams.dashboardId){
        var dashboards = models.getDashboards();
        var state = 'dashboardview.' + dashboards[0].layout + '-sticky-' +
          dashboards[0].stickyIndex;
        $log.info('DashboardViewCtrl: $state.go for board ' + state + ', id: ' + dashboards[0].id);
        $state.go(state, {dashboardId: dashboards[0].id});
        return;
      }

      if (toState.name.indexOf('grid-sticky') > -1) {
          $scope.layout = 'grid';
      } else if (toState.name.indexOf('desktop-sticky') > -1) {
          $scope.layout = 'desktop';
      } else {
        $log.warn('DashboardViewCtrl received state change for neither grid nor desktop: loading default dashboard. toState.name: ' + toState.name);
        // Get user's dashboard data - if it's present, redirect to first
        // board. If not present, create a default board
        var dashboard = models.getCurrentDashboard();

        // TODO: shouldn't arbitrarily use grid mode
        var newState = 'dashboardview.' + dashboard.layout + '-sticky-' +
          dashboard.stickyIndex;
        $log.info('DashboardViewCtrl: $state.go for board ' + newState + ', id: ' + dashboard.id);
        $state.go(newState, {dashboardId: dashboard.id});
      }
    }

    $scope.maxStickyBoards = maxStickyBoards;
    $scope.stickyBoardsArray = function(num) {
        return new Array(num);
    };

  });
