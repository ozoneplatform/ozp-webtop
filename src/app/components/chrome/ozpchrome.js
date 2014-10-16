'use strict';

angular.module('ozpWebtopApp.components')
/**
 * Directive for chrome (bar appearing across the top of each widget)
 *
 * ngtype: directive
 *
 * @class ozpChrome
 * @static
 * @namespace components
 */
.directive('ozpChrome', function () {
  return {
    templateUrl: 'components/chrome/ozpchrome.tpl.html',
    restrict: 'E',
    replace: true,
    controller: 'ChromeCtrl'
  };
});
