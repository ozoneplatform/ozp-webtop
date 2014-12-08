'use strict';

/**
 * Dashboard view controller
 *
 * Parent controller for Sticky State (ui-router-extras)
 *
 * @module ozpWebtop.dashboardView
 *
 */
angular.module('ozpWebtop.dashboardView', []);

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

.controller('DashboardViewCtrl', function ($scope,
                                           dashboardChangeMonitor,
                                           dashboardSwitchedEvent) {

    // activate the dashboard change monitor so we receive notification when the
    // user's dashboard changes
    dashboardChangeMonitor.run();

    $scope.layout = dashboardChangeMonitor.layout;

    $scope.$on(dashboardSwitchedEvent, function(event, dashboardChange) {
      $scope.layout = dashboardChange.layout;
      console.log('DashboardViewCtrl got layout change: ' + $scope.layout);
    });


  });