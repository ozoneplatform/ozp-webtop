'use strict';

/**
 * ozpButton Renders button with an icon to the left and text to the right.
 *
 * ngtype: directive
 *
 * @namespace dashboardView
 * @class ozpButton
 * @constructor
 */
angular.module('ozpWebtopApp.dashboardView')
.directive('ozpButton', function () {
  return {
    replace: true,
    templateUrl: 'dashboardView/button/ozpbutton.tpl.html',
    restrict: 'E'
  };
});
