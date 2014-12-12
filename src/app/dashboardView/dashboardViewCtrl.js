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

.controller('DashboardViewCtrl', function ($scope) {

    $scope.$on('$stateChangeSuccess',
      function(event, toState/*, toParams, fromState, fromParams*/){
        if (toState.name.indexOf('grid-sticky') > -1) {
          $scope.layout = 'grid';
        } else if (toState.name.indexOf('desktop-sticky') > -1) {
          $scope.layout = 'desktop';
        } else {
        }
    });

  });