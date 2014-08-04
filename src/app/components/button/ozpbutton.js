'use strict';

/**
 * ozpButton Renders button with an icon to the left and text to the right.
 *
 * @namespace components
 * @class ozpButton
 * @constructor
 */
angular.module('ozpWebtopApp.components')
.directive('ozpButton', function () {
  return {
    replace: true,
    templateUrl: 'components/button/ozpbutton.tpl.html',
    restrict: 'E'
  };
});
