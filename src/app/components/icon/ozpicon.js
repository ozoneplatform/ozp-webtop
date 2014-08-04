'use strict';

/**
 * ozpIcon Renders an icon as an anchor. It has an image on top and text below.
 *
 * @namespace components
 * @class ozpIcon
 * @constructor
 */
angular.module('ozpWebtopApp.components')
.directive('ozpIcon', function () {
  return {
    replace: true,
    templateUrl: 'components/icon/ozpicon.tpl.html',
    restrict: 'E',
    // Controller is a placeholder, this may need to be removed/refactored...
    controller: function ($scope) {
      $scope.handleIconClick = function (icon) {
        // Fire a scope event to notify other scopes of the icon click
        $scope.$emit('iconClick', icon);
      };
    }
  };
});
