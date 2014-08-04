'use strict';

/**
 * ChromeController aids the ozpChrome directive in knowing its location (grid or desktop).
 */
angular.module('ozpWebtopApp.components')
.controller('ChromeController', function ($scope, $location) {
  // Determine if chrome is being used in the grid view
  $scope.isGrid = ($location.path() === '/grid');
});
