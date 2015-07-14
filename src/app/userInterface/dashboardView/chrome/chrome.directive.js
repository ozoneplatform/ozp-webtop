'use strict';

/**
 * Directive for chrome (bar appearing across the top of each widget)
 *
 * ngtype: directive
 *
 * @class ozpChrome
 * @static
 * @namespace dashboardView
 */
angular.module('ozpWebtop.dashboardView.chrome')
  .directive('ozpChrome', function () {
    return {
      templateUrl: 'userInterface/dashboardView/chrome/ozpchrome.tpl.html',
      restrict: 'E',
      replace: true,
      controller: 'ChromeCtrl',
      scope: {
        'frame': '='
      }
    };
  });
