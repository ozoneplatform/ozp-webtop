'use strict';

/**
 * ozpButton module
 *
 * @module ozpWebtop.dashboardView.button
 */
angular.module('ozpWebtop.dashboardView.button', [
  'ozp.common.ellipticalFilter']);

/**
 * ozpButton Renders button with an icon to the left and text to the right.
 *
 * ngtype: directive
 *
 * @namespace dashboardView
 * @class ozpButton
 * @constructor
 */
angular.module('ozpWebtop.dashboardView.button')
.directive('ozpButton', function () {
  return {
    replace: true,
    templateUrl: 'dashboardView/button/ozpbutton.tpl.html',
    restrict: 'E'
  };
});
