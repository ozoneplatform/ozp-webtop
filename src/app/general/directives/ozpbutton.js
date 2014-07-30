'use strict';

/**
 * ozpButton Renders button with an icon to the left and text to the right.
 *
 * @namespace directives
 * @class ozpButton
 * @constructor
 */
angular.module('ozpWebtopApp.general')
.directive('ozpButton', function () {
  return {
    replace: true,
    templateUrl: 'general/templates/ozpbutton.tpl.html',
    restrict: 'E'
  };
});
