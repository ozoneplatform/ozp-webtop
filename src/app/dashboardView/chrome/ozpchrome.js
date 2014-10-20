'use strict';

angular.module('ozpWebtopApp.dashboardView')
/**
 * Directive for chrome (bar appearing across the top of each widget)
 *
 * ngtype: directive
 *
 * @class ozpChrome
 * @static
 * @namespace dashboardView
 */
.directive('ozpChrome', function () {
  return {
    templateUrl: 'dashboardView/chrome/ozpchrome.tpl.html',
    restrict: 'E',
    replace: true,
    controller: 'ChromeCtrl'
  };
});
